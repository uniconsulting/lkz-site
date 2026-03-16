"use client";

import { Check, Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import {
  productCategories,
  productLines,
  type ProductCategoryId,
  type ProductLineId,
} from "@/lib/content/products";

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-[16px] px-4 text-[13px] font-medium transition duration-300",
        active
          ? "bg-[var(--color-accent-1)] text-[var(--color-accent-1-foreground)]"
          : "catalog-filter-panel-soft catalog-filter-panel-text",
      )}
    >
      {label}
    </button>
  );
}

function CheckboxRow({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="catalog-filter-panel-soft flex w-full items-center justify-between gap-3 rounded-[16px] px-4 py-3 text-left transition duration-300"
    >
      <span className="catalog-filter-panel-text text-[14px] leading-[1.3]">
        {label}
      </span>

      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border transition duration-300",
          checked
            ? "border-[var(--color-accent-1)] bg-[var(--color-accent-1)] text-[var(--color-accent-1-foreground)]"
            : "border-white/18 bg-transparent text-transparent dark:border-[var(--color-border)]",
        )}
      >
        <Check size={12} strokeWidth={2.6} />
      </span>
    </button>
  );
}

export function ProductsFiltersPanel({
  search,
  onSearchChange,
  selectedCategories,
  onToggleCategory,
  selectedLines,
  onToggleLine,
  selectedPackagings,
  onTogglePackaging,
  allPackagings,
  hasActiveFilters,
  onReset,
  embedded = false,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategories: ProductCategoryId[];
  onToggleCategory: (value: ProductCategoryId) => void;
  selectedLines: ProductLineId[];
  onToggleLine: (value: ProductLineId) => void;
  selectedPackagings: string[];
  onTogglePackaging: (value: string) => void;
  allPackagings: string[];
  hasActiveFilters: boolean;
  onReset: () => void;
  embedded?: boolean;
}) {
  const content = (
    <>
      {!embedded ? (
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-4 dark:border-[var(--color-border)] md:px-5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal
              size={18}
              strokeWidth={2.1}
              className="text-[var(--color-accent-1)]"
            />
            <span className="catalog-filter-panel-text text-[14px] font-semibold">
              фильтры
            </span>
          </div>

          {hasActiveFilters ? (
            <button
              type="button"
              onClick={onReset}
              className="catalog-filter-panel-reset inline-flex h-9 items-center justify-center gap-1 rounded-[14px] px-3 text-[12px] font-medium transition duration-300"
            >
              <X size={14} strokeWidth={2.1} />
              <span>сбросить</span>
            </button>
          ) : null}
        </div>
      ) : null}

      <div
        className={cn(
          embedded
            ? "space-y-5"
            : "catalog-filter-scroll max-h-[calc(100svh-188px)] overflow-y-auto px-4 py-4 md:px-5",
        )}
      >
        <div className="relative">
          <Search
            size={16}
            strokeWidth={2.1}
            className="catalog-filter-panel-icon pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
          />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            type="text"
            placeholder="поиск по каталогу"
            className="catalog-filter-panel-search h-11 w-full rounded-[16px] border border-transparent pl-11 pr-4 text-[14px] outline-none transition duration-300 focus:border-[var(--color-accent-1)]"
          />
        </div>

        <div className="space-y-5 pt-3">
          <div>
            <div className="catalog-filter-panel-muted mb-3 text-[12px] font-semibold uppercase tracking-[0.08em]">
              категории
            </div>
            <div className="space-y-2">
              {productCategories.map((category) => (
                <CheckboxRow
                  key={category.id}
                  label={category.title}
                  checked={selectedCategories.includes(category.id)}
                  onToggle={() => onToggleCategory(category.id)}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="catalog-filter-panel-muted mb-3 text-[12px] font-semibold uppercase tracking-[0.08em]">
              линейка
            </div>
            <div className="space-y-2">
              {productLines.map((line) => (
                <CheckboxRow
                  key={line.id}
                  label={line.title}
                  checked={selectedLines.includes(line.id)}
                  onToggle={() => onToggleLine(line.id)}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="catalog-filter-panel-muted mb-3 text-[12px] font-semibold uppercase tracking-[0.08em]">
              фасовка
            </div>
            <div className="flex flex-wrap gap-2">
              {allPackagings.map((item) => (
                <FilterChip
                  key={item}
                  label={item}
                  active={selectedPackagings.includes(item)}
                  onClick={() => onTogglePackaging(item)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if (embedded) {
    return <div className="space-y-5">{content}</div>;
  }

  return <div className="catalog-filter-panel rounded-[28px]">{content}</div>;
}
