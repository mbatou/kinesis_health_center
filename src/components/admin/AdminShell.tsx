"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  Inbox,
  ImageIcon,
  LogOut,
  ExternalLink,
} from "lucide-react";

const nav = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { href: "/admin/contenu", label: "Contenu", icon: FileText },
  { href: "/admin/equipe", label: "Équipe", icon: Users },
  { href: "/admin/reservations", label: "Réservations & contacts", icon: Inbox },
  { href: "/admin/images", label: "Images", icon: ImageIcon },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar */}
      <aside className="flex w-60 shrink-0 flex-col border-r border-line bg-white">
        <div className="flex h-16 items-center border-b border-line px-5">
          <Image src="/logo.svg" alt="Kinesis Réadaptation" width={150} height={32} className="h-8 w-auto" />
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive(item.href, item.exact)
                  ? "bg-kinesis-violet/10 text-kinesis-violet"
                  : "text-kinesis-grey hover:bg-surface hover:text-kinesis-violet"
              }`}
            >
              <item.icon size={18} aria-hidden="true" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="space-y-1 border-t border-line p-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-kinesis-grey transition-colors hover:bg-surface hover:text-kinesis-violet"
          >
            <ExternalLink size={18} aria-hidden="true" />
            Voir le site
          </a>
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-kinesis-grey transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={18} aria-hidden="true" />
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-4xl px-6 py-10">{children}</div>
      </div>
    </div>
  );
}
