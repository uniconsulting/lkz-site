"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { LayoutGrid, Package, Plus, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

function NavLink({
  href,
  icon,
  label,
  exact = false,
}: {
  href: string;
  icon: ReactNode;
  label: string;
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
      <span>{label}</span>
    </Link>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="mx-auto max-w-[1680px] px-4 pb-10 pt-[104px] md:px-6 md:pt-[116px] xl:px-8 xl:pt-[124px]">
        <div className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)] xl:items-start">
          <aside className="xl:sticky xl:top-[120px]">
            <div className="rounded-[30px] bg-[var(--color-surface)] p-4 md:p-5">
              <Link
                href="/admin/products"
                className="flex items-center gap-3 rounded-[20px] bg-[var(--color-bg)] p-3 transition duration-300 hover:-translate-y-[1px]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-[var(--color-surface)]">
                  <Package size={18} strokeWidth={2.1} />
                </div>

                <div>
                  <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
                    lkz
                  </div>
                  <div className="mt-1 text-[15px] font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                    admin panel
                  </div>
                </div>
              </Link>

              <div className="mt-5 space-y-1">
                <NavLink
                  href="/admin/products"
                  icon={<LayoutGrid size={16} strokeWidth={2.1} />}
                  label="Товары"
                />
                <NavLink
                  href="/admin/products/new"
                  icon={<Plus size={16} strokeWidth={2.1} />}
                  label="Новый товар"
                  exact
                />
              </div>

              <div className="my-4 h-px bg-[var(--color-bg)]" />

              <div className="space-y-1">
                <NavLink
                  href="/admin/settings"
                  icon={<Settings2 size={16} strokeWidth={2.1} />}
                  label="Уведомления"
                  exact
                />
              </div>
            </div>
          </aside>

          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
