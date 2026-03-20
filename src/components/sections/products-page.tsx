"use client";

import Link from "next/link";
import {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
  useId,
  type MouseEvent,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  PackageSearch,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import {
  getAllMaterialTypes,
  getAllPackagings,
  getAllWorkTypes,
  getFilteredProducts,
  getProductCategoryById,
  getProductLineById,
  getProductPreviewImage,
  productCategories,
  productLines,
  type ProductCategoryId,
  type ProductLineId,
} from "@/lib/content/products";
import {
  buildSearchParamsFromFilterState,
  hasActiveProductsFilters,
  parseFilterStateFromSearchParams,
} from "@/lib/products-filters";
import { cn } from "@/lib/utils/cn";

const basePath = process.env.NODE_ENV === "production" ? "/lkz-site" : "";

const catalogHeroBannerLight = `${basePath}/images/sections/products/hero/catalog-hero-banner-light.webp`;
const catalogHeroBannerDark = `${basePath}/images/sections/products/hero/catalog-hero-banner-dark.webp`;

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
    "выберите линейку, формат работ и материал обработки,",
    "чтобы быстро найти нужную позицию",
  ],
};

type CatalogQueryPreset = {
  id: string;
  label: string;
  filters: {
    categoryIds?: ProductCategoryId[];
    lineIds?: ProductLineId[];
    workTypes?: string[];
    materialTypes?: string[];
    packagings?: string[];
    applicationAreas?: string[];
  };
};

const catalogQueryPresets: CatalogQueryPreset[] = [
  {
    id: "facade-paint-14kg",
    label: "фасадная краска для наружных работ 14 кг",
    filters: {
      categoryIds: ["paints"],
      lineIds: ["emalyer"],
      workTypes: ["наружные работы"],
      materialTypes: ["фасады", "минеральные поверхности"],
      packagings: ["14 кг"],
    },
  },
  {
    id: "walls-white",
    label: "краска для стен и потолков белая",
    filters: {
      categoryIds: ["paints"],
      lineIds: ["emalyer"],
      workTypes: ["внутренние работы"],
      materialTypes: ["стены", "потолки"],
    },
  },
  {
    id: "radiator-enamel",
    label: "эмаль для радиаторов белоснежная",
    filters: {
      categoryIds: ["enamels"],
      lineIds: ["emalyer"],
      materialTypes: ["металл", "радиаторы"],
    },
  },
  {
    id: "osb-2in1",
    label: "краска-грунт 2 в 1 по osb для наружных работ",
    filters: {
      categoryIds: ["special-paints"],
      lineIds: ["emalyer"],
      workTypes: ["наружные работы"],
      materialTypes: ["osb"],
    },
  },
  {
    id: "sauna-varnish",
    label: "матовый лак для бань и саун",
    filters: {
      categoryIds: ["varnishes"],
      lineIds: ["emalyer"],
      materialTypes: ["дерево"],
    },
  },
  {
    id: "wood-antiseptic",
    label: "универсальный антисептик для древесины",
    filters: {
      categoryIds: ["protective"],
      lineIds: ["emalyer"],
      materialTypes: ["дерево"],
    },
  },
];

function PresetQueryButton({
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
        "inline-flex h-11 shrink-0 items-center justify-center rounded-[16px] px-4 text-[14px] font-medium transition duration-300",
        active
          ? "bg-[var(--color-accent-1)] text-[var(--color-accent-1-foreground)]"
          : "bg-[var(--color-bg)] text-[var(--color-text)] hover:-translate-y-[1px] hover:bg-[var(--color-surface)]",
      )}
    >
      {label}
    </button>
  );
}

