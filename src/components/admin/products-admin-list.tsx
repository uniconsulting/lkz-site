"use client";

import { useMemo, useState } from "react";
import type { ProductItem } from "@/lib/content/products";
import { AdminDropdown } from "@/components/admin/admin-dropdown";
import { AdminSearchInput } from "@/components/admin/admin-search-input";
import { ProductsAdminTable } from "@/components/admin/products-admin-table";

type StatusFilter = "all" | "published" | "draft";

export function ProductsAdminList({
  products,
}: {
  products: ProductItem[];
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesStatus =
        status === "all"
          ? true
          : status === "published"
            ? product.admin.isPublished
            : !product.admin.isPublished;

      const haystack = [
        product.title,
        product.subtitle,
        product.slug,
        product.description,
        ...(product.admin.tags ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = normalizedSearch
        ? haystack.includes(normalizedSearch)
        : true;

      return matchesStatus && matchesSearch;
    });
  }, [products, search, status]);

  return (
    <div className="space-y-4">
      <div className="rounded-[28px] bg-[var(--color-surface)] p-4 md:p-5">
        <div className="grid gap-3 md:grid-cols-[minmax(0,0.92fr)_240px_180px]">
          <AdminSearchInput
            value={search}
            onChange={setSearch}
            placeholder="Поиск по названию, slug, описанию"
          />

          <AdminDropdown
            value={status}
            onChange={(value) => setStatus(value as StatusFilter)}
            options={[
              { value: "all", label: "Все статусы" },
              { value: "published", label: "Опубликованные" },
              { value: "draft", label: "Черновики" },
            ]}
          />

          <div className="flex h-12 items-center justify-center rounded-[16px] bg-[var(--color-bg)] px-4 text-[14px] font-medium text-[var(--color-text)]">
            найдено: {filteredProducts.length}
          </div>
        </div>
      </div>

      <ProductsAdminTable products={filteredProducts} />
    </div>
  );
}
