"use client";

import { Search, X } from "lucide-react";

export function AdminSearchInput({
  value,
  onChange,
  placeholder = "Поиск",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <Search
        size={16}
        strokeWidth={2.2}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
      />

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-[16px] bg-[var(--color-bg)] pl-11 pr-11 text-[14px] text-[var(--color-text)] outline-none transition duration-300 placeholder:text-[var(--color-text-muted)]"
      />

      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-[10px] text-[var(--color-text-muted)] transition duration-300 hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"
          aria-label="Очистить поиск"
        >
          <X size={14} strokeWidth={2.2} />
        </button>
      ) : null}
    </div>
  );
}

