import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Pole } from "@/content/specialites";
import { iconMap } from "./icons";

type Props = {
  pole: Pole;
};

// Compact card previewing a pôle on the homepage; links to its anchored section.
export default function PoleCard({ pole }: Props) {
  const Icon = iconMap[pole.icon] ?? iconMap.Stethoscope;
  return (
    <Link
      href={`/specialites#${pole.id}`}
      className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-kinesis-violet-light hover:shadow-md"
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-kinesis-violet/5 text-kinesis-violet">
        <Icon size={24} aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-lg font-bold text-kinesis-violet">
        {pole.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-kinesis-grey">
        {pole.intro}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-kinesis-green">
        Découvrir
        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}
