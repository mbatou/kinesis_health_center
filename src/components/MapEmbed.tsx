import { site } from "@/content/site";

// Google Maps iframe centered on the center's address. Lazy-loaded.
export default function MapEmbed() {
  const query = encodeURIComponent(site.address.full);
  return (
    <div className="overflow-hidden rounded-2xl border border-line shadow-sm">
      <iframe
        title={`Localisation de ${site.name}`}
        src={`https://www.google.com/maps?q=${query}&output=embed`}
        width="100%"
        height="360"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block w-full"
        allowFullScreen
      />
    </div>
  );
}
