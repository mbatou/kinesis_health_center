import { put } from "@vercel/blob";

// Image uploads to Vercel Blob. Guarded on BLOB_READ_WRITE_TOKEN so the app
// builds/runs without it (uploads are simply rejected with a clear message).

export function isBlobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function uploadImage(
  key: string,
  file: File
): Promise<string> {
  if (!isBlobConfigured()) {
    throw new Error("Stockage d'images non configuré (BLOB_READ_WRITE_TOKEN).");
  }
  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const path = `site/${key}-${Date.now()}.${ext}`;
  const blob = await put(path, file, {
    access: "public",
    contentType: file.type || undefined,
  });
  return blob.url;
}