function ProductMarketplaceCard({
  href,
  title,
  subtitle,
  lineTitle,
  image,
}: {
  href: string;
  title: string;
  subtitle?: string;
  lineTitle: string;
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

    setTilt({
      rotateX: (0.5 - py) * 5,
      rotateY: (px - 0.5) * 5,
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
              "group block h-full rounded-[28px] bg-[var(--color-surface)] p-3 md:rounded-[30px]",
              "transform-gpu transition-[box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "hover:shadow-[0_18px_42px_rgba(43,47,51,0.10)]",
              "min-h-[405px]",
            )}
          >
            <div className="flex h-full flex-col">
              <div
                className="relative h-[308px] overflow-hidden rounded-[22px] bg-[var(--color-bg)] md:rounded-[24px]"
                style={{ transform: "translateZ(28px)" }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.05)_100%)]" />

                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  animate={{ opacity: glow.opacity }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    background: `radial-gradient(240px circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.22), transparent 62%)`,
                  }}
                />

                {image ? (
                  <img
                    src={image}
                    alt={title}
                    className="h-full w-full scale-[1.24] object-contain p-2 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.3]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-[var(--color-surface)] text-[var(--color-text-muted)]">
                      <PackageSearch size={30} strokeWidth={1.9} />
                    </div>
                  </div>
                )}
              </div>

              <div
                className="flex min-h-[48px] items-end justify-between gap-3 px-0 pb-0 pt-4"
                style={{ transform: "translateZ(22px)" }}
              >
                <div className="min-w-0 flex-1 px-2">
                  <div className="mb-[2px] text-[14px] leading-[1.02] tracking-[-0.02em] text-[var(--color-text-muted)]">
                    {subtitle || lineTitle}
                  </div>

                  <div
                    className="truncate text-[15px] font-semibold leading-[0.96] tracking-[-0.04em] text-[var(--color-text)]"
                    title={title}
                  >
                    {title}
                  </div>
                </div>

                <div className="shrink-0 pr-0">
                  <div className="flex h-10 w-[64px] items-center justify-center rounded-[24px] bg-[var(--color-bg)] text-[var(--color-accent-2)] transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[2px] group-hover:shadow-[0_8px_18px_rgba(43,47,51,0.06)]">
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

function FilterPill({
  label,
  active,
  count,
  onClick,
}: {
  label: string;
  active?: boolean;
  count?: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "catalog-control-pill inline-flex h-11 items-center gap-2 rounded-[16px] px-4 text-[14px] font-medium transition duration-300",
        active ? "catalog-control-pill-active" : "",
      )}
    >
      <span>{label}</span>
      {typeof count === "number" && count > 0 ? (
        <span
          className={cn(
            "inline-flex min-w-[20px] items-center justify-center rounded-full px-1.5 text-[11px] font-semibold",
            active
              ? "bg-[var(--color-accent-1-foreground)]/18 text-[var(--color-accent-1-foreground)]"
              : "bg-white/10 text-white/82",
          )}
        >
          {count}
        </span>
      ) : null}
      <ChevronDown size={15} strokeWidth={2.2} />
    </button>
  );
}

