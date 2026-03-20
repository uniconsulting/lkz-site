"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type AdminDropdownOption = {
  value: string;
  label: string;
};

export function AdminDropdown({
  value,
  options,
  onChange,
  placeholder = "Выберите значение",
  className,
}: {
  value: string;
  options: AdminDropdownOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const rootId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);

  const selectedOption =
    options.find((option) => option.value === value) ?? null;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const root = rootRef.current ?? document.getElementById(rootId);
      if (!root) return;

      if (!root.contains(target)) {
        setIsOpen(false);
      }
    }

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [rootId]);

  return (
    <div
      id={rootId}
      ref={rootRef}
      className={cn("relative", className)}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-12 w-full items-center justify-between rounded-[16px] bg-[var(--color-bg)] px-4 text-left text-[14px] text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px]"
      >
        <span className={selectedOption ? "" : "text-[var(--color-text-muted)]"}>
          {selectedOption?.label ?? placeholder}
        </span>

        <ChevronDown
          size={16}
          strokeWidth={2.2}
          className={cn(
            "transition duration-300",
            isOpen ? "rotate-180" : "",
          )}
        />
      </button>

      {isOpen ? (
        <div className="absolute left-0 top-[calc(100%+8px)] z-30 w-full overflow-hidden rounded-[20px] bg-[var(--color-surface)] shadow-[0_18px_42px_rgba(43,47,51,0.10)]">
          <div className="max-h-[280px] overflow-y-auto p-2">
            {options.map((option) => {
              const isSelected = option.value === value;

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
                    isSelected
                      ? "bg-[var(--color-bg)] text-[var(--color-text)]"
                      : "text-[var(--color-text)] hover:bg-[var(--color-bg)]",
                  )}
                >
                  <span>{option.label}</span>

                  <span
                    className={cn(
                      "transition duration-200",
                      isSelected
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
      ) : null}
    </div>
  );
}

