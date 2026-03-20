"use client";

import { useMemo, useState } from "react";
import type { ProductCategory, ProductLine } from "@/lib/content/products";

export function ProductForm({
  mode,
  categories,
  lines,
}: {
  mode: "create" | "edit";
  categories: ProductCategory[];
  lines: ProductLine[];
}) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? "");
  const [lineId, setLineId] = useState(lines[0]?.id ?? "");
  const [description, setDescription] = useState("");
  const [sortOrder, setSortOrder] = useState("100");
  const [isPublished, setIsPublished] = useState(true);

  const isValid = useMemo(() => {
    return Boolean(
      title.trim() &&
        slug.trim() &&
        categoryId.trim() &&
        lineId.trim() &&
        description.trim(),
    );
  }, [title, slug, categoryId, lineId, description]);

  return (
    <form className="space-y-5">
      <div className="rounded-[28px] bg-[var(--color-surface)] p-5 md:p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <div className="mb-2 text-[13px] font-medium text-[var(--color-text-muted)]">
              Название
            </div>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="h-12 w-full rounded-[16px] bg-[var(--color-bg)] px-4 text-[14px] text-[var(--color-text)] outline-none"
              placeholder="Например: Краска фасадная"
            />
          </label>

          <label className="block">
            <div className="mb-2 text-[13px] font-medium text-[var(--color-text-muted)]">
              Подзаголовок
            </div>
            <input
              value={subtitle}
              onChange={(event) => setSubtitle(event.target.value)}
              className="h-12 w-full rounded-[16px] bg-[var(--color-bg)] px-4 text-[14px] text-[var(--color-text)] outline-none"
              placeholder="Например: акриловая"
            />
          </label>

          <label className="block">
            <div className="mb-2 text-[13px] font-medium text-[var(--color-text-muted)]">
              Slug
            </div>
            <input
              value={slug}
              onChange={(event) => setSlug(event.target.value)}
              className="h-12 w-full rounded-[16px] bg-[var(--color-bg)] px-4 text-[14px] text-[var(--color-text)] outline-none"
              placeholder="facade-paint-white"
            />
          </label>

          <label className="block">
            <div className="mb-2 text-[13px] font-medium text-[var(--color-text-muted)]">
              Порядок сортировки
            </div>
            <input
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              className="h-12 w-full rounded-[16px] bg-[var(--color-bg)] px-4 text-[14px] text-[var(--color-text)] outline-none"
              placeholder="100"
            />
          </label>

          <label className="block">
            <div className="mb-2 text-[13px] font-medium text-[var(--color-text-muted)]">
              Категория
            </div>
            <select
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value as typeof categoryId)}
              className="h-12 w-full rounded-[16px] bg-[var(--color-bg)] px-4 text-[14px] text-[var(--color-text)] outline-none"
            >
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <div className="mb-2 text-[13px] font-medium text-[var(--color-text-muted)]">
              Линейка
            </div>
            <select
              value={lineId}
              onChange={(event) => setLineId(event.target.value as typeof lineId)}
              className="h-12 w-full rounded-[16px] bg-[var(--color-bg)] px-4 text-[14px] text-[var(--color-text)] outline-none"
            >
              {lines.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="mt-4 block">
          <div className="mb-2 text-[13px] font-medium text-[var(--color-text-muted)]">
            Описание
          </div>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="min-h-[140px] w-full rounded-[16px] bg-[var(--color-bg)] px-4 py-3 text-[14px] text-[var(--color-text)] outline-none"
            placeholder="Краткое описание товара"
          />
        </label>

        <label className="mt-5 inline-flex items-center gap-3">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(event) => setIsPublished(event.target.checked)}
            className="h-4 w-4"
          />
          <span className="text-[14px] text-[var(--color-text)]">
            Опубликовать товар
          </span>
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={!isValid}
          className="inline-flex h-12 items-center justify-center rounded-[18px] bg-[var(--color-accent-1)] px-6 text-[14px] font-semibold text-[var(--color-accent-1-foreground)] transition duration-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {mode === "create" ? "создать товар" : "сохранить изменения"}
        </button>

        <button
          type="button"
          className="inline-flex h-12 items-center justify-center rounded-[18px] bg-[var(--color-surface)] px-6 text-[14px] font-semibold text-[var(--color-text)] transition duration-300"
        >
          отмена
        </button>
      </div>
    </form>
  );
}
