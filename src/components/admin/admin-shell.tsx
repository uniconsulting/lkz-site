"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Inbox, LayoutGrid, LogOut, Plus, Settings2 } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils/cn";
import { logoutAction } from "@/app/adpanel/login/actions";

function NavLink({
  href,
  icon,
  label,
  badge,
  exact = false,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  badge?: number;
  exact?: boolean;
}) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex w-full items-center gap-3 rounded-[16px] px-4 py-3 text-[14px] font-medium transition duration-300 hover:-translate-y-[1px]",
        isActive
          ? "bg-[var(--color-bg)] text-[var(--color-text)]"
          : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text)]",
      )}
    >
      {icon}
      <span className="flex-1">{label}</span>
      {badge != null && badge > 0 && (
        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-accent-1)] px-1.5 text-[11px] font-semibold text-[var(--color-accent-1-foreground)]">
          {badge}
        </span>
      )}
    </Link>
  );
}

export function AdminShell({
  children,
  unreadLeads = 0,
}: {
  children: ReactNode;
  unreadLeads?: number;
}) {
  return (
    <motion.div
      className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto max-w-[1680px] px-4 pb-10 pt-[104px] md:px-6 md:pt-[116px] xl:px-8 xl:pt-[124px]">
        <div className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)] xl:items-start">
          <aside className="xl:sticky xl:top-[120px]">
            <div className="rounded-[30px] bg-[var(--color-surface)] p-4 md:p-5">
              <div className="space-y-1">
                <NavLink
                  href="/adpanel/products"
                  icon={<LayoutGrid size={16} strokeWidth={2.1} />}
                  label="Товары"
                />
                <NavLink
                  href="/adpanel/products/new"
                  icon={<Plus size={16} strokeWidth={2.1} />}
                  label="Новый товар"
                  exact
                />
              </div>

              <div className="my-4 h-px bg-[var(--color-bg)]" />

              <div className="space-y-1">
                <NavLink
                  href="/adpanel/leads"
                  icon={<Inbox size={16} strokeWidth={2.1} />}
                  label="Заявки"
                  badge={unreadLeads}
                  exact
                />
                <NavLink
                  href="/adpanel/settings"
                  icon={<Settings2 size={16} strokeWidth={2.1} />}
                  label="Уведомления"
                  exact
                />
              </div>

              <div className="mt-4 border-t border-[var(--color-bg)] pt-4">
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center gap-3 rounded-[16px] px-4 py-3 text-[14px] font-medium text-[var(--color-text-muted)] transition duration-300 hover:-translate-y-[1px] hover:bg-[var(--color-bg)] hover:text-[var(--color-text)]"
                  >
                    <LogOut size={16} strokeWidth={2.1} />
                    <span>Выйти</span>
                  </button>
                </form>
              </div>
            </div>
          </aside>

          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </motion.div>
  );
}
