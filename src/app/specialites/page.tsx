import type { Metadata } from "next";
import Section from "@/components/Section";
import SectionTitle from "@/components/SectionTitle";
import SpecialtyList from "@/components/SpecialtyList";
import EcgDivider from "@/components/EcgDivider";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { iconMap } from "@/components/icons";
import { poles } from "@/content/specialites";

export const metadata: Metadata = {
  title: "Nos spécialités",
  description:
    "Cardiologie, médecine vasculaire, explorations fonctionnelles, réadaptation, balnéothérapie et consultations spécialisées à Dakar — quatre pôles pour une prise en charge complète.",
  alternates: { canonical: "/specialites" },
};

export default function SpecialitesPage() {
  return (
    <>
      {/* Page header */}
      <Section className="bg-surface" >
        <SectionTitle
          kicker="Nos spécialités"
          title="Quatre pôles pour une prise en charge complète"
          subtitle="Cardiologie, explorations fonctionnelles, réadaptation et consultations spécialisées, réunies en un seul lieu à Dakar."
        />
        {/* Anchor navigation */}
        <nav className="mt-8 flex flex-wrap gap-2" aria-label="Pôles">
          {poles.map((pole) => (
            <a
              key={pole.id}
              href={`#${pole.id}`}
              className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-kinesis-grey transition-colors hover:border-kinesis-violet hover:text-kinesis-violet"
            >
              {pole.title}
            </a>
          ))}
        </nav>
      </Section>

      {/* Anchored pole sections */}
      {poles.map((pole, index) => {
        const Icon = iconMap[pole.icon] ?? iconMap.Stethoscope;
        const compact = pole.specialties.every((s) => !s.desc);
        return (
          <div key={pole.id}>
            <Section id={pole.id} className={index % 2 === 1 ? "bg-surface" : ""}>
              <Reveal>
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-kinesis-violet/5 text-kinesis-violet">
                    <Icon size={26} aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="text-2xl font-bold text-kinesis-violet md:text-3xl">
                      {pole.title}
                    </h2>
                    <p className="mt-2 max-w-2xl text-base leading-relaxed text-kinesis-grey">
                      {pole.intro}
                    </p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <div className="mt-8 max-w-3xl">
                  <SpecialtyList
                    specialties={pole.specialties}
                    compact={compact}
                  />
                </div>
              </Reveal>
            </Section>
            {index < poles.length - 1 && <EcgDivider />}
          </div>
        );
      })}

      <CtaBand
        title="Besoin d'une orientation ?"
        subtitle="Contactez-nous : nous vous orientons vers le bon spécialiste."
      />
    </>
  );
}
