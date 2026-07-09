import { NextResponse } from "next/server";
import { uploadImage, isBlobConfigured } from "@/lib/blob";

// Generic image upload → Vercel Blob → returns the public URL. Used by the
// gallery editor; the URL is then saved into the gallery list.
export async function POST(request: Request) {
  if (!isBlobConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Stockage d'images non configuré (Vercel Blob)." },
      { status: 503 }
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  const file = form.get("file");
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
    const url = await uploadImage("gallery", file);
    return NextResponse.json({ ok: true, url });
  } catch (err) {
    console.error("[admin/upload] error:", err);
    const detail = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { ok: false, error: `Échec du téléversement : ${detail}` },
      { status: 500 }
    );
  }
}
