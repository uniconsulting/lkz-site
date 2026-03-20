"use client";

import Link from "next/link";
import type { ProductItem } from "@/lib/content/products";
import {
  getProductCategoryById,
  getProductLineById,
} from "@/lib/content/products";

const basePath = process.env.NODE_ENV === "production" ? "/lkz-site" : "";

export function ProductsAdminTable({
  products,
}: {
  products: ProductItem[];
}) {
  return (
    <div className="overflow-hidden rounded-[28px] bg-[var(--color-surface)]">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-[rgba(127,127,127,0.12)]">
              <th className="px-5 py-4 text-left text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                Товар
              </th>
              <th className="px-5 py-4 text-left text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                Линейка
              </th>
              <th className="px-5 py-4 text-left text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                Категория
              </th>
              <th className="px-5 py-4 text-left text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                Статус
              </th>
              <th className="px-5 py-4 text-left text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                Обновлён
              </th>
              <th className="px-5 py-4 text-right text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                Действия
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => {
              const line = getProductLineById(product.lineId);
              const category = getProductCategoryById(product.categoryId);

              return (
                <tr
                  key={product.id}
                  className="border-b border-[rgba(127,127,127,0.08)] last:border-b-0"
                >
                  <td className="px-5 py-4 align-top">
                    <div className="text-[15px] font-semibold text-[var(--color-text)]">
                      {product.title}
                    </div>
                    {product.subtitle ? (
                      <div className="mt-1 text-[13px] text-[var(--color-text-muted)]">
                        {product.subtitle}
                      </div>
                    ) : null}
                    <div className="mt-2 text-[12px] text-[var(--color-text-muted)]">
                      /{product.slug}
                    </div>
                  </td>

                  <td className="px-5 py-4 align-top text-[14px] text-[var(--color-text)]">
                    {line?.title ?? product.lineId}
                  </td>

                  <td className="px-5 py-4 align-top text-[14px] text-[var(--color-text)]">
                    {category?.title ?? product.categoryId}
                  </td>

                  <td className="px-5 py-4 align-top">
                    <span
                      className={
                        product.admin.isPublished
                          ? "inline-flex rounded-[999px] bg-[rgba(30,222,123,0.12)] px-3 py-1 text-[12px] font-semibold text-[var(--color-accent-1)]"
                          : "inline-flex rounded-[999px] bg-[rgba(127,127,127,0.12)] px-3 py-1 text-[12px] font-semibold text-[var(--color-text-muted)]"
                      }
                    >
                      {product.admin.isPublished ? "Опубликован" : "Черновик"}
                    </span>
                  </td>

                  <td className="px-5 py-4 align-top text-[14px] text-[var(--color-text)]">
                    {product.admin.updatedAt}
                  </td>

                  <td className="px-5 py-4 align-top text-right">
                    <Link
                      href={`${basePath}/admin/products/${product.id}`}
                      className="inline-flex h-10 items-center justify-center rounded-[14px] bg-[var(--color-bg)] px-4 text-[13px] font-medium text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px]"
                    >
                      редактировать
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
