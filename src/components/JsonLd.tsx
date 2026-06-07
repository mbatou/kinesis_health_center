import { site } from "@/content/site";
import { poles } from "@/content/specialites";

// Structured data (schema.org MedicalClinic) for local + medical SEO.
// Rendered in the root layout so it appears on every page.
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: site.name,
    description: site.description,
    url: site.url,
    logo: `${site.url}/logo.svg`,
    image: `${site.url}/opengraph-image`,
    telephone: site.phones[0],
    email: site.emailPublic,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressCountry: "SN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    openingHours: site.openingHours,
    medicalSpecialty: poles.map((p) => p.title),
    sameAs: [site.socials.facebook, site.socials.instagram].filter(
      (s) => s && s !== "#"
    ),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
