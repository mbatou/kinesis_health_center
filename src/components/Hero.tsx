import { MessageCircle, ArrowRight } from "lucide-react";
import { site, whatsappLink } from "@/content/site";
import Container from "./Container";
import Button from "./Button";
import SpinePattern from "./SpinePattern";

// Homepage hero: premium positioning, double CTA, vertebrae decor.
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface">
      {/* Brand decor — vertebrae column in the corner */}
      <SpinePattern className="pointer-events-none absolute -top-6 right-2 hidden h-[420px] w-16 opacity-30 md:block lg:right-12" />
      <Container className="relative py-20 md:py-28">
        <div className="max-w-2xl animate-fade-up">
          <p className="mb-4 inline-flex items-center rounded-full bg-kinesis-violet/5 px-3 py-1 text-sm font-semibold text-kinesis-violet">
            Centre médical pluridisciplinaire · {site.address.city}
          </p>
          <h1 className="text-4xl font-bold leading-tight text-kinesis-violet md:text-5xl">
            {site.tagline}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-kinesis-grey">
            Kinesis Réadaptation réunit en un seul lieu cardiologie, médecine
            vasculaire, réadaptation et consultations spécialisées — dans un
            circuit VIP pensé pour la discrétion et le confort.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              href={whatsappLink()}
              variant="whatsapp"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={20} />
              Contacter sur WhatsApp
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Prendre contact
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
