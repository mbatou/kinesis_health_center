import type { Metadata } from "next";
import { HeartHandshake, Check } from "lucide-react";
import Section from "@/components/Section";
import SectionTitle from "@/components/SectionTitle";
import EcgDivider from "@/components/EcgDivider";
import CtaBand from "@/components/CtaBand";
import Carousel from "@/components/Carousel";
import Reveal from "@/components/Reveal";
import { getCentreContent, getGalleryContent } from "@/lib/editable";

export const metadata: Metadata = {
  title: "Le centre",
  description:
    "Kinesis Réadaptation, centre médical de référence à Dakar : excellence médicale, innovation technologique, démarche qualité et accompagnement personnalisé, dans le respect de la confidentialité et de la sérénité de chaque patient.",
  alternates: { canonical: "/le-centre" },
};

export default async function LeCentrePage() {
  const centre = await getCentreContent();
  const gallery = await getGalleryContent();
  return (
    <>
      {/* Intro */}
      <Section className="bg-surface">
        <SectionTitle
          kicker="Le centre"
          title="Un établissement de référence, au service des patients"
        />
        <Reveal>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-kinesis-grey">
            {centre.intro}
          </p>
        </Reveal>
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

      {/* Premises gallery — moving carousel */}
      {gallery.length > 0 && (
        <Section>
          <Reveal>
            <SectionTitle
              kicker="Nos locaux"
              title="Un cadre confortable et apaisant"
              subtitle="Espace d'accueil, plateaux de soin, bassin de balnéothérapie : découvrez le centre en images."
            />
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-10">
              <Carousel items={gallery} />
            </div>
          </Reveal>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
