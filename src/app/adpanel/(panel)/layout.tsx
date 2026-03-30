export const dynamic = "force-dynamic";

import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { Header } from "@/components/layout/header";
import { prisma } from "@/lib/prisma";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const unreadLeads = await prisma.lead.count({ where: { isRead: false } });

  return (
    <>
      <Header />
      <AdminShell unreadLeads={unreadLeads}>{children}</AdminShell>
    </>
  );
}
