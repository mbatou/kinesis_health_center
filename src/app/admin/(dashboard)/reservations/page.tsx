"use client";

import { useEffect, useState } from "react";
import { Loader2, Phone, Mail, AlertCircle, Inbox } from "lucide-react";

type Submission = {
  id: number;
  type: string;
  nom: string;
  telephone: string;
  email: string | null;
  specialite: string | null;
  message: string;
  status: string;
  created_at: string;
};

const STATUSES = ["nouveau", "traité", "archivé"] as const;

const statusStyle: Record<string, string> = {
  nouveau: "bg-kinesis-violet/10 text-kinesis-violet",
  traité: "bg-kinesis-green/10 text-kinesis-green",
  archivé: "bg-line text-kinesis-grey-soft",
};

export default function ReservationsPage() {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbConfigured, setDbConfigured] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/submissions");
        const data = await res.json();
        setItems(data.submissions ?? []);
        setDbConfigured(Boolean(data.dbConfigured));
      } catch {
        setError("Chargement impossible.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function changeStatus(id: number, status: string) {
    setItems((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
    await fetch("/api/admin/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
  }

  function formatDate(iso: string) {
    try {
      return new Date(iso).toLocaleString("fr-FR", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return iso;
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
      <h1 className="text-2xl font-bold text-kinesis-ink">Réservations & contacts</h1>
      <p className="mt-1 text-sm text-kinesis-grey">
        Messages reçus depuis le formulaire de contact du site.
      </p>

      {!dbConfigured && (
        <div className="mt-5 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          Base de données non configurée : les messages s&apos;afficheront ici une fois Vercel Postgres ajouté (ils sont déjà envoyés par e-mail).
        </div>
      )}

      {error && <p className="mt-5 text-sm text-red-600">{error}</p>}

      {dbConfigured && items.length === 0 && (
        <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-line bg-white p-12 text-center text-kinesis-grey">
          <Inbox size={32} className="text-kinesis-grey-soft" />
          <p className="mt-3 text-sm">Aucun message pour le moment.</p>
        </div>
      )}

      <div className="mt-6 space-y-4">
        {items.map((s) => (
          <article key={s.id} className="rounded-2xl border border-line bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-kinesis-ink">{s.nom}</p>
                <p className="text-xs text-kinesis-grey-soft">{formatDate(s.created_at)}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                  statusStyle[s.status] ?? statusStyle.nouveau
                }`}
              >
                {s.status}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-kinesis-grey">
              <a href={`tel:${s.telephone.replace(/\s+/g, "")}`} className="inline-flex items-center gap-1.5 hover:text-kinesis-violet">
                <Phone size={14} className="text-kinesis-green" />
                {s.telephone}
              </a>
              {s.email && (
                <a href={`mailto:${s.email}`} className="inline-flex items-center gap-1.5 hover:text-kinesis-violet">
                  <Mail size={14} className="text-kinesis-green" />
                  {s.email}
                </a>
              )}
              {s.specialite && (
                <span className="text-kinesis-grey-soft">Spécialité : {s.specialite}</span>
              )}
            </div>

            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-kinesis-ink">
              {s.message}
            </p>

            <div className="mt-4 flex gap-2">
              {STATUSES.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => changeStatus(s.id, st)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors ${
                    s.status === st
                      ? "border-kinesis-violet bg-kinesis-violet/10 text-kinesis-violet"
                      : "border-line text-kinesis-grey hover:border-kinesis-violet-light"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
