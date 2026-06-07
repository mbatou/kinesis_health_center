// Brand signature: a thin green ECG line used as a discreet section separator.
// Inline SVG so it scales crisply and can inherit color.

type Props = {
  className?: string;
};

export default function EcgDivider({ className = "" }: Props) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 40"
        className="h-8 w-full max-w-md text-kinesis-green"
        fill="none"
        preserveAspectRatio="none"
        role="presentation"
      >
        <path
          d="M0 20 H120 L135 20 L145 8 L158 32 L170 20 L182 4 L196 36 L208 20 L222 20 H280 L292 20 L300 14 L312 26 L322 20 H400"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
