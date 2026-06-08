import { ShieldCheck, Sparkles, HeartHandshake } from "lucide-react";
import EditorialHero from "@/components/EditorialHero";
import Section from "@/components/Section";
import SectionTitle from "@/components/SectionTitle";
import PoleIndex from "@/components/PoleIndex";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";

const advantages = [
  {
    icon: Sparkles,
    title: "Innovation technologique",
    desc: "Un plateau technique moderne et des équipements de pointe pour un diagnostic précis.",
  },
  {
    icon: HeartHandshake,
    title: "Accompagnement personnalisé",
    desc: "Un parcours pensé pour chaque patient, dans le respect de la confidentialité et de la sérénité.",
  },
  {
    icon: ShieldCheck,
    title: "Démarche qualité",
    desc: "Des protocoles rigoureux et l'expertise de praticiens spécialisés, en un seul lieu.",
  },
];

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
            subtitle="Kinesis Réadaptation allie innovation technologique et expertise humaine, premier centre privé de médecine vasculaire de la place."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {advantages.map((adv, i) => (
            <Reveal key={adv.title} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-kinesis-green/10 text-kinesis-green">
                  <adv.icon size={24} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-pole text-kinesis-ink">{adv.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-kinesis-grey">
                  {adv.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
