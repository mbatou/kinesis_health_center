import Section from "./Section";
import Kicker from "./Kicker";
import EcgAccent from "./EcgAccent";
import MediaFrame from "./MediaFrame";
import Reveal from "./Reveal";
import { getDirectorContent, getSiteImages } from "@/lib/editable";

// "Le mot du directeur" — a reassuring violet-wash panel on the home page:
// director's photo + message + signature. Falls back to the elegant MediaFrame
// placeholder until a real portrait is provided.
export default async function DirectorWord() {
  const director = await getDirectorContent();
  const images = await getSiteImages();

  return (
    <Section>
      <Reveal>
        <div className="rounded-3xl border border-line bg-kinesis-violet-wash p-6 md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
            {/* Portrait */}
            <MediaFrame
              src={images.director.src}
              alt={`Portrait de ${director.name}`}
              ratio="aspect-[4/5]"
              badge="Photo du directeur à venir"
            />

            {/* Message */}
            <div>
              <Kicker>Le mot du directeur</Kicker>
              <EcgAccent width={88} className="mt-4" />
              <div className="mt-5 space-y-4">
                {director.message.map((paragraph, i) => (
                  <p
                    key={i}
                    className="max-w-prose text-base leading-relaxed text-kinesis-grey"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-6">
                <p className="font-heading text-lg font-semibold text-kinesis-ink">
                  {director.signature}
                </p>
                <p className="text-sm text-kinesis-green">{director.role}</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
