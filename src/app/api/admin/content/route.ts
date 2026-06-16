import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { editableFields } from "@/lib/editable";
import { getContentOverrides, setContentOverrides, isDbConfigured } from "@/lib/db";

const PUBLIC_PATHS = ["/", "/le-centre", "/specialites", "/contact"];
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

  const entries: Record<string, string> = {};
  for (const [key, value] of Object.entries(body.values ?? {})) {
    if (validKeys.has(key) && typeof value === "string") {
      entries[key] = value;
    }
  }

  if (Object.keys(entries).length === 0) {
    return NextResponse.json({ ok: false, error: "Aucun champ valide." }, { status: 400 });
  }

  try {
    await setContentOverrides(entries);
    PUBLIC_PATHS.forEach((p) => revalidatePath(p));
    return NextResponse.json({ ok: true, saved: Object.keys(entries).length });
  } catch (err) {
    console.error("[admin/content] save error:", err);
    return NextResponse.json({ ok: false, error: "Échec de l'enregistrement." }, { status: 500 });
  }
}
