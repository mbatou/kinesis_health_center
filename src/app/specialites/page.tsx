import type { Metadata } from "next";
import Section from "@/components/Section";
import SectionTitle from "@/components/SectionTitle";
import PoleSection from "@/components/PoleSection";
import CtaBand from "@/components/CtaBand";
import { getPolesContent } from "@/lib/editable";

export const metadata: Metadata = {
  title: "Nos spécialités",
  description:
    "Cardiologie, médecine vasculaire, explorations fonctionnelles, réadaptation, balnéothérapie et consultations spécialisées à Dakar — quatre pôles pour une prise en charge complète.",
  alternates: { canonical: "/specialites" },
};

export default async function SpecialitesPage() {
  const poles = await getPolesContent();
  return (
    <>
      {/* Page header + numbered anchor nav */}
      <Section>
        <SectionTitle
          kicker="Nos spécialités"
          title="Quatre pôles, des expertises réunies"
          subtitle="Cardiologie, explorations fonctionnelles, réadaptation et consultations spécialisées, réunies en un seul lieu à Dakar."
        />
        <nav className="mt-10 flex flex-wrap gap-x-8 gap-y-3" aria-label="Pôles">
          {poles.map((pole) => (
            <a
              key={pole.id}
              href={`#${pole.id}`}
              className="group inline-flex items-baseline gap-2 text-sm text-kinesis-grey transition-colors hover:text-kinesis-violet"
            >
              <span className="font-heading font-semibold tabular-nums text-kinesis-green">
                {pole.num}
              </span>
              {pole.title}
            </a>
          ))}
        </nav>
      </Section>

      {/* Anchored pole sections, traversed by the fil de soin */}
      {poles.map((pole, index) => (
        <PoleSection key={pole.id} pole={pole} alt={index % 2 === 1} />
      ))}

      <CtaBand
        title="Besoin d'une orientation ?"
        subtitle="Contactez-nous : nous vous orientons vers le bon spécialiste."
      />
    </>
  );
}
