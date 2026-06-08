"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import EcgAccent from "./EcgAccent";

type Props = {
  /** Real image source. When omitted (or it fails to load), an elegant branded
   * placeholder shows instead — never a broken image. */
  src?: string;
  alt?: string;
  /** aspect-ratio utility, e.g. "aspect-[4/5]" or "aspect-[3/2]". */
  ratio?: string;
  className?: string;
  /** Hint priority for above-the-fold media (the hero). Others stay lazy. */
  priority?: boolean;
  /** Caption shown on the placeholder badge. */
  badge?: string;
};

// Media container that accepts a real photo without any rework. Until real,
// local photos of the center arrive — or if one is missing — it shows an
// assumed, elegant placeholder. Never Western stock imagery.
export default function MediaFrame({
  src,
  alt = "",
  ratio = "aspect-[4/5]",
  className = "",
  priority = false,
  badge = "Photographie réelle du centre",
}: Props) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-line ${ratio} ${className}`}
    >
      {showImage ? (
        <Image
          src={src as string}
          alt={alt}
          fill
          priority={priority}
          // Lazy by default; priority skips lazy-loading for the hero.
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-full w-full flex-col justify-between bg-kinesis-violet-wash p-6">
          <EcgAccent width={96} className="opacity-80" />
          <div className="flex items-center gap-2 self-start rounded-full bg-white/70 px-3 py-1.5 text-xs font-medium text-kinesis-violet ring-1 ring-kinesis-violet/10 backdrop-blur">
            <Camera size={14} aria-hidden="true" />
            {badge}
          </div>
        </div>
      )}
    </div>
  );
}
