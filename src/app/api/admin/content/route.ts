import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { editableFields } from "@/lib/editable";
import {
  getContentOverrides,
  setContentOverrides,
  deleteContentOverrides,
  isDbConfigured,
} from "@/lib/db";

const PUBLIC_PATHS = ["/", "/le-centre", "/specialites", "/contact"];
const defaultsByKey: Record<string, string> = Object.fromEntries(
  editableFields.map((f) => [f.key, f.default])
);
const validKeys = new Set(editableFields.map((f) => f.key));

export async function GET() {
  const overrides = await getContentOverrides();
  return NextResponse.json({
    ok: true,
    dbConfigured: isDbConfigured(),
    fields: editableFields,
    overrides,
  });
}

export async function POST(request: Request) {
  if (!isDbConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Base de données non configurée (POSTGRES_URL)." },
      { status: 503 }
    );
  }

  let body: { values?: Record<string, string> };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  // Fields equal to their default are removed (reset); the rest are upserted.
  const toSet: Record<string, string> = {};
  const toDelete: string[] = [];
  for (const [key, value] of Object.entries(body.values ?? {})) {
    if (!validKeys.has(key) || typeof value !== "string") continue;
    if (value === defaultsByKey[key]) toDelete.push(key);
    else toSet[key] = value;
  }

  try {
    await setContentOverrides(toSet);
    await deleteContentOverrides(toDelete);
    PUBLIC_PATHS.forEach((p) => revalidatePath(p));
    return NextResponse.json({ ok: true, saved: Object.keys(toSet).length });
  } catch (err) {
    console.error("[admin/content] save error:", err);
    const detail = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { ok: false, error: `Échec de l'enregistrement : ${detail}` },
      { status: 500 }
    );
  }
}
