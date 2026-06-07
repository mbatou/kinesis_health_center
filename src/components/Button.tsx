import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "outline" | "whatsapp";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-none disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-kinesis-violet text-white hover:bg-[#46008f] shadow-sm",
  outline:
    "border border-kinesis-violet text-kinesis-violet hover:bg-kinesis-violet/5",
  whatsapp: "bg-kinesis-green text-white hover:bg-[#34902c] shadow-sm",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type Props = ButtonAsButton | ButtonAsLink;

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: Props) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as ButtonAsLink;
    const isExternal = /^(https?:|tel:|mailto:)/.test(href);
    if (isExternal) {
      return (
        <a className={classes} href={href} {...anchorRest}>
          {children}
        </a>
      );
    }
    return (
      <Link className={classes} href={href} {...anchorRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonAsButton)}>
      {children}
    </button>
  );
}
