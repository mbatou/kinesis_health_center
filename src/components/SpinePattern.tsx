// Brand signature: a column of dots/vertebrae shading violet -> green, echoing
// the logo and the charte cover. Used as a discreet corner decoration on the
// Hero and Contact page. Decorative only.

type Props = {
  className?: string;
};

export default function SpinePattern({ className = "" }: Props) {
  const dots = Array.from({ length: 10 });
  return (
    <svg
      viewBox="0 0 60 320"
      className={className}
      fill="none"
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <linearGradient id="spine-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5400AD" />
          <stop offset="100%" stopColor="#3EA935" />
        </linearGradient>
      </defs>
      {dots.map((_, i) => {
        // Slight taper to suggest a spine/vertebrae column.
        const r = 10 - Math.abs(i - 4.5) * 0.6;
        return (
          <circle
            key={i}
            cx="30"
            cy={20 + i * 32}
            r={r}
            fill="url(#spine-grad)"
          />
        );
      })}
    </svg>
  );
}
