"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  jsonld: ReactNode;
  header: ReactNode;
  fil: ReactNode;
  footer: ReactNode;
  whatsapp: ReactNode;
  children: ReactNode;
};

// Renders the public site chrome (header, footer, fil de soin, WhatsApp button)
// for normal pages, but NOT for the /admin back office, which has its own layout.
export default function ChromeGate({
  jsonld,
  header,
  fil,
  footer,
  whatsapp,
  children,
}: Props) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      {jsonld}
      {header}
      <main className="relative flex-1">
        {fil}
        {children}
      </main>
      {footer}
      {whatsapp}
    </>
  );
}
