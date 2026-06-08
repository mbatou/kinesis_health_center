import type { Pole } from "@/content/specialites";
import SpecialtyList from "./SpecialtyList";
import EcgAccent from "./EcgAccent";
import Reveal from "./Reveal";
import Container from "./Container";

type Props = {
  pole: Pole;
  /** Alternating surface background for rhythm. */
  alt?: boolean;
};

// Detailed, anchored section for one pole. Asymmetric: heading column left,
// specialties right. The numbered heading echoes the "fil de soin" nodes.
export default function PoleSection({ pole, alt = false }: Props) {
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
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <SpecialtyList specialties={pole.specialties} compact={compact} />
        </Reveal>
      </Container>
    </section>
  );
}
