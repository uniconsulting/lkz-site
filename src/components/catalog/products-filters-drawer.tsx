"use client";

import { AnimatePresence, motion } from "motion/react";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductsFiltersPanel } from "@/components/catalog/products-filters-panel";
import type { ProductCategoryId, ProductLineId } from "@/lib/content/products";

type ProductsFiltersDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  resultCount: number;
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategories: ProductCategoryId[];
  onToggleCategory: (value: ProductCategoryId) => void;
  selectedLines: ProductLineId[];
  onToggleLine: (value: ProductLineId) => void;
  selectedPackagings: string[];
  onTogglePackaging: (value: string) => void;
  allPackagings: string[];
  selectedApplicationAreas: string[];
  onToggleApplicationArea: (value: string) => void;
  includeArchived: boolean;
  onToggleArchived: () => void;
  onReset: () => void;
  hasActiveFilters: boolean;
};

export function ProductsFiltersDrawer({
  isOpen,
  onClose,
  resultCount,
  search,
  onSearchChange,
  selectedCategories,
  onToggleCategory,
  selectedLines,
  onToggleLine,
  selectedPackagings,
  onTogglePackaging,
  allPackagings,
  selectedApplicationAreas,
  onToggleApplicationArea,
  includeArchived,
  onToggleArchived,
  onReset,
  hasActiveFilters,
}: ProductsFiltersDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-[rgba(20,24,28,0.42)] backdrop-blur-[3px] xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-x-0 bottom-0 z-50 max-h-[88svh] rounded-t-[28px] bg-[var(--color-surface)] xl:hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              duration: 0.34,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal
                  size={18}
                  strokeWidth={2.1}
                  className="text-[var(--color-accent-1)]"
                />
                <span className="text-[15px] font-semibold text-[var(--color-text)]">
                  фильтры
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-[14px] bg-[var(--color-bg)] text-[var(--color-text)]"
              >
                <X size={18} strokeWidth={2.2} />
              </button>
            </div>

            <div className="max-h-[calc(88svh-84px-84px)] overflow-y-auto p-4">
              <ProductsFiltersPanel
                search={search}
                onSearchChange={onSearchChange}
                selectedCategories={selectedCategories}
                onToggleCategory={onToggleCategory}
                selectedLines={selectedLines}
                onToggleLine={onToggleLine}
                selectedPackagings={selectedPackagings}
                onTogglePackaging={onTogglePackaging}
                allPackagings={allPackagings}
                selectedApplicationAreas={selectedApplicationAreas}
                onToggleApplicationArea={onToggleApplicationArea}
                includeArchived={includeArchived}
                onToggleArchived={onToggleArchived}
                onReset={onReset}
                hasActiveFilters={hasActiveFilters}
                embedded
              />
            </div>

            <div className="grid grid-cols-[1fr_1.2fr] gap-3 border-t border-[var(--color-border)] p-4">
              <button
                type="button"
                onClick={onReset}
                className="inline-flex h-12 items-center justify-center rounded-[18px] bg-[var(--color-bg)] px-4 text-[14px] font-semibold text-[var(--color-text)]"
              >
                сбросить
              </button>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-12 items-center justify-center rounded-[18px] bg-[var(--color-accent-1)] px-4 text-[14px] font-semibold text-[var(--color-accent-1-foreground)]"
              >
                показать {resultCount}
              </button>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
