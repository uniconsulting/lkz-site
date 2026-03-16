"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Check,
  PackageSearch,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils/cn";
import {
  getAllPackagings,
  getFilteredProducts,
  getProductCategoryById,
  getProductLineById,
  productCategories,
  productLines,
  type ProductCategoryId,
  type ProductLineId,
} from "@/lib/content/products";

const sectionMotion = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const cardMotion = {
  hidden: { opacity: 0, y: 16, scale: 0.994 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const productsPageContent = {
  eyebrow: "продукция",
  title: "Каталог продукции",
  description: [
    "выберите категорию, фасовку и другие параметры,",
    "чтобы быстро найти нужную позицию",
  ],
  cta: "запросить КП",
};

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
          : "bg-[var(--color-bg)] text-[var(--color-text)] hover:-translate-y-[1px] hover:shadow-[0_6px_16px_rgba(43,47,51,0.05)]",
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
      className="flex w-full items-center justify-between gap-3 rounded-[16px] bg-[var(--color-bg)] px-4 py-3 text-left transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_6px_16px_rgba(43,47,51,0.05)]"
    >
      <span className="text-[14px] leading-[1.3] text-[var(--color-text)]">
        {label}
      </span>

      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border transition duration-300",
          checked
            ? "border-[var(--color-accent-1)] bg-[var(--color-accent-1)] text-[var(--color-accent-1-foreground)]"
            : "border-[var(--color-border)] bg-transparent text-transparent",
        )}
      >
        <Check size={12} strokeWidth={2.6} />
      </span>
    </button>
  );
}

