import { ArrowUpRight, MessageCircle } from "lucide-react";
import { site, whatsappLink } from "@/content/site";
import { getHomeContent, getSiteImages } from "@/lib/editable";
import Container from "./Container";
import Button from "./Button";
import Kicker from "./Kicker";
import MediaFrame from "./MediaFrame";
import EcgAccent from "./EcgAccent";

// Asymmetric editorial hero: display title left, real-photo media right.
export default async function EditorialHero() {
  const home = await getHomeContent();
  const images = await getSiteImages();

  return (
    <section className="relative overflow-hidden">
      <Container className="grid items-center gap-10 py-16 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        {/* Text column */}
        <div>
          <Kicker>Centre médical pluridisciplinaire · {site.address.city}</Kicker>
          <h1 className="mt-5 text-display text-kinesis-ink">
            {home.heroLine1}
            <br />
            <span className="text-kinesis-violet">{home.heroLine2}</span>
          </h1>
          <EcgAccent width={120} className="mt-6" />
          <p className="mt-6 max-w-prose text-lg text-kinesis-grey">
            {home.heroLede}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/contact" size="lg">
              Prendre contact
              <ArrowUpRight size={18} />
            </Button>
            <Button
              href={whatsappLink()}
              variant="whatsapp"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={20} />
              Écrire sur WhatsApp
            </Button>
          </div>
        </div>

        {/* Media column — sits beside the title; never a full-bleed background,
            so the "fil de soin" stays readable. */}
        <div className="lg:pl-4">
          <MediaFrame
            src={images.hero.src}
            alt={images.hero.alt}
            ratio="aspect-[3/4]"
            priority
          />
        </div>
      </Container>
    </section>
  );
}
