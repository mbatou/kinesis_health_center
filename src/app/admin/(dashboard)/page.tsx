import Link from "next/link";
import { FileText, Inbox, ImageIcon, AlertTriangle, CheckCircle2 } from "lucide-react";
import { countNewSubmissions, isDbConfigured } from "@/lib/db";
import { isBlobConfigured } from "@/lib/blob";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const dbOk = isDbConfigured();
  const blobOk = isBlobConfigured();
  const newCount = dbOk ? await countNewSubmissions() : 0;

  const cards = [
    {
      href: "/admin/contenu",
      icon: FileText,
      title: "Contenu",
      desc: "Modifier les textes du site (accueil, pôles, le mot du directeur, coordonnées).",
    },
    {
      href: "/admin/reservations",
      icon: Inbox,
      title: "Réservations & contacts",
      desc: dbOk
        ? `${newCount} nouveau(x) message(s) à traiter.`
        : "Messages reçus depuis le formulaire du site.",
    },
    {
      href: "/admin/images",
      icon: ImageIcon,
      title: "Images",
      desc: "Remplacer les photos du site (accueil, locaux, balnéothérapie, directeur).",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-kinesis-ink">Tableau de bord</h1>
      <p className="mt-2 text-kinesis-grey">
        Bienvenue dans l&apos;espace de gestion de Kinesis Réadaptation.
      </p>

      {(!dbOk || !blobOk) && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <AlertTriangle size={20} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">Stockage à configurer sur Vercel</p>
            <ul className="mt-1 list-disc space-y-0.5 pl-5">
              {!dbOk && <li>Base de données (Vercel Postgres) — édition de contenu & messages.</li>}
              {!blobOk && <li>Stockage de fichiers (Vercel Blob) — téléversement d&apos;images.</li>}
            </ul>
            <p className="mt-1">
              Une fois ces services ajoutés au projet, tout devient actif automatiquement.
            </p>
          </div>
        </div>
      )}

      {dbOk && blobOk && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-kinesis-green/30 bg-kinesis-green/5 p-4 text-sm text-kinesis-grey">
          <CheckCircle2 size={20} className="shrink-0 text-kinesis-green" />
          Stockage connecté — édition de contenu, messages et images actifs.
        </div>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group rounded-2xl border border-line bg-white p-6 transition-colors hover:border-kinesis-violet-light"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-kinesis-violet/5 text-kinesis-violet">
              <c.icon size={22} aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-lg font-bold text-kinesis-ink group-hover:text-kinesis-violet">
              {c.title}
            </h2>
            <p className="mt-1 text-sm text-kinesis-grey">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
