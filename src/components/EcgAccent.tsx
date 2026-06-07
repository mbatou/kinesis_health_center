type Props = {
  className?: string;
  /** Width of the accent line in px (height scales with stroke). */
  width?: number;
};

// Small reusable ECG accent — a short violet→green pulse line. Used as a static
// section accent (esp. mobile, where the global "fil de soin" is hidden).
export default function EcgAccent({ className = "", width = 88 }: Props) {
  return (
    <svg
      viewBox="0 0 120 24"
      width={width}
      height={(width * 24) / 120}
      fill="none"
      aria-hidden="true"
      role="presentation"
      className={className}
    >
      <defs>
        <linearGradient id="ecg-accent-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5400AD" />
          <stop offset="100%" stopColor="#3EA935" />
        </linearGradient>
      </defs>
      <path
        d="M0 12 H44 L52 12 L58 4 L66 20 L72 12 L78 6 L86 18 L92 12 H120"
        stroke="url(#ecg-accent-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
