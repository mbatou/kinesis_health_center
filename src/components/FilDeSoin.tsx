"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

// The "fil de soin" — the project's signature.
// A continuous violet→green thread in the left gutter that draws itself as the
// page scrolls, with nodes that light up along the way. Desktop only (≥ lg);
// mobile uses static per-section accents (EcgAccent). Overlay, non-interactive,
// aria-hidden, zero layout shift. Respects prefers-reduced-motion.

const VIEW_W = 48;
const VIEW_H = 1000;
const CX = 24; // line x position within the viewBox

// Node vertical positions as a fraction of scroll progress (poles 01→04).
const NODES = [0.14, 0.38, 0.62, 0.86];

type FilNodeProps = {
  progress: MotionValue<number>;
  at: number;
  isLast: boolean;
  reduced: boolean;
};

function FilNode({ progress, at, isLast, reduced }: FilNodeProps) {
  const lit = isLast ? "#3EA935" : "#5400AD";
  // Color and scale shift just before the thread reaches the node.
  const fill = useTransform(progress, [at - 0.04, at], ["#ECEAF3", lit]);
  const r = useTransform(progress, [at - 0.04, at], [4, 6]);
  const haloOpacity = useTransform(progress, [at - 0.04, at], [0, 0.18]);

  if (reduced) {
    return (
      <g>
        <circle cx={CX} cy={at * VIEW_H} r={6} fill={lit} />
      </g>
    );
  }

  return (
    <g>
      <motion.circle
        cx={CX}
        cy={at * VIEW_H}
        r={14}
        fill={lit}
        style={{ opacity: haloOpacity }}
      />
      <motion.circle cx={CX} cy={at * VIEW_H} style={{ r, fill }} />
    </g>
  );
}

export default function FilDeSoin() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Gentle smoothing so the trace feels fluid, not jittery.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // When reduced motion: draw the whole thread at once, nodes pre-lit.
  const pathLength = reduced ? 1 : smooth;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-1 z-30 hidden w-12 lg:block xl:left-4"
    >
      {/* Sticky so the thread stays in the viewport gutter while it draws. */}
      <div className="sticky top-0 h-screen">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
          className="h-full w-full"
          fill="none"
        >
          <defs>
            <linearGradient id="fil-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5400AD" />
              <stop offset="55%" stopColor="#7B4FC0" />
              <stop offset="100%" stopColor="#3EA935" />
            </linearGradient>
          </defs>

          {/* Track (faint full-height guide) */}
          <line
            x1={CX}
            y1="0"
            x2={CX}
            y2={VIEW_H}
            stroke="#ECEAF3"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />

          {/* Drawn thread */}
          <motion.path
            d={`M ${CX} 0 L ${CX} ${VIEW_H}`}
            stroke="url(#fil-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength }}
          />

          {NODES.map((at, i) => (
            <FilNode
              key={at}
              progress={smooth}
              at={at}
              isLast={i === NODES.length - 1}
              reduced={reduced}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
