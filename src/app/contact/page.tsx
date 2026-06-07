import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import Section from "@/components/Section";
import SectionTitle from "@/components/SectionTitle";
import ContactForm from "@/components/ContactForm";
import MapEmbed from "@/components/MapEmbed";
import Button from "@/components/Button";
import SpinePattern from "@/components/SpinePattern";
import { site, telLink, whatsappLink } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Kinesis Réadaptation à Dakar : WhatsApp, téléphone, e-mail et formulaire. Sacré Cœur Keur Gorgui, Villa AW N°18.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-surface">
        <SpinePattern className="pointer-events-none absolute right-2 top-0 hidden h-full w-16 opacity-25 md:block" />
        <Section bleed className="relative">
          <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
            <SectionTitle
              kicker="Contact"
              title="Prenons contact"
              subtitle="Une question, une demande d'information ou de rendez-vous ? Écrivez-nous sur WhatsApp, appelez-nous ou utilisez le formulaire."
            />
            <div className="mt-6 flex flex-wrap gap-3">
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
              <Button href={telLink(site.phones[0])} variant="outline" size="lg">
                <Phone size={20} />
                Appeler
              </Button>
            </div>
          </div>
        </Section>
      </section>

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Form */}
          <div>
            <h2 className="text-xl font-bold text-kinesis-violet">
              Envoyez-nous un message
            </h2>
            <p className="mt-2 text-sm text-kinesis-grey">
              Les champs marqués d&apos;un{" "}
              <span className="text-kinesis-green">*</span> sont obligatoires.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          {/* Coordinates */}
          <div>
            <h2 className="text-xl font-bold text-kinesis-violet">
              Nos coordonnées
            </h2>
            <ul className="mt-6 space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0 text-kinesis-green" />
                <div>
                  <p className="font-medium text-kinesis-ink">Adresse</p>
                  <address className="not-italic text-kinesis-grey">
                    {site.address.full}
                  </address>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="mt-0.5 shrink-0 text-kinesis-green" />
                <div>
                  <p className="font-medium text-kinesis-ink">Téléphone</p>
                  {site.phones.map((phone) => (
                    <a
                      key={phone}
                      href={telLink(phone)}
                      className="block text-kinesis-grey hover:text-kinesis-violet"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={20} className="mt-0.5 shrink-0 text-kinesis-green" />
                <div>
                  <p className="font-medium text-kinesis-ink">E-mail</p>
                  <a
                    href={`mailto:${site.emailPublic}`}
                    className="text-kinesis-grey hover:text-kinesis-violet"
                  >
                    {site.emailPublic}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={20} className="mt-0.5 shrink-0 text-kinesis-green" />
                <div>
                  <p className="font-medium text-kinesis-ink">Horaires</p>
                  <p className="text-kinesis-grey">{site.hours}</p>
                </div>
              </li>
            </ul>

            <div className="mt-8">
              <MapEmbed />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
