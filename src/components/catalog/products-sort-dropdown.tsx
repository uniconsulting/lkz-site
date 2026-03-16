"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { ProductsSortValue } from "@/lib/products-filters";

const SORT_OPTIONS: Array<{ value: ProductsSortValue; label: string }> = [
  { value: "default", label: "по умолчанию" },
  { value: "name-asc", label: "название А-Я" },
  { value: "name-desc", label: "название Я-А" },
];

export function ProductsSortDropdown({
  value,
  onChange,
}: {
  value: ProductsSortValue;
  onChange: (value: ProductsSortValue) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleOutside(event: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    window.addEventListener("mousedown", handleOutside);
    return () => window.removeEventListener("mousedown", handleOutside);
  }, []);

  const activeOption =
    SORT_OPTIONS.find((option) => option.value === value) ?? SORT_OPTIONS[0];

  return (
    <div ref={rootRef} className="relative min-w-[220px]">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex h-11 w-full items-center justify-between rounded-[16px] bg-[var(--color-bg)] px-4 text-left text-[14px] font-medium text-[var(--color-text)] transition duration-300",
          "hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(43,47,51,0.05)]",
          isOpen ? "shadow-[0_0_0_1px_var(--color-accent-1)]" : "",
        )}
      >
        <span>{activeOption.label}</span>

        <ChevronDown
          size={16}
          strokeWidth={2.2}
          className={cn(
            "text-[var(--color-text-muted)] transition duration-300",
            isOpen ? "rotate-180" : "",
          )}
        />
      </button>

      <div
        className={cn(
          "absolute right-0 top-[calc(100%+8px)] z-30 w-full overflow-hidden rounded-[20px] bg-[var(--color-bg)] shadow-[0_18px_42px_rgba(43,47,51,0.12)] transition duration-200",
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        )}
      >
        <div className="p-2">
          {SORT_OPTIONS.map((option) => {
            const isActive = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-[14px] px-4 py-3 text-left text-[14px] transition duration-200",
                  isActive
                    ? "bg-[var(--color-accent-1)]/[0.10] text-[var(--color-text)]"
                    : "text-[var(--color-text)] hover:bg-[var(--color-surface)]",
                )}
              >
                <span>{option.label}</span>

                <span
                  className={cn(
                    "transition duration-200",
                    isActive
                      ? "text-[var(--color-accent-1)]"
                      : "text-transparent",
                  )}
                >
                  <Check size={15} strokeWidth={2.4} />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
