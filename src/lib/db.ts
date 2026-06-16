import { createPool, type VercelPool } from "@vercel/postgres";

// Data layer over Vercel Postgres. Everything is guarded: when no database is
// configured (local dev / no DB yet), reads return empty defaults and writes are
// no-ops, so the public site keeps working unchanged.
//
// Vercel's Postgres (now Neon-backed) may inject the connection string under
// several names depending on how it was added, so we resolve it from all of the
// common ones rather than relying on @vercel/postgres' default POSTGRES_URL.

function resolveConnectionString(): string | undefined {
  return (
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.DATABASE_URL_UNPOOLED ||
    undefined
  );
}

export function isDbConfigured(): boolean {
  return Boolean(resolveConnectionString());
}

let _pool: VercelPool | null = null;
function pool(): VercelPool {
  if (!_pool) {
    _pool = createPool({ connectionString: resolveConnectionString() });
  }
  return _pool;
}

let schemaPromise: Promise<void> | null = null;

// Create tables on first use (idempotent).
export function ensureSchema(): Promise<void> {
  if (!isDbConfigured()) return Promise.resolve();
  if (!schemaPromise) {
    schemaPromise = (async () => {
      await pool().sql`
        CREATE TABLE IF NOT EXISTS submissions (
          id BIGSERIAL PRIMARY KEY,
          type TEXT NOT NULL DEFAULT 'contact',
          nom TEXT NOT NULL,
          telephone TEXT NOT NULL,
          email TEXT,
          specialite TEXT,
          message TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'nouveau',
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
      `;
      await pool().sql`
        CREATE TABLE IF NOT EXISTS content_overrides (
          key TEXT PRIMARY KEY,
          value TEXT NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
      `;
      await pool().sql`
        CREATE TABLE IF NOT EXISTS image_overrides (
          key TEXT PRIMARY KEY,
          url TEXT NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
      `;
    })().catch((err) => {
      // Reset so a later call can retry; surface in logs.
      schemaPromise = null;
      throw err;
    });
  }
  return schemaPromise;
}

// ---- Submissions (bookings / contacts) -----------------------------------

export type Submission = {
  id: number;
  type: string;
  nom: string;
  telephone: string;
  email: string | null;
  specialite: string | null;
  message: string;
  status: string;
  created_at: string;
};

export type NewSubmission = {
  type?: string;
  nom: string;
  telephone: string;
  email?: string | null;
  specialite?: string | null;
  message: string;
};

export async function createSubmission(input: NewSubmission): Promise<void> {
  if (!isDbConfigured()) return;
  await ensureSchema();
  await pool().sql`
    INSERT INTO submissions (type, nom, telephone, email, specialite, message)
    VALUES (
      ${input.type ?? "contact"}, ${input.nom}, ${input.telephone},
      ${input.email ?? null}, ${input.specialite ?? null}, ${input.message}
    );
  `;
}

export async function listSubmissions(): Promise<Submission[]> {
  if (!isDbConfigured()) return [];
  await ensureSchema();
  const { rows } = await pool().sql<Submission>`
    SELECT id, type, nom, telephone, email, specialite, message, status,
           to_char(created_at, 'YYYY-MM-DD"T"HH24:MI:SSOF') AS created_at
    FROM submissions
    ORDER BY created_at DESC
    LIMIT 500;
  `;
  return rows;
}

export async function setSubmissionStatus(
  id: number,
  status: string
): Promise<void> {
  if (!isDbConfigured()) return;
  await ensureSchema();
  await pool().sql`UPDATE submissions SET status = ${status} WHERE id = ${id};`;
}

export async function countNewSubmissions(): Promise<number> {
  if (!isDbConfigured()) return 0;
  await ensureSchema();
  const { rows } = await pool().sql<{ count: string }>`
    SELECT COUNT(*)::text AS count FROM submissions WHERE status = 'nouveau';
  `;
  return Number(rows[0]?.count ?? 0);
}

// ---- Content overrides (copywriting) -------------------------------------

export async function getContentOverrides(): Promise<Record<string, string>> {
  if (!isDbConfigured()) return {};
  try {
    await ensureSchema();
    const { rows } = await pool().sql<{ key: string; value: string }>`
      SELECT key, value FROM content_overrides;
    `;
    return Object.fromEntries(rows.map((r) => [r.key, r.value]));
  } catch {
    return {};
  }
}

export async function setContentOverrides(
  entries: Record<string, string>
): Promise<void> {
  if (!isDbConfigured()) return;
  await ensureSchema();
  for (const [key, value] of Object.entries(entries)) {
    await pool().sql`
      INSERT INTO content_overrides (key, value, updated_at)
      VALUES (${key}, ${value}, now())
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();
    `;
  }
}

// Remove overrides (e.g. a field reset to its default) so the site falls back
// to the static default copy.
export async function deleteContentOverrides(keys: string[]): Promise<void> {
  if (!isDbConfigured() || keys.length === 0) return;
  await ensureSchema();
  for (const key of keys) {
    await pool().sql`DELETE FROM content_overrides WHERE key = ${key};`;
  }
}

// ---- Image overrides ------------------------------------------------------

export async function getImageOverrides(): Promise<Record<string, string>> {
  if (!isDbConfigured()) return {};
  try {
    await ensureSchema();
    const { rows } = await pool().sql<{ key: string; url: string }>`
      SELECT key, url FROM image_overrides;
    `;
    return Object.fromEntries(rows.map((r) => [r.key, r.url]));
  } catch {
    return {};
  }
}

export async function setImageOverride(key: string, url: string): Promise<void> {
  if (!isDbConfigured()) return;
  await ensureSchema();
  await pool().sql`
    INSERT INTO image_overrides (key, url, updated_at)
    VALUES (${key}, ${url}, now())
    ON CONFLICT (key) DO UPDATE SET url = EXCLUDED.url, updated_at = now();
  `;
}
