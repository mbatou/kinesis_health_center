import { put } from "@vercel/blob";

// Image uploads to Vercel Blob. The read/write token is normally
// BLOB_READ_WRITE_TOKEN, but a marketplace/prefixed integration may name it
// <PREFIX>_BLOB_READ_WRITE_TOKEN, so we resolve it from any matching var.

function resolveBlobToken(): string | undefined {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN;
  const key = Object.keys(process.env).find((k) =>
    k.endsWith("BLOB_READ_WRITE_TOKEN")
  );
  return key ? process.env[key] : undefined;
}

export function isBlobConfigured(): boolean {
  return Boolean(resolveBlobToken());
}

export async function uploadImage(key: string, file: File): Promise<string> {
  const token = resolveBlobToken();
  if (!token) {
    throw new Error("Stockage d'images non configuré (BLOB_READ_WRITE_TOKEN).");
  }
  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const path = `site/${key}-${Date.now()}.${ext}`;
  const blob = await put(path, file, {
    access: "public",
    token,
    contentType: file.type || undefined,
  });
  return blob.url;
}
