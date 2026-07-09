"use client";

import { useEffect, useRef, useState } from "react";
import {
  Loader2,
  Save,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

type Member = {
  uid: number;
  name: string;
  role: string;
  specialty?: string;
  bio?: string;
  photo?: string;
};

type ApiMember = Omit<Member, "uid">;

let counter = 0;
const withUid = (m: ApiMember): Member => ({ uid: ++counter, ...m });

export default function EquipeAdminPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [defaults, setDefaults] = useState<ApiMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dbConfigured, setDbConfigured] = useState(true);
  const [blobConfigured, setBlobConfigured] = useState(true);
  const [uploadingUid, setUploadingUid] = useState<number | null>(null);
  const [notice, setNotice] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const inputs = useRef<Record<number, HTMLInputElement | null>>({});

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/team");
        const data = await res.json();
        setMembers((data.team ?? []).map(withUid));
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

  function update(uid: number, patch: Partial<Member>) {
    setMembers((prev) => prev.map((m) => (m.uid === uid ? { ...m, ...patch } : m)));
  }
  function remove(uid: number) {
    setMembers((prev) => prev.filter((m) => m.uid !== uid));
  }
  function addMember() {
    setMembers((prev) => [...prev, withUid({ name: "", role: "" })]);
  }
  function move(uid: number, dir: -1 | 1) {
    setMembers((prev) => {
      const i = prev.findIndex((m) => m.uid === uid);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  async function uploadPhoto(uid: number, file: File) {
    setUploadingUid(uid);
    setNotice(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/team/photo", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Échec du téléversement.");
      update(uid, { photo: data.url });
      setNotice({ kind: "ok", text: "Photo ajoutée. N'oubliez pas d'enregistrer." });
    } catch (err) {
      setNotice({ kind: "err", text: err instanceof Error ? err.message : "Échec." });
    } finally {
      setUploadingUid(null);
    }
  }

  async function save() {
    setSaving(true);
    setNotice(null);
    const payload = members.map(({ uid, ...m }) => {
      void uid;
      return m;
    });
    try {
      const res = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ team: payload }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Échec.");
      setNotice({ kind: "ok", text: "Équipe enregistrée et publiée." });
    } catch (err) {
      setNotice({ kind: "err", text: err instanceof Error ? err.message : "Échec." });
    } finally {
      setSaving(false);
    }
  }

  function resetToDefaults() {
    setMembers(defaults.map(withUid));
    setNotice({ kind: "ok", text: "Liste par défaut restaurée (pensez à enregistrer)." });
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-kinesis-grey">
        <Loader2 className="animate-spin" size={20} /> Chargement…
      </div>
    );
  }

  const fieldClass =
    "mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-kinesis-ink focus:border-kinesis-violet focus:outline-none focus:ring-1 focus:ring-kinesis-violet";

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-kinesis-ink">Équipe</h1>
          <p className="mt-1 text-sm text-kinesis-grey">
            Ajoutez, modifiez, réorganisez ou retirez les membres. Publié après enregistrement.
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

      <div className="mt-8 space-y-5">
        {members.map((m, i) => (
          <div key={m.uid} className="rounded-2xl border border-line bg-white p-5">
            <div className="flex gap-5">
              {/* Photo */}
              <div className="shrink-0">
                <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-line bg-surface">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.photo || "/team/placeholder.svg"}
                    alt={m.name || "Membre"}
                    className="h-full w-full object-cover"
                  />
                </div>
                <input
                  ref={(el) => {
                    inputs.current[m.uid] = el;
                  }}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadPhoto(m.uid, file);
                    e.target.value = "";
                  }}
                />
                <button
                  type="button"
                  disabled={!blobConfigured || uploadingUid === m.uid}
                  onClick={() => inputs.current[m.uid]?.click()}
                  className="mt-2 inline-flex w-24 items-center justify-center gap-1 rounded-full border border-kinesis-violet px-2 py-1.5 text-xs font-medium text-kinesis-violet transition-colors hover:bg-kinesis-violet/5 disabled:opacity-50"
                >
                  {uploadingUid === m.uid ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <Upload size={13} />
                  )}
                  Photo
                </button>
              </div>

              {/* Fields */}
              <div className="flex-1">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-kinesis-grey">Nom *</label>
                    <input
                      className={fieldClass}
                      value={m.name}
                      onChange={(e) => update(m.uid, { name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-kinesis-grey">Fonction *</label>
                    <input
                      className={fieldClass}
                      value={m.role}
                      onChange={(e) => update(m.uid, { role: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-kinesis-grey">Spécialité</label>
                    <input
                      className={fieldClass}
                      value={m.specialty ?? ""}
                      onChange={(e) => update(m.uid, { specialty: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-kinesis-grey">Bio (courte)</label>
                    <input
                      className={fieldClass}
                      value={m.bio ?? ""}
                      onChange={(e) => update(m.uid, { bio: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => move(m.uid, -1)}
                    disabled={i === 0}
                    aria-label="Monter"
                    className="rounded-lg p-1.5 text-kinesis-grey hover:bg-surface disabled:opacity-30"
                  >
                    <ArrowUp size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(m.uid, 1)}
                    disabled={i === members.length - 1}
                    aria-label="Descendre"
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
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={addMember}
          className="inline-flex items-center gap-2 rounded-full border border-kinesis-violet px-5 py-2.5 text-sm font-medium text-kinesis-violet transition-colors hover:bg-kinesis-violet/5"
        >
          <Plus size={18} /> Ajouter un membre
        </button>
        <button
          type="button"
          onClick={resetToDefaults}
          className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-kinesis-grey transition-colors hover:border-kinesis-violet-light"
        >
          <RotateCcw size={16} /> Restaurer la liste par défaut
        </button>
      </div>
    </div>
  );
}
