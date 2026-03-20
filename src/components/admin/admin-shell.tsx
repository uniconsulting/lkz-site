"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { LayoutGrid, Package } from "lucide-react";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="grid min-h-screen xl:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="border-b border-[rgba(127,127,127,0.12)] bg-[var(--color-surface)] xl:border-b-0 xl:border-r">
          <div className="p-5">
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-3 text-[16px] font-semibold tracking-[-0.03em]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[var(--color-bg)]">
                <Package size={18} strokeWidth={2.1} />
              </div>
              <span>Admin</span>
            </Link>

            <div className="mt-8 space-y-2">
              <Link
                href="/admin/products"
                className="inline-flex w-full items-center gap-3 rounded-[16px] bg-[var(--color-bg)] px-4 py-3 text-[14px] font-medium transition duration-300 hover:-translate-y-[1px]"
              >
                <LayoutGrid size={16} strokeWidth={2.1} />
                <span>Товары</span>
              </Link>
            </div>
          </div>
        </aside>

        <main className="min-w-0">
          <div className="mx-auto max-w-[1440px] p-4 md:p-6 xl:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
