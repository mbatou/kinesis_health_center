"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Upload, AlertCircle, CheckCircle2 } from "lucide-react";

type ImageItem = {
  key: string;
  alt: string;
  defaultSrc: string;
  currentSrc: string;
  overridden: boolean;
};

export default function ImagesPage() {
  const [items, setItems] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(true);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const inputs = useRef<Record<string, HTMLInputElement | null>>({});

  async function load() {
    try {
      const res = await fetch("/api/admin/images");
      const data = await res.json();
      setItems(data.images ?? []);
      setReady(Boolean(data.dbConfigured) && Boolean(data.blobConfigured));
    } catch {
      setNotice({ kind: "err", text: "Chargement impossible." });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function upload(key: string, file: File) {
    setUploadingKey(key);
    setNotice(null);
    try {
      const form = new FormData();
      form.append("key", key);
      form.append("file", file);
      const res = await fetch("/api/admin/images", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Échec du téléversement.");
      setNotice({ kind: "ok", text: "Image mise à jour et publiée." });
      await load();
    } catch (err) {
      setNotice({ kind: "err", text: err instanceof Error ? err.message : "Échec." });
    } finally {
      setUploadingKey(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-kinesis-grey">
        <Loader2 className="animate-spin" size={20} /> Chargement…
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-kinesis-ink">Images</h1>
      <p className="mt-1 text-sm text-kinesis-grey">
        Remplacez les photos du site. Formats image, 8 Mo maximum.
      </p>

      {!ready && (
        <div className="mt-5 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          Stockage non configuré : ajoutez Vercel Postgres et Vercel Blob au projet pour activer le téléversement.
        </div>
      )}

      {notice && (
        <div
          role="status"
          className={`mt-5 flex items-start gap-2 rounded-xl border p-3 text-sm ${
            notice.kind === "ok"
              ? "border-kinesis-green/30 bg-kinesis-green/5 text-kinesis-grey"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {notice.kind === "ok" ? (
            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-kinesis-green" />
          ) : (
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
          )}
          {notice.text}
        </div>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {items.map((img) => (
          <div key={img.key} className="rounded-2xl border border-line bg-white p-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.currentSrc}
                alt={img.alt}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-3 text-sm font-medium text-kinesis-ink">{img.alt}</p>
            <p className="text-xs text-kinesis-grey-soft">
              {img.overridden ? "Image personnalisée" : "Image par défaut"} · clé : {img.key}
            </p>
            <input
              ref={(el) => {
                inputs.current[img.key] = el;
              }}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) upload(img.key, file);
                e.target.value = "";
              }}
            />
            <button
              type="button"
              disabled={!ready || uploadingKey === img.key}
              onClick={() => inputs.current[img.key]?.click()}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-kinesis-violet px-4 py-2 text-sm font-medium text-kinesis-violet transition-colors hover:bg-kinesis-violet/5 disabled:opacity-60"
            >
              {uploadingKey === img.key ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Téléversement…
                </>
              ) : (
                <>
                  <Upload size={16} /> Remplacer
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
