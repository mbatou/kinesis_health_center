import { MessageCircle, Phone } from "lucide-react";
import { site, whatsappLink, telLink } from "@/content/site";
import Container from "./Container";
import Button from "./Button";
import SpinePattern from "./SpinePattern";

type Props = {
  title?: string;
  subtitle?: string;
};

// Full-width CTA band (the one place green is used as a large flat).
export default function CtaBand({
  title = "Une question ? Écrivez-nous sur WhatsApp",
  subtitle = "Notre équipe vous répond rapidement et vous accompagne dans votre prise en charge.",
}: Props) {
  return (
    <section className="relative overflow-hidden bg-kinesis-violet">
      {/* Discreet brand decor */}
      <SpinePattern className="pointer-events-none absolute -right-4 top-0 h-full w-24 opacity-20" />
      <Container className="relative py-14 md:py-16">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold text-white md:text-3xl">{title}</h2>
            <p className="mt-3 text-violet-100/90 text-kinesis-violet-pale">
              {subtitle}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              href={whatsappLink()}
              variant="whatsapp"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={20} />
              WhatsApp
            </Button>
            <Button
              href={telLink(site.phones[0])}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              <Phone size={20} />
              Appeler
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
