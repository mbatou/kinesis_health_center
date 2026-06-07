import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { poles } from "@/content/specialites";
import Reveal from "./Reveal";

// Numbered index of the 4 poles (01 → 04), like a magazine contents page.
// A thin local vertical line + a node per pole carries the "fil de soin"
// signature here too (and on mobile, where the global fil is hidden).
export default function PoleIndex() {
  return (
    <ol className="relative">
      {/* Local thread connecting the nodes */}
      <span
        aria-hidden="true"
        className="absolute bottom-6 left-[5px] top-6 w-px bg-gradient-to-b from-kinesis-violet to-kinesis-green"
      />
      {poles.map((pole, i) => (
        <li key={pole.id}>
          <Reveal delay={i * 0.05}>
            <Link
              href={`/specialites#${pole.id}`}
              className="group relative flex items-start gap-5 border-b border-line py-6 pl-8 transition-colors hover:bg-kinesis-violet-wash/40 sm:gap-8"
            >
              {/* Node */}
              <span
                aria-hidden="true"
                className={`absolute left-0 top-8 h-[11px] w-[11px] rounded-full ring-4 ring-white ${
                  i === poles.length - 1
                    ? "bg-kinesis-green"
                    : "bg-kinesis-violet"
                }`}
              />
              <span className="font-heading text-sm font-semibold tabular-nums text-kinesis-green">
                {pole.num}
              </span>
              <span className="flex-1">
                <span className="block text-pole text-kinesis-ink transition-colors group-hover:text-kinesis-violet">
                  {pole.title}
                </span>
                <span className="mt-1 block max-w-prose text-sm text-kinesis-grey">
                  {pole.intro}
                </span>
              </span>
              <ArrowUpRight
                size={20}
                className="mt-1 shrink-0 text-kinesis-grey-soft transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-kinesis-violet"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
