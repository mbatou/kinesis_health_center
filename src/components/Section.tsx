import { ElementType, ReactNode } from "react";
import Container from "./Container";

type Props = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  as?: ElementType;
  /** When true, removes the inner Container (full-bleed content). */
  bleed?: boolean;
};

// Vertical rhythm wrapper for page sections.
export default function Section({
  children,
  className = "",
  containerClassName = "",
  id,
  as: Tag = "section",
  bleed = false,
}: Props) {
  return (
    <Tag id={id} className={`py-16 md:py-24 ${className}`}>
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </Tag>
  );
}
