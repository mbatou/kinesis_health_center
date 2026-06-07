import { Check } from "lucide-react";
import type { Specialty } from "@/content/specialites";

type Props = {
  specialties: Specialty[];
  /** Compact mode (names only) for poles without descriptions. */
  compact?: boolean;
};

// Renders a pole's specialties, with or without descriptions.
export default function SpecialtyList({ specialties, compact = false }: Props) {
  if (compact) {
    return (
      <ul className="flex flex-wrap gap-2">
        {specialties.map((s) => (
          <li
            key={s.name}
            className="rounded-full border border-line bg-white px-3 py-1.5 text-sm text-kinesis-grey"
          >
            {s.name}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-4">
      {specialties.map((s) => (
        <li key={s.name} className="flex gap-3">
          <Check
            size={18}
            className="mt-1 shrink-0 text-kinesis-green"
            aria-hidden="true"
          />
          <div>
            <p className="font-semibold text-kinesis-ink">{s.name}</p>
            {s.desc && (
              <p className="mt-0.5 text-sm leading-relaxed text-kinesis-grey">
                {s.desc}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
