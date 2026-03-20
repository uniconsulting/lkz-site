"use client";

import type { ReactNode } from "react";
import { Plus, Trash2 } from "lucide-react";

export function AdminRepeater({
  title,
  description,
  addLabel,
  children,
  onAdd,
}: {
  title: string;
  description?: string;
  addLabel: string;
  children: ReactNode;
  onAdd: () => void;
}) {
  return (
    <div className="rounded-[22px] bg-[var(--color-bg)] p-4 md:p-5">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="text-[15px] font-semibold text-[var(--color-text)]">
            {title}
          </div>

          {description ? (
            <div className="mt-1 max-w-[720px] text-[13px] leading-[1.5] text-[var(--color-text-muted)]">
              {description}
            </div>
          ) : null}
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[14px] bg-[var(--color-surface)] px-4 text-[13px] font-medium text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px]"
        >
          <Plus size={14} strokeWidth={2.2} />
          <span className="whitespace-nowrap">{addLabel}</span>
        </button>
      </div>

      <div className="space-y-3">{children}</div>
    </div>
  );
}

export function AdminRepeaterItem({
  children,
  onRemove,
}: {
  children: ReactNode;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-[18px] bg-[var(--color-surface)] p-4">
      <div className="mb-3 flex justify-end">
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex h-9 w-9 items-center justify-center rounded-[12px] text-[var(--color-text-muted)] transition duration-300 hover:bg-[var(--color-bg)] hover:text-[var(--color-text)]"
          aria-label="Удалить элемент"
        >
          <Trash2 size={15} strokeWidth={2.1} />
        </button>
      </div>

      {children}
    </div>
  );
}