function ProductMarketplaceCard({
  href,
  title,
  subtitle,
  lineTitle,
  isArchived,
  image,
}: {
  href: string;
  title: string;
  subtitle?: string;
  lineTitle: string;
  isArchived?: boolean;
  image?: string;
}) {
  return (
    <motion.div variants={cardMotion} className="h-full">
      <Link
        href={href}
        className="group block h-full rounded-[28px] bg-[var(--color-surface)] p-3 transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_18px_42px_rgba(43,47,51,0.10)]"
      >
        <div className="flex h-full flex-col">
          <div className="relative h-[344px] overflow-hidden rounded-[22px] bg-[var(--color-bg)] md:rounded-[24px]">
            {image ? (
              <img
                src={image}
                alt={title}
                className="h-full w-full scale-[1.16] object-contain p-3 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.21]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-[var(--color-surface)] text-[var(--color-text-muted)]">
                  <PackageSearch size={30} strokeWidth={1.9} />
                </div>
              </div>
            )}
          </div>

          <div className="flex min-h-[78px] items-end justify-between gap-4 px-2 pt-4">
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span className="text-[15px] leading-[1.1] tracking-[-0.02em] text-[var(--color-text-muted)]">
                  {subtitle || lineTitle}
                </span>

                {isArchived ? (
                  <span className="inline-flex items-center rounded-[999px] bg-[var(--color-bg)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                    архив
                  </span>
                ) : null}
              </div>

              <div
                className="truncate text-[22px] font-semibold leading-[0.98] tracking-[-0.04em] text-[var(--color-text)]"
                title={title}
              >
                {title}
              </div>
            </div>

            <div className="shrink-0 rounded-[18px] bg-[var(--color-bg)] p-2">
              <div className="flex h-10 w-[74px] items-center justify-center rounded-[14px] bg-[var(--color-surface)] text-[var(--color-accent-1)] transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[2px]">
                <ArrowRight size={22} strokeWidth={2.2} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProductsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<ProductCategoryId[]>([]);
  const [selectedLines, setSelectedLines] = useState<ProductLineId[]>([]);
  const [selectedPackagings, setSelectedPackagings] = useState<string[]>([]);
  const [includeArchived, setIncludeArchived] = useState(false);

  const allPackagings = useMemo(() => getAllPackagings(), []);

  const filteredProducts = useMemo(
    () =>
      getFilteredProducts({
        categoryIds: selectedCategories,
        lineIds: selectedLines,
        packagings: selectedPackagings,
        includeArchived,
        search,
      }),
    [selectedCategories, selectedLines, selectedPackagings, includeArchived, search],
  );

  function toggleCategory(id: ProductCategoryId) {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }

  function toggleLine(id: ProductLineId) {
    setSelectedLines((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }

  function togglePackaging(value: string) {
    setSelectedPackagings((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  }

  function resetFilters() {
    setSearch("");
    setSelectedCategories([]);
    setSelectedLines([]);
    setSelectedPackagings([]);
    setIncludeArchived(false);
  }

  const hasActiveFilters =
    search.trim().length > 0 ||
    selectedCategories.length > 0 ||
    selectedLines.length > 0 ||
    selectedPackagings.length > 0 ||
    includeArchived;

  return (
    <div className="pt-[92px] pb-6 md:pt-[104px] md:pb-8 xl:pb-10">
      <Section className="pt-8 md:pt-10 xl:pt-12">
        <Container>
          <motion.div
            variants={sectionMotion}
            initial="hidden"
            animate="visible"
            className="max-w-[1180px]"
          >
            <div className="mb-5 text-[15px] tracking-[-0.02em] text-[var(--color-text-muted)]">
              главная / {productsPageContent.eyebrow}
            </div>

            <h1 className="font-heading text-[34px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[48px] xl:text-[58px]">
              {productsPageContent.title}
            </h1>

            <p className="mt-5 max-w-[980px] text-[16px] leading-[1.46] text-[var(--color-text-muted)] md:text-[18px]">
              <span className="block">{productsPageContent.description[0]}</span>
              <span className="block">{productsPageContent.description[1]}</span>
            </p>

            <div className="mt-7">
              <Link
                href="/contacts"
                className="inline-flex h-12 items-center justify-center rounded-[18px] bg-[var(--color-accent-1)] px-6 text-[15px] font-semibold text-[var(--color-accent-1-foreground)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(30,222,123,0.22)]"
              >
                {productsPageContent.cta}
              </Link>
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section className="pt-8 md:pt-10 xl:pt-12">
        <Container>
          <div className="grid gap-4 xl:grid-cols-[320px_minmax(0,1fr)] xl:items-start">
            <motion.aside
              variants={sectionMotion}
              initial="hidden"
              animate="visible"
              className="rounded-[28px] bg-[var(--color-surface)] p-4 md:p-5 xl:sticky xl:top-[112px]"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal
                    size={18}
                    strokeWidth={2.1}
                    className="text-[var(--color-accent-1)]"
                  />
                  <span className="text-[14px] font-semibold text-[var(--color-text)]">
                    фильтры
                  </span>
                </div>

                {hasActiveFilters ? (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="inline-flex h-9 items-center justify-center gap-1 rounded-[14px] bg-[var(--color-bg)] px-3 text-[12px] font-medium text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px]"
                  >
                    <X size={14} strokeWidth={2.1} />
                    <span>сбросить</span>
                  </button>
                ) : null}
              </div>

              <div className="relative">
                <Search
                  size={16}
                  strokeWidth={2.1}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  type="text"
                  placeholder="поиск по каталогу"
                  className="h-11 w-full rounded-[16px] border border-transparent bg-[var(--color-bg)] pl-11 pr-4 text-[14px] text-[var(--color-text)] outline-none transition duration-300 placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent-1)]"
                />
              </div>

              <div className="mt-5 space-y-5">
                <div>
                  <div className="mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                    категории
                  </div>
                  <div className="space-y-2">
                    {productCategories.map((category) => (
                      <CheckboxRow
                        key={category.id}
                        label={category.title}
                        checked={selectedCategories.includes(category.id)}
                        onToggle={() => toggleCategory(category.id)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                    линейка
                  </div>
                  <div className="space-y-2">
                    {productLines.map((line) => (
                      <CheckboxRow
                        key={line.id}
                        label={line.title}
                        checked={selectedLines.includes(line.id)}
                        onToggle={() => toggleLine(line.id)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                    фасовка
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {allPackagings.map((item) => (
                      <FilterChip
                        key={item}
                        label={item}
                        active={selectedPackagings.includes(item)}
                        onClick={() => togglePackaging(item)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                    статус
                  </div>
                  <CheckboxRow
                    label="показывать архивные позиции"
                    checked={includeArchived}
                    onToggle={() => setIncludeArchived((prev) => !prev)}
                  />
                </div>
              </div>
            </motion.aside>

            <div className="space-y-4">
              <motion.div
                variants={sectionMotion}
                initial="hidden"
                animate="visible"
                className="rounded-[28px] bg-[var(--color-surface)] p-4 md:p-5"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
                      найдено позиций
                    </div>
                    <div className="mt-2 text-[26px] font-semibold tracking-[-0.04em] text-[var(--color-text)]">
                      {filteredProducts.length}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((id) => (
                      <FilterChip
                        key={id}
                        label={getProductCategoryById(id)?.shortTitle ?? id}
                        active
                        onClick={() => toggleCategory(id)}
                      />
                    ))}

                    {selectedLines.map((id) => (
                      <FilterChip
                        key={id}
                        label={getProductLineById(id)?.title ?? id}
                        active
                        onClick={() => toggleLine(id)}
                      />
                    ))}

                    {selectedPackagings.map((item) => (
                      <FilterChip
                        key={item}
                        label={item}
                        active
                        onClick={() => togglePackaging(item)}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {filteredProducts.length === 0 ? (
                <motion.div
                  variants={sectionMotion}
                  initial="hidden"
                  animate="visible"
                  className="rounded-[28px] bg-[var(--color-surface)] p-6 md:p-8"
                >
                  <div className="max-w-[720px]">
                    <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
                      ничего не найдено
                    </div>
                    <h2 className="mt-4 font-heading text-[28px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[36px]">
                      Попробуйте изменить параметры фильтрации
                    </h2>
                    <p className="mt-4 text-[15px] leading-[1.46] text-[var(--color-text-muted)]">
                      Снимите часть фильтров или отправьте запрос, если нужен подбор продукции под конкретную задачу.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={resetFilters}
                        className="inline-flex h-12 items-center justify-center rounded-[18px] bg-[var(--color-bg)] px-6 text-[15px] font-semibold text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px]"
                      >
                        сбросить фильтры
                      </button>
                      <Link
                        href="/contacts"
                        className="inline-flex h-12 items-center justify-center rounded-[18px] bg-[var(--color-accent-1)] px-6 text-[15px] font-semibold text-[var(--color-accent-1-foreground)] transition duration-300 hover:-translate-y-[1px]"
                      >
                        запросить КП
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  variants={sectionMotion}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
                >
                  {filteredProducts.map((product) => (
                    <ProductMarketplaceCard
                      key={product.id}
                      href={`/products/${product.slug}`}
                      title={product.title}
                      subtitle={product.subtitle}
                      lineTitle={getProductLineById(product.lineId)?.title ?? ""}
                      isArchived={product.isArchived}
                      image={product.image}
                    />
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
