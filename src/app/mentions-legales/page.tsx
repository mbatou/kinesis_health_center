import type { Metadata } from "next";
import Section from "@/components/Section";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Kinesis Réadaptation.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <Section>
      <div className="prose-kinesis mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-kinesis-violet">
          Mentions légales
        </h1>

        <h2 className="mt-8 text-xl font-bold text-kinesis-violet">Éditeur</h2>
        <p className="mt-3 text-kinesis-grey">
          {site.name}
          <br />
          {site.address.full}
          <br />
          Téléphone : {site.phones.join(" / ")}
          <br />
          E-mail : {site.emailPublic}
        </p>

        <h2 className="mt-8 text-xl font-bold text-kinesis-violet">
          Directeur de la publication
        </h2>
        {/* TODO content : nom du responsable de la publication. */}
        <p className="mt-3 text-kinesis-grey">À compléter par le centre.</p>

        <h2 className="mt-8 text-xl font-bold text-kinesis-violet">
          Hébergement
        </h2>
        {/* TODO content : coordonnées de l'hébergeur (ex. Vercel Inc.). */}
        <p className="mt-3 text-kinesis-grey">
          Ce site est hébergé par son prestataire d&apos;hébergement. Les
          coordonnées complètes de l&apos;hébergeur seront précisées ici.
        </p>

        <h2 className="mt-8 text-xl font-bold text-kinesis-violet">
          Propriété intellectuelle
        </h2>
        <p className="mt-3 text-kinesis-grey">
          L&apos;ensemble des contenus (textes, images, logo, charte graphique)
          présents sur ce site est la propriété de {site.name}, sauf mention
          contraire. Toute reproduction ou représentation, totale ou partielle,
          sans autorisation préalable est interdite.
        </p>

        <h2 className="mt-8 text-xl font-bold text-kinesis-violet">
          Responsabilité
        </h2>
        <p className="mt-3 text-kinesis-grey">
          Les informations diffusées sur ce site ont un caractère informatif et
          ne se substituent en aucun cas à une consultation médicale. {site.name}
          {" "}met tout en œuvre pour assurer l&apos;exactitude des informations
          publiées, sans pouvoir en garantir l&apos;exhaustivité.
        </p>
      </div>
    </Section>
  );
}
