import { ShieldCheck, Sparkles, HeartHandshake } from "lucide-react";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import SectionTitle from "@/components/SectionTitle";
import PoleCard from "@/components/PoleCard";
import CtaBand from "@/components/CtaBand";
import EcgDivider from "@/components/EcgDivider";
import Reveal from "@/components/Reveal";
import { poles } from "@/content/specialites";

const advantages = [
  {
    icon: Sparkles,
    title: "Innovation technologique",
    desc: "Un plateau technique moderne et des équipements de pointe pour un diagnostic précis.",
  },
  {
    icon: HeartHandshake,
    title: "Circuit VIP",
    desc: "Un parcours privilégié, pensé pour la discrétion, le confort et la sérénité.",
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
      <Hero />

      <EcgDivider className="py-6" />

      {/* 4 pôles preview */}
      <Section className="pt-6 md:pt-10">
        <Reveal>
          <SectionTitle
            kicker="Nos spécialités"
            title="Quatre pôles, une prise en charge complète"
            subtitle="De la cardiologie à la réadaptation, nos pôles couvrent l'ensemble de votre parcours de soin."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {poles.map((pole, i) => (
            <Reveal key={pole.id} delay={i * 0.06}>
              <PoleCard pole={pole} />
            </Reveal>
          ))}
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
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {advantages.map((adv, i) => (
            <Reveal key={adv.title} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-sm">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-kinesis-green/10 text-kinesis-green">
                  <adv.icon size={24} aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-kinesis-violet">
                  {adv.title}
                </h3>
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
