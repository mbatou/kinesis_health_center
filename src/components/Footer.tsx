import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, MapPin, Phone, Mail, Clock } from "lucide-react";
import { site, telLink } from "@/content/site";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand / NAP */}
          <div className="md:col-span-2">
            <Image
              src="/logo.svg"
              alt={site.name}
              width={180}
              height={40}
              className="h-10 w-auto"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-kinesis-grey">
              {site.tagline}. Centre médical pluridisciplinaire à {site.address.city}.
            </p>
            <address className="mt-4 flex items-start gap-2 not-italic text-sm text-kinesis-grey">
              <MapPin size={18} className="mt-0.5 shrink-0 text-kinesis-green" />
              <span>{site.address.full}</span>
            </address>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-kinesis-violet">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-kinesis-grey">
              {site.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={telLink(phone)}
                    className="flex items-center gap-2 hover:text-kinesis-violet"
                  >
                    <Phone size={16} className="text-kinesis-green" />
                    {phone}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.emailPublic}`}
                  className="flex items-center gap-2 hover:text-kinesis-violet"
                >
                  <Mail size={16} className="text-kinesis-green" />
                  {site.emailPublic}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={16} className="mt-0.5 shrink-0 text-kinesis-green" />
                <span>
                  {site.hours}
                  <br />
                  {site.hoursVip}
                </span>
              </li>
            </ul>
          </div>

          {/* Navigation + legal */}
          <div>
            <h3 className="text-sm font-semibold text-kinesis-violet">Liens</h3>
            <ul className="mt-4 space-y-3 text-sm text-kinesis-grey">
              <li>
                <Link href="/le-centre" className="hover:text-kinesis-violet">
                  Le centre
                </Link>
              </li>
              <li>
                <Link href="/specialites" className="hover:text-kinesis-violet">
                  Nos spécialités
                </Link>
              </li>
              <li>
                <Link href="/equipe" className="hover:text-kinesis-violet">
                  Notre équipe
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-kinesis-violet">
                  Contact
                </Link>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a
                href={site.socials.facebook}
                aria-label="Facebook"
                className="rounded-full border border-line p-2 text-kinesis-grey transition-colors hover:border-kinesis-violet hover:text-kinesis-violet"
              >
                <Facebook size={18} />
              </a>
              <a
                href={site.socials.instagram}
                aria-label="Instagram"
                className="rounded-full border border-line p-2 text-kinesis-grey transition-colors hover:border-kinesis-violet hover:text-kinesis-violet"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-xs text-kinesis-grey-soft md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Tous droits réservés.
          </p>
          <div className="flex gap-4">
            <Link href="/mentions-legales" className="hover:text-kinesis-violet">
              Mentions légales
            </Link>
            <Link
              href="/politique-confidentialite"
              className="hover:text-kinesis-violet"
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
