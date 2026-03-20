"use client";

import { cn } from "@/lib/utils/cn";

export function AdminSwitch({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 rounded-[18px] bg-[var(--color-bg)] p-4 text-left transition duration-300 hover:-translate-y-[1px]"
    >
      <div>
        <div className="text-[14px] font-medium text-[var(--color-text)]">
          {label}
        </div>
        {description ? (
          <div className="mt-1 text-[13px] leading-[1.45] text-[var(--color-text-muted)]">
            {description}
          </div>
        ) : null}
      </div>

      <span
        className={cn(
          "relative inline-flex h-7 w-12 shrink-0 rounded-full transition duration-300",
          checked ? "bg-[var(--color-accent-1)]" : "bg-[rgba(127,127,127,0.24)]",
        )}
      >
        <span
          className={cn(
            "absolute top-1 h-5 w-5 rounded-full bg-white transition duration-300",
            checked ? "left-6" : "left-1",
          )}
        />
      </span>
    </button>
  );
}
