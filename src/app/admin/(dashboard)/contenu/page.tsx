"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2, Save, CheckCircle2, AlertCircle } from "lucide-react";

type Field = {
  key: string;
  label: string;
  group: string;
  multiline?: boolean;
  default: string;
};

export default function ContenuPage() {
  const [fields, setFields] = useState<Field[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dbConfigured, setDbConfigured] = useState(true);
  const [notice, setNotice] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/content");
        const data = await res.json();
        const f: Field[] = data.fields ?? [];
        setFields(f);
        setDbConfigured(Boolean(data.dbConfigured));
        const init: Record<string, string> = {};
        for (const field of f) {
          init[field.key] = data.overrides?.[field.key] ?? field.default;
        }
        setValues(init);
      } catch {
        setNotice({ kind: "err", text: "Chargement impossible." });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const groups = useMemo(() => {
    const map = new Map<string, Field[]>();
    for (const f of fields) {
      if (!map.has(f.group)) map.set(f.group, []);
      map.get(f.group)!.push(f);
    }
    return Array.from(map.entries());
  }, [fields]);

  async function save() {
    setSaving(true);
    setNotice(null);
    // Only send values that differ from the default (keeps overrides minimal).
    const changed: Record<string, string> = {};
    for (const f of fields) {
      if (values[f.key] !== undefined && values[f.key] !== f.default) {
        changed[f.key] = values[f.key];
      }
    }
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values: changed }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Échec.");
      setNotice({ kind: "ok", text: "Modifications enregistrées et publiées." });
    } catch (err) {
      setNotice({ kind: "err", text: err instanceof Error ? err.message : "Échec." });
    } finally {
      setSaving(false);
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
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-kinesis-ink">Contenu</h1>
          <p className="mt-1 text-sm text-kinesis-grey">
            Modifiez les textes du site. Les changements sont publiés immédiatement.
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
          Base de données non configurée : l&apos;enregistrement est désactivé tant que Vercel Postgres n&apos;est pas ajouté.
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

      <div className="mt-8 space-y-10">
        {groups.map(([group, groupFields]) => (
          <section key={group}>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-kinesis-green">
              {group}
            </h2>
            <div className="mt-4 space-y-5 rounded-2xl border border-line bg-white p-6">
              {groupFields.map((f) => (
                <div key={f.key}>
                  <label htmlFor={f.key} className="block text-sm font-medium text-kinesis-ink">
                    {f.label}
                  </label>
                  {f.multiline ? (
                    <textarea
                      id={f.key}
                      rows={3}
                      value={values[f.key] ?? ""}
                      onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                      className="mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-kinesis-ink focus:border-kinesis-violet focus:outline-none focus:ring-1 focus:ring-kinesis-violet"
                    />
                  ) : (
                    <input
                      id={f.key}
                      type="text"
                      value={values[f.key] ?? ""}
                      onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                      className="mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-kinesis-ink focus:border-kinesis-violet focus:outline-none focus:ring-1 focus:ring-kinesis-violet"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