function FilterDropdown({
  title,
  items,
  selectedValues,
  onToggle,
  onClose,
  widthClassName = "w-[280px]",
}: {
  title: string;
  items: Array<{ value: string; label: string }>;
  selectedValues: string[];
  onToggle: (value: string) => void;
  onClose: () => void;
  widthClassName?: string;
}) {
  return (
    <div
      className={cn(
        "absolute left-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-[20px] catalog-control-shell shadow-[0_18px_42px_rgba(17,20,23,0.18)]",
        widthClassName,
      )}
    >
      <div className="catalog-control-divider flex items-center justify-between border-b px-4 py-4">
        <div className="text-[14px] font-semibold text-white">{title}</div>

        <button
          type="button"
          onClick={onClose}
          className="catalog-filter-sheet-close inline-flex h-8 w-8 items-center justify-center rounded-[10px]"
        >
          <X size={14} strokeWidth={2.2} />
        </button>
      </div>

      <div className="max-h-[320px] overflow-y-auto p-2">
        {items.map((item) => {
          const isActive = selectedValues.includes(item.value);

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => onToggle(item.value)}
              className={cn(
                "flex w-full items-center justify-between rounded-[14px] px-4 py-3 text-left text-[14px] transition duration-200",
                isActive
                  ? "bg-[var(--color-accent-1)]/[0.12] text-white"
                  : "text-white hover:bg-white/8",
              )}
            >
              <span>{item.label}</span>

              <span
                className={cn(
                  "transition duration-200",
                  isActive ? "text-[var(--color-accent-1)]" : "text-transparent",
                )}
              >
                <Check size={15} strokeWidth={2.4} />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

type OpenFilterKey = null | "line" | "work" | "material" | "category";

export function ProductsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const presetsRef = useRef<HTMLDivElement | null>(null);
  const filtersRootId = useId();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const parsedState = useMemo(
    () => parseFilterStateFromSearchParams(searchParams),
    [searchParams],
  );

  const [search, setSearch] = useState(parsedState.search);
  const [selectedCategories, setSelectedCategories] = useState(
    parsedState.categoryIds,
  );
  const [selectedLines, setSelectedLines] = useState(parsedState.lineIds);
  const [selectedWorkTypes, setSelectedWorkTypes] = useState(
    parsedState.workTypes,
  );
  const [selectedMaterialTypes, setSelectedMaterialTypes] = useState(
    parsedState.materialTypes,
  );
  const [selectedPackagings, setSelectedPackagings] = useState(
    parsedState.packagings,
  );
  const [selectedApplicationAreas, setSelectedApplicationAreas] = useState(
    parsedState.applicationAreas,
  );
  const [isAllFiltersOpen, setIsAllFiltersOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState<OpenFilterKey>(null);

  const allPackagings = useMemo(() => getAllPackagings(), []);
  const allWorkTypes = useMemo(() => getAllWorkTypes(), []);
  const allMaterialTypes = useMemo(() => getAllMaterialTypes(), []);

  useEffect(() => {
    setSearch(parsedState.search);
    setSelectedCategories(parsedState.categoryIds);
    setSelectedLines(parsedState.lineIds);
    setSelectedWorkTypes(parsedState.workTypes);
    setSelectedMaterialTypes(parsedState.materialTypes);
    setSelectedPackagings(parsedState.packagings);
    setSelectedApplicationAreas(parsedState.applicationAreas);
  }, [parsedState]);

  useEffect(() => {
    function readTheme() {
      const root = document.documentElement;

      const isDarkByClass = root.classList.contains("dark");
      const isDarkByDataTheme =
        root.getAttribute("data-theme") === "dark" ||
        root.getAttribute("data-color-mode") === "dark";

      setIsDarkTheme(isDarkByClass || isDarkByDataTheme);
    }

    readTheme();

    const observer = new MutationObserver(() => {
      readTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "data-color-mode"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function handleOutside(event: MouseEvent | globalThis.MouseEvent) {
      if (isAllFiltersOpen) return;

      const target = event.target as HTMLElement | null;
      if (!target) return;

      const root = document.getElementById(filtersRootId);
      if (!root) return;

      if (!root.contains(target)) {
        setOpenFilter(null);
      }
    }

    window.addEventListener("mousedown", handleOutside);
    return () => window.removeEventListener("mousedown", handleOutside);
  }, [filtersRootId, isAllFiltersOpen]);

  useEffect(() => {
    if (!isAllFiltersOpen) {
      document.body.style.removeProperty("overflow");
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isAllFiltersOpen]);

  const updateUrlState = useCallback(
    (nextState: {
      search: string;
      categoryIds: typeof selectedCategories;
      lineIds: typeof selectedLines;
      workTypes: typeof selectedWorkTypes;
      materialTypes: typeof selectedMaterialTypes;
      packagings: typeof selectedPackagings;
      applicationAreas: typeof selectedApplicationAreas;
      sort: "default";
    }) => {
      const params = buildSearchParamsFromFilterState(nextState);
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router],
  );

  const filteredProducts = useMemo(
    () =>
      getFilteredProducts({
        categoryIds: selectedCategories,
        lineIds: selectedLines,
        workTypes: selectedWorkTypes,
        materialTypes: selectedMaterialTypes,
        packagings: selectedPackagings,
        applicationAreas: selectedApplicationAreas,
        search,
        sort: "default",
      }),
    [
      selectedCategories,
      selectedLines,
      selectedWorkTypes,
      selectedMaterialTypes,
      selectedPackagings,
      selectedApplicationAreas,
      search,
    ],
  );

  function scrollPresets(direction: "left" | "right") {
    if (!presetsRef.current) return;

    presetsRef.current.scrollBy({
      left: direction === "left" ? -260 : 260,
      behavior: "smooth",
    });
  }

  function toggleCategory(id: ProductCategoryId) {
    const next = selectedCategories.includes(id)
      ? selectedCategories.filter((item) => item !== id)
      : [...selectedCategories, id];

    setSelectedCategories(next);
    updateUrlState({
      search,
      categoryIds: next,
      lineIds: selectedLines,
      workTypes: selectedWorkTypes,
      materialTypes: selectedMaterialTypes,
      packagings: selectedPackagings,
      applicationAreas: selectedApplicationAreas,
      sort: "default",
    });
  }

  function toggleLine(id: ProductLineId) {
    const next = selectedLines.includes(id)
      ? selectedLines.filter((item) => item !== id)
      : [...selectedLines, id];

    setSelectedLines(next);
    updateUrlState({
      search,
      categoryIds: selectedCategories,
      lineIds: next,
      workTypes: selectedWorkTypes,
      materialTypes: selectedMaterialTypes,
      packagings: selectedPackagings,
      applicationAreas: selectedApplicationAreas,
      sort: "default",
    });
  }

  function toggleWorkType(value: string) {
    const next = selectedWorkTypes.includes(value)
      ? selectedWorkTypes.filter((item) => item !== value)
      : [...selectedWorkTypes, value];

    setSelectedWorkTypes(next);
    updateUrlState({
      search,
      categoryIds: selectedCategories,
      lineIds: selectedLines,
      workTypes: next,
      materialTypes: selectedMaterialTypes,
      packagings: selectedPackagings,
      applicationAreas: selectedApplicationAreas,
      sort: "default",
    });
  }

  function toggleMaterialType(value: string) {
    const next = selectedMaterialTypes.includes(value)
      ? selectedMaterialTypes.filter((item) => item !== value)
      : [...selectedMaterialTypes, value];

    setSelectedMaterialTypes(next);
    updateUrlState({
      search,
      categoryIds: selectedCategories,
      lineIds: selectedLines,
      workTypes: selectedWorkTypes,
      materialTypes: next,
      packagings: selectedPackagings,
      applicationAreas: selectedApplicationAreas,
      sort: "default",
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
      workTypes: selectedWorkTypes,
      materialTypes: selectedMaterialTypes,
      packagings: next,
      applicationAreas: selectedApplicationAreas,
      sort: "default",
    });
  }

  function toggleApplicationArea(value: string) {
    const next = selectedApplicationAreas.includes(value)
      ? selectedApplicationAreas.filter((item) => item !== value)
      : [...selectedApplicationAreas, value];

    setSelectedApplicationAreas(next);
    updateUrlState({
      search,
      categoryIds: selectedCategories,
      lineIds: selectedLines,
      workTypes: selectedWorkTypes,
      materialTypes: selectedMaterialTypes,
      packagings: selectedPackagings,
      applicationAreas: next,
      sort: "default",
    });
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    updateUrlState({
      search: value,
      categoryIds: selectedCategories,
      lineIds: selectedLines,
      workTypes: selectedWorkTypes,
      materialTypes: selectedMaterialTypes,
      packagings: selectedPackagings,
      applicationAreas: selectedApplicationAreas,
      sort: "default",
    });
  }

  function resetFilters() {
    setSearch("");
    setSelectedCategories([]);
    setSelectedLines([]);
    setSelectedWorkTypes([]);
    setSelectedMaterialTypes([]);
    setSelectedPackagings([]);
    setSelectedApplicationAreas([]);

    updateUrlState({
      search: "",
      categoryIds: [],
      lineIds: [],
      workTypes: [],
      materialTypes: [],
      packagings: [],
      applicationAreas: [],
      sort: "default",
    });
  }

  function applyPreset(preset: CatalogQueryPreset) {
    const nextSearch = preset.label;

    setSearch(nextSearch);
    setSelectedCategories([...(preset.filters.categoryIds ?? [])]);
    setSelectedLines([...(preset.filters.lineIds ?? [])]);
    setSelectedWorkTypes([...(preset.filters.workTypes ?? [])]);
    setSelectedMaterialTypes([...(preset.filters.materialTypes ?? [])]);
    setSelectedPackagings([...(preset.filters.packagings ?? [])]);
    setSelectedApplicationAreas([]);

    updateUrlState({
      search: nextSearch,
      categoryIds: [...(preset.filters.categoryIds ?? [])],
      lineIds: [...(preset.filters.lineIds ?? [])],
      workTypes: [...(preset.filters.workTypes ?? [])],
      materialTypes: [...(preset.filters.materialTypes ?? [])],
      packagings: [...(preset.filters.packagings ?? [])],
      applicationAreas: [],
      sort: "default",
    });
  }

  const hasActiveFilters = hasActiveProductsFilters({
    search,
    categoryIds: selectedCategories,
    lineIds: selectedLines,
    workTypes: selectedWorkTypes,
    materialTypes: selectedMaterialTypes,
    packagings: selectedPackagings,
    applicationAreas: selectedApplicationAreas,
    sort: "default",
  });

  const activePresetLabel = useMemo(() => {
    return catalogQueryPresets.find((preset) => preset.label === search)?.label;
  }, [search]);

  return (
    <div className="relative pb-6 md:pb-8 xl:pb-10">
      <div className="absolute inset-x-0 top-0 z-0 aspect-[4/1] min-h-[320px] overflow-hidden md:min-h-[340px] xl:min-h-0">
        <img
          src={isDarkTheme ? catalogHeroBannerDark : catalogHeroBannerLight}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative z-[1] pt-[112px] md:pt-[126px] xl:pt-[138px]">
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

              <h1 className="relative -left-[3px] font-heading text-[34px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[48px] xl:text-[58px]">
                {productsPageContent.title}
              </h1>

              <p className="mt-5 max-w-[980px] text-[16px] leading-[1.46] text-[var(--color-text-muted)] md:text-[18px]">
                <span className="block">{productsPageContent.description[0]}</span>
                <span className="block">{productsPageContent.description[1]}</span>
              </p>
            </motion.div>
          </Container>
        </Section>

        <Section className="pt-6 md:pt-8 xl:pt-8">
          <Container>
            <motion.div variants={sectionMotion} initial="hidden" animate="visible">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles
                  size={16}
                  strokeWidth={2.2}
                  className="text-[var(--color-accent-1)]"
                />
                <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
                  быстрый подбор по задаче
                </span>
              </div>

              <div className="grid grid-cols-[28px_minmax(0,1fr)_28px] items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollPresets("left")}
                  className="inline-flex h-9 w-7 items-center justify-center rounded-[12px] bg-[var(--color-surface)] text-[var(--color-text-muted)] transition duration-300 hover:text-[var(--color-text)]"
                  aria-label="Прокрутить влево"
                >
                  <ArrowLeft size={14} strokeWidth={2.4} />
                </button>

                <div className="py-2 -my-2">
                  <div
                    ref={presetsRef}
                    className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  >
                    <div className="flex w-max gap-2">
                      {catalogQueryPresets.map((preset) => (
                        <PresetQueryButton
                          key={preset.id}
                          label={preset.label}
                          active={activePresetLabel === preset.label}
                          onClick={() => applyPreset(preset)}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => scrollPresets("right")}
                  className="inline-flex h-9 w-7 items-center justify-center rounded-[12px] bg-[var(--color-surface)] text-[var(--color-text-muted)] transition duration-300 hover:text-[var(--color-text)]"
                  aria-label="Прокрутить вправо"
                >
                  <ArrowRight size={14} strokeWidth={2.4} />
                </button>
              </div>
            </motion.div>
          </Container>
        </Section>

        <Section className="pt-5 md:pt-6 xl:pt-6">
          <Container>
            <div className="space-y-4" id={filtersRootId}>
              <motion.div
                variants={sectionMotion}
                initial="hidden"
                animate="visible"
                className="catalog-control-shell rounded-[28px] p-4 md:p-5"
              >
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <div className="flex flex-wrap gap-4">
                    <FilterPill
                      label="все фильтры"
                      active={isAllFiltersOpen}
                      count={
                        selectedLines.length +
                        selectedWorkTypes.length +
                        selectedMaterialTypes.length +
                        selectedCategories.length +
                        selectedPackagings.length
                      }
                      onClick={() => {
                        setOpenFilter(null);
                        setIsAllFiltersOpen(true);
                      }}
                    />

                    <div className="relative">
                      <FilterPill
                        label="линейка"
                        active={openFilter === "line" || selectedLines.length > 0}
                        count={selectedLines.length}
                        onClick={() =>
                          setOpenFilter((prev) => (prev === "line" ? null : "line"))
                        }
                      />
                      {openFilter === "line" ? (
                        <FilterDropdown
                          title="линейка"
                          items={productLines.map((item) => ({
                            value: item.id,
                            label: item.shortTitle,
                          }))}
                          selectedValues={selectedLines}
                          onToggle={(value) => toggleLine(value as ProductLineId)}
                          onClose={() => setOpenFilter(null)}
                        />
                      ) : null}
                    </div>

                    <div className="relative">
                      <FilterPill
                        label="вид работ"
                        active={openFilter === "work" || selectedWorkTypes.length > 0}
                        count={selectedWorkTypes.length}
                        onClick={() =>
                          setOpenFilter((prev) => (prev === "work" ? null : "work"))
                        }
                      />
                      {openFilter === "work" ? (
                        <FilterDropdown
                          title="вид работ"
                          items={allWorkTypes.map((item) => ({
                            value: item,
                            label: item,
                          }))}
                          selectedValues={selectedWorkTypes}
                          onToggle={toggleWorkType}
                          onClose={() => setOpenFilter(null)}
                        />
                      ) : null}
                    </div>

                    <div className="relative">
                      <FilterPill
                        label="материал обработки"
                        active={
                          openFilter === "material" ||
                          selectedMaterialTypes.length > 0
                        }
                        count={selectedMaterialTypes.length}
                        onClick={() =>
                          setOpenFilter((prev) =>
                            prev === "material" ? null : "material",
                          )
                        }
                      />
                      {openFilter === "material" ? (
                        <FilterDropdown
                          title="материал обработки"
                          widthClassName="w-[320px]"
                          items={allMaterialTypes.map((item) => ({
                            value: item,
                            label: item,
                          }))}
                          selectedValues={selectedMaterialTypes}
                          onToggle={toggleMaterialType}
                          onClose={() => setOpenFilter(null)}
                        />
                      ) : null}
                    </div>

                    <div className="relative">
                      <FilterPill
                        label="категория"
                        active={
                          openFilter === "category" ||
                          selectedCategories.length > 0
                        }
                        count={selectedCategories.length}
                        onClick={() =>
                          setOpenFilter((prev) =>
                            prev === "category" ? null : "category",
                          )
                        }
                      />
                      {openFilter === "category" ? (
                        <FilterDropdown
                          title="категория"
                          items={productCategories.map((item) => ({
                            value: item.id,
                            label: item.title,
                          }))}
                          selectedValues={selectedCategories}
                          onToggle={(value) =>
                            toggleCategory(value as ProductCategoryId)
                          }
                          onClose={() => setOpenFilter(null)}
                        />
                      ) : null}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-[14px] font-medium text-white">
                      найдено товаров
                    </div>

                    <div className="inline-flex h-11 min-w-[52px] items-center justify-center rounded-[16px] bg-[#ffffff] px-4 text-[14px] font-semibold text-[#32373b]">
                      {filteredProducts.length}
                    </div>
                  </div>
                </div>

                {(hasActiveFilters || search.trim().length > 0) && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedLines.map((id) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleLine(id)}
                        className="catalog-control-chip inline-flex h-10 items-center justify-center gap-2 rounded-[16px] px-4 text-[13px] font-medium transition duration-300"
                      >
                        <span>{getProductLineById(id)?.shortTitle ?? id}</span>
                        <X size={14} strokeWidth={2.2} />
                      </button>
                    ))}

                    {selectedWorkTypes.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleWorkType(item)}
                        className="catalog-control-chip inline-flex h-10 items-center justify-center gap-2 rounded-[16px] px-4 text-[13px] font-medium transition duration-300"
                      >
                        <span>{item}</span>
                        <X size={14} strokeWidth={2.2} />
                      </button>
                    ))}

                    {selectedMaterialTypes.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleMaterialType(item)}
                        className="catalog-control-chip inline-flex h-10 items-center justify-center gap-2 rounded-[16px] px-4 text-[13px] font-medium transition duration-300"
                      >
                        <span>{item}</span>
                        <X size={14} strokeWidth={2.2} />
                      </button>
                    ))}

                    {selectedCategories.map((id) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleCategory(id)}
                        className="catalog-control-chip inline-flex h-10 items-center justify-center gap-2 rounded-[16px] px-4 text-[13px] font-medium transition duration-300"
                      >
                        <span>{getProductCategoryById(id)?.shortTitle ?? id}</span>
                        <X size={14} strokeWidth={2.2} />
                      </button>
                    ))}

                    {selectedPackagings.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => togglePackaging(item)}
                        className="catalog-control-chip inline-flex h-10 items-center justify-center gap-2 rounded-[16px] px-4 text-[13px] font-medium transition duration-300"
                      >
                        <span>{item}</span>
                        <X size={14} strokeWidth={2.2} />
                      </button>
                    ))}

                    {selectedApplicationAreas.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleApplicationArea(item)}
                        className="catalog-control-chip inline-flex h-10 items-center justify-center gap-2 rounded-[16px] px-4 text-[13px] font-medium transition duration-300"
                      >
                        <span>{item}</span>
                        <X size={14} strokeWidth={2.2} />
                      </button>
                    ))}

                    {search.trim().length > 0 && (
                      <button
                        type="button"
                        onClick={() => handleSearchChange("")}
                        className="catalog-control-chip inline-flex h-10 items-center justify-center gap-2 rounded-[16px] px-4 text-[13px] font-medium transition duration-300"
                      >
                        <span>{search}</span>
                        <X size={14} strokeWidth={2.2} />
                      </button>
                    )}
                  </div>
                )}
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
                      Попробуйте изменить параметры подбора
                    </h2>
                    <p className="mt-4 text-[15px] leading-[1.46] text-[var(--color-text-muted)]">
                      Снимите часть фильтров или выберите другой пресет-запрос.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={resetFilters}
                        className="inline-flex h-12 items-center justify-center rounded-[18px] bg-[var(--color-bg)] px-6 text-[15px] font-semibold text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px]"
                      >
                        сбросить фильтры
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  variants={gridVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
                >
                  {filteredProducts.map((product) => (
                    <ProductMarketplaceCard
                      key={product.id}
                      href={`/products/${product.slug}`}
                      title={product.title}
                      subtitle={product.subtitle}
                      lineTitle={getProductLineById(product.lineId)?.shortTitle ?? ""}
                      image={getProductPreviewImage(product)}
                    />
                  ))}
                </motion.div>
              )}
            </div>
          </Container>
        </Section>
      </div>

      <AnimatePresence>
        {isAllFiltersOpen ? (
          <>
            <motion.div
              className="catalog-filter-sheet-overlay fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24 }}
              onClick={() => setIsAllFiltersOpen(false)}
            />

            <motion.aside
              className="catalog-filter-sheet fixed inset-y-0 right-0 z-50 flex w-full max-w-[420px] flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="catalog-control-divider flex items-center justify-between border-b px-5 py-5">
                <div>
                  <div className="text-[15px] font-semibold text-white">
                    все фильтры
                  </div>
                  <div className="catalog-control-muted mt-1 text-[13px]">
                    настройте параметры подбора
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAllFiltersOpen(false)}
                  className="catalog-filter-sheet-close inline-flex h-10 w-10 items-center justify-center rounded-[14px]"
                >
                  <X size={16} strokeWidth={2.2} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-5">
                <div className="space-y-6">
                  <div>
                    <div className="catalog-filter-sheet-label mb-2 text-[12px] font-semibold uppercase tracking-[0.08em]">
                      поиск
                    </div>
                    <div className="relative">
                      <Search
                        size={16}
                        strokeWidth={2.1}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/58"
                      />
                      <input
                        value={search}
                        onChange={(event) => handleSearchChange(event.target.value)}
                        type="text"
                        placeholder="поиск по каталогу"
                        className="catalog-filter-sheet-input h-11 w-full rounded-[16px] pl-11 pr-4 text-[14px] outline-none transition duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="catalog-filter-sheet-label mb-2 text-[12px] font-semibold uppercase tracking-[0.08em]">
                      линейка
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {productLines.map((line) => (
                        <button
                          key={line.id}
                          type="button"
                          onClick={() => toggleLine(line.id)}
                          className={cn(
                            "inline-flex h-10 items-center rounded-[14px] px-4 text-[13px] font-medium transition duration-300",
                            selectedLines.includes(line.id)
                              ? "bg-[var(--color-accent-1)] text-[var(--color-accent-1-foreground)]"
                              : "catalog-filter-sheet-soft",
                          )}
                        >
                          {line.shortTitle}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="catalog-filter-sheet-label mb-2 text-[12px] font-semibold uppercase tracking-[0.08em]">
                      вид работ
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {allWorkTypes.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleWorkType(item)}
                          className={cn(
                            "inline-flex h-10 items-center rounded-[14px] px-4 text-[13px] font-medium transition duration-300",
                            selectedWorkTypes.includes(item)
                              ? "bg-[var(--color-accent-1)] text-[var(--color-accent-1-foreground)]"
                              : "catalog-filter-sheet-soft",
                          )}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="catalog-filter-sheet-label mb-2 text-[12px] font-semibold uppercase tracking-[0.08em]">
                      материал обработки
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {allMaterialTypes.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleMaterialType(item)}
                          className={cn(
                            "inline-flex h-10 items-center rounded-[14px] px-4 text-[13px] font-medium transition duration-300",
                            selectedMaterialTypes.includes(item)
                              ? "bg-[var(--color-accent-1)] text-[var(--color-accent-1-foreground)]"
                              : "catalog-filter-sheet-soft",
                          )}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="catalog-filter-sheet-label mb-2 text-[12px] font-semibold uppercase tracking-[0.08em]">
                      категория
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {productCategories.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleCategory(item.id)}
                          className={cn(
                            "inline-flex h-10 items-center rounded-[14px] px-4 text-[13px] font-medium transition duration-300",
                            selectedCategories.includes(item.id)
                              ? "bg-[var(--color-accent-1)] text-[var(--color-accent-1-foreground)]"
                              : "catalog-filter-sheet-soft",
                          )}
                        >
                          {item.shortTitle}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="catalog-filter-sheet-label mb-2 text-[12px] font-semibold uppercase tracking-[0.08em]">
                      фасовка
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {allPackagings.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => togglePackaging(item)}
                          className={cn(
                            "inline-flex h-10 items-center rounded-[14px] px-4 text-[13px] font-medium transition duration-300",
                            selectedPackagings.includes(item)
                              ? "bg-[var(--color-accent-1)] text-[var(--color-accent-1-foreground)]"
                              : "catalog-filter-sheet-soft",
                          )}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="catalog-control-divider border-t px-5 py-4">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="catalog-filter-sheet-soft inline-flex h-11 items-center justify-center rounded-[16px] px-4 text-[14px] font-semibold transition duration-300"
                  >
                    сбросить
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsAllFiltersOpen(false)}
                    className="inline-flex h-11 items-center justify-center rounded-[16px] bg-[var(--color-accent-1)] px-4 text-[14px] font-semibold text-[var(--color-accent-1-foreground)] transition duration-300"
                  >
                    показать
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
