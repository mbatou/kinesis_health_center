import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";

// Guard for all authed back-office pages (the login page lives outside this group).
export const metadata = { title: "Back office", robots: { index: false } };

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return <AdminShell>{children}</AdminShell>;
}
