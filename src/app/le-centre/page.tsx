import type { Metadata } from "next";
import { HeartHandshake, Check } from "lucide-react";
import Section from "@/components/Section";
import SectionTitle from "@/components/SectionTitle";
import EcgDivider from "@/components/EcgDivider";
import CtaBand from "@/components/CtaBand";
import MediaFrame from "@/components/MediaFrame";
import Reveal from "@/components/Reveal";
import { centre } from "@/content/centre";
import { images } from "@/content/images";

export const metadata: Metadata = {
  title: "Le centre",
  description:
    "Kinesis Réadaptation, centre médical de référence à Dakar : excellence médicale, innovation technologique, démarche qualité et accompagnement personnalisé, dans le respect de la confidentialité et du confort.",
  alternates: { canonical: "/le-centre" },
};

export default function LeCentrePage() {
  return (
    <>
      {/* Intro + media */}
      <Section className="bg-surface">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionTitle
              kicker="Le centre"
              title="Un établissement de référence, au service des patients"
            />
            <Reveal>
              <p className="mt-6 max-w-prose text-lg leading-relaxed text-kinesis-grey">
                {centre.intro}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.05}>
            <MediaFrame
              src={images.accueil.src}
              alt={images.accueil.alt}
              ratio="aspect-[4/3]"
            />
          </Reveal>
        </div>
      </Section>

      <EcgDivider />

      {/* Values */}
      <Section>
        <Reveal>
          <SectionTitle
            kicker="Nos valeurs"
            title="Ce qui nous guide au quotidien"
          />
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {centre.values.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.05}>
              <div className="flex h-full gap-4 rounded-2xl border border-line bg-white p-6 shadow-sm">
                <Check
                  size={22}
                  className="mt-0.5 shrink-0 text-kinesis-green"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-lg font-bold text-kinesis-violet">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-kinesis-grey">
                    {value.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Personalized care */}
      <Section className="bg-surface">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <div>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-kinesis-violet/5 text-kinesis-violet">
                <HeartHandshake size={24} aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-h2 text-kinesis-ink">
                {centre.accompagnement.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-kinesis-grey">
                {centre.accompagnement.desc}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <ul className="space-y-4 rounded-2xl border border-line bg-white p-6 shadow-sm">
              {centre.accompagnement.points.map((point) => (
                <li key={point} className="flex items-center gap-3">
                  <Check size={18} className="shrink-0 text-kinesis-green" />
                  <span className="text-sm text-kinesis-ink">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Premises placeholder — TODO content: photos des locaux & équipements */}
      <Section>
        <Reveal>
          <SectionTitle
            kicker="Nos locaux"
            title="Un cadre confortable et apaisant"
            subtitle="Les photos de nos locaux et équipements seront ajoutées prochainement."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Reveal key={i} delay={i * 0.06}>
              <MediaFrame ratio="aspect-[4/3]" badge="Photo du centre à venir" />
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
