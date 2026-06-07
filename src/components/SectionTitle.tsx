import { ReactNode } from "react";
import Kicker from "./Kicker";

type Props = {
  kicker?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

// Standard section heading: green uppercase kicker + editorial title + subtitle.
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
      {kicker && <Kicker className="mb-3">{kicker}</Kicker>}
      <h2 className="text-h2 text-balance text-kinesis-ink">{title}</h2>
      {subtitle && (
        <p className="mt-4 max-w-prose text-kinesis-grey">{subtitle}</p>
      )}
    </div>
  );
}
