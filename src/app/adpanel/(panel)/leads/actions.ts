"use server";

import { prisma } from "@/lib/prisma";

export async function markLeadReadAction(id: string): Promise<void> {
  await prisma.lead.update({
    where: { id },
    data: { isRead: true },
  });
}
