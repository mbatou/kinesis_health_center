import type { Metadata } from "next";
import Section from "@/components/Section";
import SectionTitle from "@/components/SectionTitle";
import TeamCard from "@/components/TeamCard";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { team } from "@/content/equipe";

export const metadata: Metadata = {
  title: "Notre équipe",
  description:
    "Une équipe pluridisciplinaire de praticiens spécialisés au service de votre santé, au centre Kinesis Réadaptation à Dakar.",
  alternates: { canonical: "/equipe" },
};

export default function EquipePage() {
  return (
    <>
      <Section className="bg-surface">
        <SectionTitle
          kicker="Notre équipe"
          title="Une équipe engagée, à votre écoute"
          subtitle="Médecins, soignants et personnel d'accueil : une équipe pluridisciplinaire au service de votre santé. Les photos seront ajoutées prochainement."
        />
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <Reveal key={`${member.name}-${i}`} delay={(i % 3) * 0.06}>
              <TeamCard member={member} />
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Envie de rejoindre notre équipe ?"
        subtitle="Contactez-nous pour toute candidature ou collaboration."
      />
    </>
  );
}
