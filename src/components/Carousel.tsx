import Image from "next/image";
import type { GalleryItem } from "@/lib/editable";

// Auto-moving photo carousel (CSS marquee — GPU-friendly, no JS timers).
// Pauses on hover; static under prefers-reduced-motion. Duration scales with the
// number of photos so the speed feels constant. Duplicated once for a seamless
// loop; the copies are aria-hidden.
export default function Carousel({ items }: { items: GalleryItem[] }) {
  if (!items.length) return null;
  const loop = [...items, ...items];
  const duration = `${Math.max(items.length * 6, 24)}s`;

  return (
    <div className="group relative overflow-hidden">
      {/* Soft edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent md:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent md:w-20" />
      <ul
        className="flex w-max gap-5 animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]"
        style={{ animationDuration: duration }}
      >
        {loop.map((it, i) => (
          <li
            key={i}
            aria-hidden={i >= items.length ? true : undefined}
            className="relative aspect-[4/3] w-72 shrink-0 overflow-hidden rounded-3xl border border-line bg-surface sm:w-80"
          >
            <Image
              src={it.url}
              alt={it.alt || "Photo du centre Kinesis Réadaptation"}
              fill
              sizes="320px"
              className="object-cover"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
