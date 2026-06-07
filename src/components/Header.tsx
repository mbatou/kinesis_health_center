"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { site } from "@/content/site";
import Container from "./Container";
import Button from "./Button";

const navItems = [
  { href: "/le-centre", label: "Le centre" },
  { href: "/specialites", label: "Nos spécialités" },
  { href: "/equipe", label: "Notre équipe" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile drawer on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center" aria-label={site.name}>
          <Image
            src="/logo.svg"
            alt={site.name}
            width={180}
            height={40}
            priority
            className="h-9 w-auto md:h-10"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Navigation principale">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`text-sm font-medium transition-colors hover:text-kinesis-violet ${
                isActive(item.href) ? "text-kinesis-violet" : "text-kinesis-grey"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Button href="/contact" variant="outline" size="md">
            Contact
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-kinesis-violet md:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden">
          <div
            className="fixed inset-0 top-16 z-30 bg-black/20"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <nav
            className="fixed inset-x-0 top-16 z-40 border-b border-line bg-white px-5 pb-6 pt-2 shadow-md"
            aria-label="Navigation mobile"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`block border-b border-line py-3 text-base font-medium ${
                  isActive(item.href)
                    ? "text-kinesis-violet"
                    : "text-kinesis-grey"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button href="/contact" size="lg" className="mt-4 w-full">
              Prendre contact
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
