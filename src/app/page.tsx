import { ShieldCheck, Layers, HeartHandshake } from "lucide-react";
import EditorialHero from "@/components/EditorialHero";
import Section from "@/components/Section";
import SectionTitle from "@/components/SectionTitle";
import PoleIndex from "@/components/PoleIndex";
import DirectorWord from "@/components/DirectorWord";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { site } from "@/content/site";

// Icons paired with site.highlights (presentation only; the copy is frozen).
const highlightIcons = [ShieldCheck, Layers, HeartHandshake];

export default function Home() {
  return (
    <>
      <EditorialHero />

      {/* Numbered index of the 4 poles */}
      <Section>
        <Reveal>
          <SectionTitle
            kicker="Nos spécialités"
            title="Quatre pôles, des expertises réunies"
            subtitle="De la cardiologie aux consultations spécialisées, suivez le fil qui relie nos quatre pôles d'expertise, réunis en un seul lieu."
          />
        </Reveal>
        <div className="mt-12">
          <PoleIndex />
        </div>
      </Section>

      {/* Why Kinesis */}
      <Section className="bg-surface">
        <Reveal>
          <SectionTitle
            kicker="Pourquoi Kinesis"
            title="L'excellence médicale, dans un cadre d'exception"
            subtitle="Kinesis Réadaptation allie innovation technologique et expertise médicale, premier centre privé de médecine vasculaire de la place."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {site.highlights.map((highlight, i) => {
            const Icon = highlightIcons[i] ?? ShieldCheck;
            return (
              <Reveal key={highlight} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-7">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-kinesis-green/10 text-kinesis-green">
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <p className="mt-5 text-pole text-kinesis-ink">{highlight}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Le mot du directeur */}
      <DirectorWord />

      <CtaBand />
    </>
  );
}
