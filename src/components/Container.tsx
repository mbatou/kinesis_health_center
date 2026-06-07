import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

// Centered max-width wrapper with consistent horizontal padding.
export default function Container({ children, className = "" }: Props) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 md:px-8 ${className}`}>
      {children}
    </div>
  );
}
