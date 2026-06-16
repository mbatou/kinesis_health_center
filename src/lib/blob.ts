import { put, type PutCommandOptions } from "@vercel/blob";

// Image uploads to Vercel Blob. Two supported auth modes:
//  - Classic: a read-write token in BLOB_READ_WRITE_TOKEN (or a prefixed variant).
//  - OIDC (current Vercel default): no static token — the SDK uses the runtime
//    VERCEL_OIDC_TOKEN together with the store id (BLOB_STORE_ID).
// We detect either and let the SDK pick the right path.

function resolveBySuffix(suffix: string): string | undefined {
  if (process.env[suffix]) return process.env[suffix];
  const key = Object.keys(process.env).find((k) => k.endsWith(suffix));
  return key ? process.env[key] : undefined;
}

function resolveBlobToken(): string | undefined {
  return resolveBySuffix("BLOB_READ_WRITE_TOKEN");
}

function resolveStoreId(): string | undefined {
  return resolveBySuffix("BLOB_STORE_ID");
}

export function isBlobConfigured(): boolean {
  return Boolean(resolveBlobToken() || resolveStoreId());
}

export async function uploadImage(key: string, file: File): Promise<string> {
  const token = resolveBlobToken();
  const storeId = resolveStoreId();
  if (!token && !storeId) {
    throw new Error("Stockage d'images non configuré (Vercel Blob).");
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const path = `site/${key}-${Date.now()}.${ext}`;

  const options: PutCommandOptions = {
    access: "public",
    contentType: file.type || undefined,
  };
  if (token) {
    // Classic read-write token mode.
    options.token = token;
  } else if (storeId) {
    // OIDC mode: SDK uses VERCEL_OIDC_TOKEN (auto-injected on Vercel) + store id.
    options.storeId = storeId;
  }

  const blob = await put(path, file, options);
  return blob.url;
}
