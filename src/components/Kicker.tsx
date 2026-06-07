import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

// Editorial over-title: uppercase, wide tracking, green.
export default function Kicker({ children, className = "" }: Props) {
  return (
    <p
      className={`text-kicker uppercase text-kinesis-green ${className}`}
    >
      {children}
    </p>
  );
}
