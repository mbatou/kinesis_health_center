import type { Metadata } from "next";
import Section from "@/components/Section";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et protection des données — Kinesis Réadaptation.",
  alternates: { canonical: "/politique-confidentialite" },
  robots: { index: false, follow: true },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-kinesis-violet">
          Politique de confidentialité
        </h1>
        <p className="mt-4 text-kinesis-grey">
          {site.name} accorde une importance particulière à la protection de vos
          données personnelles et au respect de la confidentialité médicale.
        </p>

        <h2 className="mt-8 text-xl font-bold text-kinesis-violet">
          Données collectées
        </h2>
        <p className="mt-3 text-kinesis-grey">
          Via le formulaire de contact, nous collectons les informations que
          vous nous transmettez : nom, téléphone, e-mail, spécialité concernée
          et message. Ces données sont utilisées uniquement pour répondre à
          votre demande.
        </p>

        <h2 className="mt-8 text-xl font-bold text-kinesis-violet">
          Confidentialité des données de santé
        </h2>
        <p className="mt-3 text-kinesis-grey">
          Toute information relative à votre santé est traitée de manière
          strictement confidentielle, dans le respect du secret médical. Nous
          vous invitons à ne pas communiquer d&apos;informations médicales
          sensibles via le formulaire ; celles-ci seront recueillies dans un
          cadre approprié lors de votre prise en charge.
        </p>

        <h2 className="mt-8 text-xl font-bold text-kinesis-violet">
          Conservation et destinataires
        </h2>
        <p className="mt-3 text-kinesis-grey">
          Vos données sont conservées le temps nécessaire au traitement de votre
          demande et ne sont en aucun cas cédées ou vendues à des tiers. Elles
          sont accessibles uniquement par le personnel habilité du centre.
        </p>

        <h2 className="mt-8 text-xl font-bold text-kinesis-violet">Vos droits</h2>
        <p className="mt-3 text-kinesis-grey">
          Vous disposez d&apos;un droit d&apos;accès, de rectification et de
          suppression de vos données. Pour exercer ces droits, contactez-nous à
          l&apos;adresse{" "}
          <a
            href={`mailto:${site.emailPublic}`}
            className="text-kinesis-violet underline"
          >
            {site.emailPublic}
          </a>
          .
        </p>

        <h2 className="mt-8 text-xl font-bold text-kinesis-violet">Cookies</h2>
        <p className="mt-3 text-kinesis-grey">
          Ce site n&apos;utilise pas de cookies de suivi publicitaire. Seuls des
          cookies techniques strictement nécessaires au bon fonctionnement du
          site peuvent être déposés.
        </p>
      </div>
    </Section>
  );
}
