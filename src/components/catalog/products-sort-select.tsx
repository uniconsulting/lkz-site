"use client";

import { ChevronDown } from "lucide-react";
import type { ProductsSortValue } from "@/lib/products-filters";

const SORT_OPTIONS: Array<{ value: ProductsSortValue; label: string }> = [
  { value: "default", label: "по умолчанию" },
  { value: "name-asc", label: "название А-Я" },
  { value: "name-desc", label: "название Я-А" },
  { value: "active-first", label: "сначала актуальные" },
  { value: "archived-first", label: "сначала архивные" },
];

export function ProductsSortSelect({
  value,
  onChange,
}: {
  value: ProductsSortValue;
  onChange: (value: ProductsSortValue) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as ProductsSortValue)}
        className="h-11 appearance-none rounded-[16px] border border-transparent bg-[var(--color-bg)] pl-4 pr-10 text-[14px] font-medium text-[var(--color-text)] outline-none transition duration-300 hover:-translate-y-[1px] focus:border-[var(--color-accent-1)]"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={16}
        strokeWidth={2.2}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
      />
    </div>
  );
}
