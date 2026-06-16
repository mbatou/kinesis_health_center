import type { Metadata } from "next";
import "./globals.css";
import { heading, body } from "./fonts";
import { site } from "@/content/site";
import { getSiteContent } from "@/lib/editable";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import FilDeSoin from "@/components/FilDeSoin";
import JsonLd from "@/components/JsonLd";
import ChromeGate from "@/components/ChromeGate";

export async function generateMetadata(): Promise<Metadata> {
  const { tagline } = await getSiteContent();
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${tagline}`,
      template: `%s — ${site.name}`,
    },
    description: site.description,
    applicationName: site.name,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: site.name,
      title: `${site.name} — ${tagline}`,
      description: site.description,
      url: site.url,
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} — ${tagline}`,
      description: site.description,
    },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${heading.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col bg-white font-body text-kinesis-ink antialiased">
        <ChromeGate
          jsonld={<JsonLd />}
          header={<Header />}
          fil={<FilDeSoin />}
          footer={<Footer />}
          whatsapp={<WhatsAppFloat />}
        >
          {children}
        </ChromeGate>
      </body>
    </html>
  );
}
