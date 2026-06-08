import type { Pole } from "@/content/specialites";
import SpecialtyList from "./SpecialtyList";
import MediaFrame from "./MediaFrame";
import EcgAccent from "./EcgAccent";
import Reveal from "./Reveal";
import Container from "./Container";

type Media = { src: string; alt: string };

type Props = {
  pole: Pole;
  /** Alternating surface background for rhythm. */
  alt?: boolean;
  /** Main section image (heading column). */
  image?: Media;
  /** Secondary visual shown alongside the specialties (e.g. balnéothérapie). */
  secondaryImage?: Media;
};

// Detailed, anchored section for one pole. Asymmetric: heading column left,
// specialties right. The numbered heading echoes the "fil de soin" nodes.
export default function PoleSection({
  pole,
  alt = false,
  image,
  secondaryImage,
}: Props) {
  const compact = pole.specialties.every((s) => !s.desc);
  return (
    <section
      id={pole.id}
      className={`scroll-mt-24 py-20 md:py-28 ${alt ? "bg-surface" : ""}`}
    >
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-baseline gap-4">
              <span className="font-heading text-4xl font-bold tabular-nums text-kinesis-violet-light">
                {pole.num}
              </span>
              <EcgAccent width={72} />
            </div>
            <h2 className="mt-4 text-h2 text-kinesis-ink">{pole.title}</h2>
            <p className="mt-4 max-w-prose text-kinesis-grey">{pole.intro}</p>
            {image && (
              <MediaFrame
                src={image.src}
                alt={image.alt}
                ratio="aspect-[4/3]"
                className="mt-8"
              />
            )}
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div>
            <SpecialtyList specialties={pole.specialties} compact={compact} />
            {secondaryImage && (
              <MediaFrame
                src={secondaryImage.src}
                alt={secondaryImage.alt}
                ratio="aspect-[3/2]"
                className="mt-8"
              />
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
