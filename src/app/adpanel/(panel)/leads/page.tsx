import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { LeadsTable, type LeadRow } from "@/components/admin/leads-table";
import { prisma } from "@/lib/prisma";

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  const rows: LeadRow[] = leads.map((l) => ({
    id: l.id,
    createdAt: l.createdAt.toISOString(),
    type: l.type,
    source: l.source,
    name: l.name,
    contact: l.contact,
    data: l.data,
    isRead: l.isRead,
  }));

  const unreadCount = leads.filter((l) => !l.isRead).length;

  return (
    <div className="space-y-4">
      <AdminPageHeader
        eyebrow="заявки"
        title={unreadCount > 0 ? `Заявки (${unreadCount} новых)` : "Заявки"}
        description="Все обращения с сайта: обратная связь, B2B-калькулятор, входящие КП."
      />
      <LeadsTable leads={rows} />
    </div>
  );
}
