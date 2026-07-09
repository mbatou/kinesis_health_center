import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { fixedImageKeys, imageMeta, type ImageKey } from "@/lib/editable";
import { getImageOverrides, setImageOverride, isDbConfigured } from "@/lib/db";
import { uploadImage, isBlobConfigured } from "@/lib/blob";

const PUBLIC_PATHS = ["/", "/le-centre", "/specialites", "/contact"];

export async function GET() {
  const overrides = await getImageOverrides();
  const images = fixedImageKeys.map((key) => ({
    key,
    alt: imageMeta[key].alt,
    defaultSrc: imageMeta[key].src,
    currentSrc: overrides[key] || imageMeta[key].src,
    overridden: Boolean(overrides[key]),
  }));
  return NextResponse.json({
    ok: true,
    dbConfigured: isDbConfigured(),
    blobConfigured: isBlobConfigured(),
    images,
  });
}

export async function POST(request: Request) {
  if (!isDbConfigured() || !isBlobConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error: "Stockage non configuré (POSTGRES_URL et BLOB_READ_WRITE_TOKEN requis).",
      },
      { status: 503 }
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  const key = String(form.get("key") || "");
  const file = form.get("file");

  if (!fixedImageKeys.includes(key as ImageKey)) {
    return NextResponse.json({ ok: false, error: "Image inconnue." }, { status: 400 });
  }
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ ok: false, error: "Fichier manquant." }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ ok: false, error: "Le fichier doit être une image." }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ ok: false, error: "Image trop lourde (max 8 Mo)." }, { status: 400 });
  }

  try {
    const url = await uploadImage(key, file);
    await setImageOverride(key, url);
    PUBLIC_PATHS.forEach((p) => revalidatePath(p));
    return NextResponse.json({ ok: true, url });
  } catch (err) {
    console.error("[admin/images] upload error:", err);
    // Surfaced to the authenticated admin to aid diagnosis.
    const detail = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { ok: false, error: `Échec du téléversement : ${detail}` },
      { status: 500 }
    );
  }
}
