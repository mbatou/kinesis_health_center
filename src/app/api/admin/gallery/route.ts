import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getGalleryContent, defaultGallery, type GalleryItem } from "@/lib/editable";
import { setJsonSetting, isDbConfigured } from "@/lib/db";
import { isBlobConfigured } from "@/lib/blob";

export async function GET() {
  const gallery = await getGalleryContent();
  return NextResponse.json({
    ok: true,
    dbConfigured: isDbConfigured(),
    blobConfigured: isBlobConfigured(),
    gallery,
    defaults: defaultGallery,
  });
}

export async function POST(request: Request) {
  if (!isDbConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Base de données non configurée (POSTGRES_URL)." },
      { status: 503 }
    );
  }

  let body: { gallery?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  if (!Array.isArray(body.gallery) || body.gallery.length > 50) {
    return NextResponse.json({ ok: false, error: "Format invalide." }, { status: 400 });
  }

  const items: GalleryItem[] = [];
  for (const raw of body.gallery) {
    if (typeof raw !== "object" || raw === null) continue;
    const r = raw as Record<string, unknown>;
    const url = typeof r.url === "string" ? r.url.trim() : "";
    if (!url) continue;
    const alt = typeof r.alt === "string" ? r.alt.trim().slice(0, 300) : undefined;
    items.push({ url: url.slice(0, 2000), alt: alt || undefined });
  }

  try {
    await setJsonSetting("gallery", items);
    revalidatePath("/le-centre");
    return NextResponse.json({ ok: true, count: items.length });
  } catch (err) {
    console.error("[admin/gallery] save error:", err);
    const detail = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { ok: false, error: `Échec de l'enregistrement : ${detail}` },
      { status: 500 }
    );
  }
}
