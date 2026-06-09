import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";

// Google Maps iframe centered on the center's confirmed GPS coordinates.
// Lazy-loaded, with an "Itinéraire" link to open Google Maps.
export default function MapEmbed() {
  const { lat, lng } = site.geo;
  return (
    <div className="overflow-hidden rounded-2xl border border-line shadow-sm">
      <iframe
        title={`Localisation de ${site.name}`}
        src={`https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`}
        width="100%"
        height="360"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block w-full"
        allowFullScreen
      />
      <a
        href={site.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 border-t border-line bg-white py-3 text-sm font-medium text-kinesis-violet transition-colors hover:bg-kinesis-violet-wash"
      >
        Itinéraire
        <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </div>
  );
}
