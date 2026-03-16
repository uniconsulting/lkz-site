"use client";

import Link from "next/link";
import {
  useMemo,
  useState,
  useEffect,
  useCallback,
  type MouseEvent,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { ArrowRight, PackageSearch, SlidersHorizontal, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import {
  getAllPackagings,
  getFilteredProducts,
  getProductCategoryById,
  getProductLineById,
} from "@/lib/content/products";
import {
  buildSearchParamsFromFilterState,
  hasActiveProductsFilters,
  parseFilterStateFromSearchParams,
  type ProductsSortValue,
} from "@/lib/products-filters";
import { ProductsFiltersPanel } from "@/components/catalog/products-filters-panel";
import { ProductsSortSelect } from "@/components/catalog/products-sort-select";
import { ProductsFiltersDrawer } from "@/components/catalog/products-filters-drawer";
import { cn } from "@/lib/utils/cn";

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

const gridVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.06,
      delayChildren: 0.03,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.992 },
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
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    y: 0,
    scale: 1,
  });

  const [glow, setGlow] = useState({
    x: 50,
    y: 50,
    opacity: 0,
  });

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    const rotateY = (px - 0.5) * 5;
    const rotateX = (0.5 - py) * 5;

    setTilt({
      rotateX,
      rotateY,
      y: -4,
      scale: 1.007,
    });

    setGlow({
      x: px * 100,
      y: py * 100,
      opacity: 1,
    });
  }

  function handleMouseLeave() {
    setTilt({
      rotateX: 0,
      rotateY: 0,
      y: 0,
      scale: 1,
    });

    setGlow({
      x: 50,
      y: 50,
      opacity: 0,
    });
  }

  return (
    <motion.div variants={cardVariants} className="h-full">
      <div
        className="h-full [perspective:1600px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          animate={tilt}
          transition={{
            type: "spring",
            stiffness: 170,
            damping: 20,
            mass: 0.95,
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="h-full"
        >
          <Link
            href={href}
            className={cn(
              "group block h-full rounded-[28px] bg-[var(--color-surface)] p-3 md:rounded-[32px]",
              "transform-gpu transition-[box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "hover:shadow-[0_18px_42px_rgba(43,47,51,0.10)]",
              "min-h-[430px]",
            )}
          >
            <div className="flex h-full flex-col">
              <div
                className="relative h-[348px] overflow-hidden rounded-[22px] bg-[var(--color-bg)] md:rounded-[24px]"
                style={{ transform: "translateZ(28px)" }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.0)_0%,rgba(255,255,255,0.05)_100%)]" />

                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  animate={{ opacity: glow.opacity }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    background: `radial-gradient(260px circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.22), transparent 62%)`,
                  }}
                />

                {image ? (
                  <img
                    src={image}
                    alt={title}
                    className="h-full w-full scale-[1.3] object-contain p-2 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.36]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-[var(--color-surface)] text-[var(--color-text-muted)]">
                      <PackageSearch size={30} strokeWidth={1.9} />
                    </div>
                  </div>
                )}

                {isArchived ? (
                  <div className="absolute left-3 top-3 inline-flex h-8 items-center rounded-[999px] bg-[var(--color-surface)] px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                    архив
                  </div>
                ) : null}
              </div>

              <div
                className="flex min-h-[48px] items-end justify-between gap-3 px-0 pb-0 pt-4"
                style={{ transform: "translateZ(22px)" }}
              >
                <div className="min-w-0 flex-1 px-2">
                  <div className="mb-[2px] text-[15px] leading-[1.02] tracking-[-0.02em] text-[var(--color-text-muted)] md:text-[13px] xl:text-[14px]">
                    {subtitle || lineTitle}
                  </div>

                  <div
                    className="truncate text-[16px] font-semibold leading-[0.96] tracking-[-0.04em] text-[var(--color-text)] md:text-[14px] xl:text-[15px]"
                    title={title}
                  >
                    {title}
                  </div>
                </div>

                <div className="shrink-0 pr-0">
                  <div className="flex h-10 w-[64px] items-center justify-center rounded-[24px] bg-[var(--color-bg)] text-[var(--color-accent-2)] transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[2px] group-hover:shadow-[0_8px_18px_rgba(43,47,51,0.06)] xl:h-10 xl:w-[72px]">
                    <ArrowRight size={20} strokeWidth={2.2} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ProductsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const parsedState = useMemo(
    () => parseFilterStateFromSearchParams(searchParams),
    [searchParams],
  );

  const [search, setSearch] = useState(parsedState.search);
  const [selectedCategories, setSelectedCategories] = useState(parsedState.categoryIds);
  const [selectedLines, setSelectedLines] = useState(parsedState.lineIds);
  const [selectedPackagings, setSelectedPackagings] = useState(parsedState.packagings);
  const [includeArchived, setIncludeArchived] = useState(parsedState.includeArchived);
  const [sort, setSort] = useState<ProductsSortValue>(parsedState.sort);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const allPackagings = useMemo(() => getAllPackagings(), []);

  useEffect(() => {
    setSearch(parsedState.search);
    setSelectedCategories(parsedState.categoryIds);
    setSelectedLines(parsedState.lineIds);
    setSelectedPackagings(parsedState.packagings);
    setIncludeArchived(parsedState.includeArchived);
    setSort(parsedState.sort);
  }, [parsedState]);

  const updateUrlState = useCallback(
    (nextState: {
      search: string;
      categoryIds: typeof selectedCategories;
      lineIds: typeof selectedLines;
      packagings: typeof selectedPackagings;
      includeArchived: boolean;
      sort: ProductsSortValue;
    }) => {
      const params = buildSearchParamsFromFilterState(nextState);
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router],
  );

  const filteredProducts = useMemo(
    () =>
      getFilteredProducts({
        categoryIds: selectedCategories,
        lineIds: selectedLines,
        packagings: selectedPackagings,
        includeArchived,
        search,
        sort,
      }),
    [selectedCategories, selectedLines, selectedPackagings, includeArchived, search, sort],
  );

  function toggleCategory(id: (typeof selectedCategories)[number]) {
    const next = selectedCategories.includes(id)
      ? selectedCategories.filter((item) => item !== id)
      : [...selectedCategories, id];

    setSelectedCategories(next);
    updateUrlState({
      search,
      categoryIds: next,
      lineIds: selectedLines,
      packagings: selectedPackagings,
      includeArchived,
      sort,
    });
  }

  function toggleLine(id: (typeof selectedLines)[number]) {
    const next = selectedLines.includes(id)
      ? selectedLines.filter((item) => item !== id)
      : [...selectedLines, id];

    setSelectedLines(next);
    updateUrlState({
      search,
      categoryIds: selectedCategories,
      lineIds: next,
      packagings: selectedPackagings,
      includeArchived,
      sort,
    });
  }

  function togglePackaging(value: string) {
    const next = selectedPackagings.includes(value)
      ? selectedPackagings.filter((item) => item !== value)
      : [...selectedPackagings, value];

    setSelectedPackagings(next);
    updateUrlState({
      search,
      categoryIds: selectedCategories,
      lineIds: selectedLines,
      packagings: next,
      includeArchived,
      sort,
    });
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    updateUrlState({
      search: value,
      categoryIds: selectedCategories,
      lineIds: selectedLines,
      packagings: selectedPackagings,
      includeArchived,
      sort,
    });
  }

  function handleSortChange(value: ProductsSortValue) {
    setSort(value);
    updateUrlState({
      search,
      categoryIds: selectedCategories,
      lineIds: selectedLines,
      packagings: selectedPackagings,
      includeArchived,
      sort: value,
    });
  }

  function handleToggleArchived() {
    const next = !includeArchived;
    setIncludeArchived(next);
    updateUrlState({
      search,
      categoryIds: selectedCategories,
      lineIds: selectedLines,
      packagings: selectedPackagings,
      includeArchived: next,
      sort,
    });
  }

  function resetFilters() {
    setSearch("");
    setSelectedCategories([]);
    setSelectedLines([]);
    setSelectedPackagings([]);
    setIncludeArchived(false);
    setSort("default");

    updateUrlState({
      search: "",
      categoryIds: [],
      lineIds: [],
      packagings: [],
      includeArchived: false,
      sort: "default",
    });
  }

  const hasActiveFilters = hasActiveProductsFilters({
    search,
    categoryIds: selectedCategories,
    lineIds: selectedLines,
    packagings: selectedPackagings,
    includeArchived,
    sort,
  });

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
              className="hidden xl:sticky xl:top-[112px] xl:block"
            >
              <ProductsFiltersPanel
                search={search}
                onSearchChange={handleSearchChange}
                selectedCategories={selectedCategories}
                onToggleCategory={toggleCategory}
                selectedLines={selectedLines}
                onToggleLine={toggleLine}
                selectedPackagings={selectedPackagings}
                onTogglePackaging={togglePackaging}
                allPackagings={allPackagings}
                includeArchived={includeArchived}
                onToggleArchived={handleToggleArchived}
                onReset={resetFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </motion.aside>

            <div className="space-y-4">
              <motion.div
                variants={sectionMotion}
                initial="hidden"
                animate="visible"
                className="rounded-[28px] bg-[var(--color-surface)] p-4 md:p-5"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
                        найдено позиций
                      </div>
                      <div className="mt-2 text-[26px] font-semibold tracking-[-0.04em] text-[var(--color-text)]">
                        {filteredProducts.length}
                      </div>
                    </div>

                    <div className="hidden md:block">
                      <ProductsSortSelect value={sort} onChange={handleSortChange} />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 md:hidden">
                    <button
                      type="button"
                      onClick={() => setIsMobileFiltersOpen(true)}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-[16px] bg-[var(--color-bg)] px-4 text-[14px] font-semibold text-[var(--color-text)]"
                    >
                      <SlidersHorizontal size={16} strokeWidth={2.2} />
                      <span>фильтры</span>
                    </button>

                    <ProductsSortSelect value={sort} onChange={handleSortChange} />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((id) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleCategory(id)}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-[16px] bg-[var(--color-bg)] px-4 text-[13px] font-medium text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px]"
                      >
                        <span>{getProductCategoryById(id)?.shortTitle ?? id}</span>
                        <X size={14} strokeWidth={2.2} />
                      </button>
                    ))}

                    {selectedLines.map((id) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleLine(id)}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-[16px] bg-[var(--color-bg)] px-4 text-[13px] font-medium text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px]"
                      >
                        <span>{getProductLineById(id)?.title ?? id}</span>
                        <X size={14} strokeWidth={2.2} />
                      </button>
                    ))}

                    {selectedPackagings.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => togglePackaging(item)}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-[16px] bg-[var(--color-bg)] px-4 text-[13px] font-medium text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px]"
                      >
                        <span>{item}</span>
                        <X size={14} strokeWidth={2.2} />
                      </button>
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
                  variants={gridVariants}
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

      <ProductsFiltersDrawer
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        resultCount={filteredProducts.length}
        search={search}
        onSearchChange={handleSearchChange}
        selectedCategories={selectedCategories}
        onToggleCategory={toggleCategory}
        selectedLines={selectedLines}
        onToggleLine={toggleLine}
        selectedPackagings={selectedPackagings}
        onTogglePackaging={togglePackaging}
        allPackagings={allPackagings}
        includeArchived={includeArchived}
        onToggleArchived={handleToggleArchived}
        onReset={resetFilters}
        hasActiveFilters={hasActiveFilters}
      />
    </div>
  );
}
