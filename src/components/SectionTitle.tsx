import { ReactNode } from "react";

type Props = {
  kicker?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

// Standard section heading: small green kicker + title + optional subtitle.
export default function SectionTitle({
  kicker,
  title,
  subtitle,
  align = "left",
  className = "",
}: Props) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignment} ${className}`}>
      {kicker && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-kinesis-green">
          {kicker}
        </p>
      )}
      <h2 className="text-2xl font-bold leading-tight text-kinesis-violet md:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base leading-relaxed text-kinesis-grey">
          {subtitle}
        </p>
      )}
    </div>
  );
}
