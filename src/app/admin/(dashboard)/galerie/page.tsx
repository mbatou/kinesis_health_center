"use client";

import { useEffect, useRef, useState } from "react";
import {
  Loader2,
  Save,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

type Item = { uid: number; url: string; alt?: string };
type ApiItem = { url: string; alt?: string };

let counter = 0;
const withUid = (m: ApiItem): Item => ({ uid: ++counter, ...m });

export default function GalerieAdminPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [defaults, setDefaults] = useState<ApiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [adding, setAdding] = useState(false);
  const [dbConfigured, setDbConfigured] = useState(true);
  const [blobConfigured, setBlobConfigured] = useState(true);
  const [notice, setNotice] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/gallery");
        const data = await res.json();
        setItems((data.gallery ?? []).map(withUid));
        setDefaults(data.defaults ?? []);
        setDbConfigured(Boolean(data.dbConfigured));
        setBlobConfigured(Boolean(data.blobConfigured));
      } catch {
        setNotice({ kind: "err", text: "Chargement impossible." });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function update(uid: number, patch: Partial<Item>) {
    setItems((prev) => prev.map((m) => (m.uid === uid ? { ...m, ...patch } : m)));
  }
  function remove(uid: number) {
    setItems((prev) => prev.filter((m) => m.uid !== uid));
  }
  function move(uid: number, dir: -1 | 1) {
    setItems((prev) => {
      const i = prev.findIndex((m) => m.uid === uid);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  async function addImage(file: File) {
    setAdding(true);
    setNotice(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Échec du téléversement.");
      setItems((prev) => [...prev, withUid({ url: data.url, alt: "" })]);
      setNotice({ kind: "ok", text: "Image ajoutée. N'oubliez pas d'enregistrer." });
    } catch (err) {
      setNotice({ kind: "err", text: err instanceof Error ? err.message : "Échec." });
    } finally {
      setAdding(false);
    }
  }

  async function save() {
    setSaving(true);
    setNotice(null);
    const payload = items.map(({ url, alt }) => ({ url, alt }));
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gallery: payload }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Échec.");
      setNotice({ kind: "ok", text: "Carrousel enregistré et publié." });
    } catch (err) {
      setNotice({ kind: "err", text: err instanceof Error ? err.message : "Échec." });
    } finally {
      setSaving(false);
    }
  }

  function resetToDefaults() {
    setItems(defaults.map(withUid));
    setNotice({ kind: "ok", text: "Carrousel par défaut restauré (pensez à enregistrer)." });
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
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-kinesis-ink">Galerie — carrousel « Le centre »</h1>
          <p className="mt-1 text-sm text-kinesis-grey">
            Les photos défilent en carrousel sur la page « Le centre ». Publié après enregistrement.
          </p>
        </div>
        <button
          type="button"
          onClick={save}
          disabled={saving || !dbConfigured}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-kinesis-violet px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#46008f] disabled:opacity-60"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Enregistrer
        </button>
      </div>

      {!dbConfigured && (
        <div className="mt-5 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          Base de données non configurée : l&apos;enregistrement est désactivé.
        </div>
      )}
      {dbConfigured && !blobConfigured && (
        <div className="mt-5 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          Stockage d&apos;images (Vercel Blob) non configuré : l&apos;ajout de photos est indisponible.
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
        {items.map((m, i) => (
          <div key={m.uid} className="rounded-2xl border border-line bg-white p-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.url} alt={m.alt || "Photo"} className="h-full w-full object-cover" />
            </div>
            <label className="mt-3 block text-xs font-medium text-kinesis-grey">
              Description (alt)
            </label>
            <input
              className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-kinesis-ink focus:border-kinesis-violet focus:outline-none focus:ring-1 focus:ring-kinesis-violet"
              value={m.alt ?? ""}
              placeholder="Ex. Salle de balnéothérapie"
              onChange={(e) => update(m.uid, { alt: e.target.value })}
            />
            <div className="mt-3 flex items-center gap-1">
              <button
                type="button"
                onClick={() => move(m.uid, -1)}
                disabled={i === 0}
                aria-label="Déplacer avant"
                className="rounded-lg p-1.5 text-kinesis-grey hover:bg-surface disabled:opacity-30"
              >
                <ArrowUp size={16} />
              </button>
              <button
                type="button"
                onClick={() => move(m.uid, 1)}
                disabled={i === items.length - 1}
                aria-label="Déplacer après"
                className="rounded-lg p-1.5 text-kinesis-grey hover:bg-surface disabled:opacity-30"
              >
                <ArrowDown size={16} />
              </button>
              <button
                type="button"
                onClick={() => remove(m.uid)}
                className="ml-auto inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
              >
                <Trash2 size={14} /> Retirer
              </button>
            </div>
          </div>
        ))}
      </div>

      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) addImage(file);
          e.target.value = "";
        }}
      />
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={!blobConfigured || adding}
          onClick={() => fileInput.current?.click()}
          className="inline-flex items-center gap-2 rounded-full border border-kinesis-violet px-5 py-2.5 text-sm font-medium text-kinesis-violet transition-colors hover:bg-kinesis-violet/5 disabled:opacity-50"
        >
          {adding ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
          Ajouter une image
        </button>
        <button
          type="button"
          onClick={resetToDefaults}
          className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-kinesis-grey transition-colors hover:border-kinesis-violet-light"
        >
          <RotateCcw size={16} /> Restaurer par défaut
        </button>
      </div>
    </div>
  );
}
