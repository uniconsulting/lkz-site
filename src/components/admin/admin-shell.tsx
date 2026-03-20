"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { LayoutGrid, Package, Plus } from "lucide-react";

const basePath = process.env.NODE_ENV === "production" ? "/lkz-site" : "";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="mx-auto max-w-[1680px] px-4 pb-10 pt-[104px] md:px-6 md:pt-[116px] xl:px-8 xl:pt-[124px]">
        <div className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)] xl:items-start">
          <aside className="xl:sticky xl:top-[120px]">
            <div className="rounded-[30px] bg-[var(--color-surface)] p-4 md:p-5">
              <Link
                href={`${basePath}/admin/products`}
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

              <div className="mt-5 space-y-2">
                <Link
                  href={`${basePath}/admin/products`}
                  className="inline-flex w-full items-center gap-3 rounded-[16px] bg-[var(--color-bg)] px-4 py-3 text-[14px] font-medium text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px]"
                >
                  <LayoutGrid size={16} strokeWidth={2.1} />
                  <span>Товары</span>
                </Link>

                <Link
                  href={`${basePath}/admin/products/new`}
                  className="inline-flex w-full items-center gap-3 rounded-[16px] px-4 py-3 text-[14px] font-medium text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px] hover:bg-[var(--color-bg)]"
                >
                  <Plus size={16} strokeWidth={2.1} />
                  <span>Новый товар</span>
                </Link>
              </div>
            </div>
          </aside>

          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}

