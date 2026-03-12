"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils/cn";

const basePath = process.env.NODE_ENV === "production" ? "/lkz-site" : "";

type CatalogPreviewItem = {
  id: string;
  label: string;
  title: string;
  description?: string;
  image: string;
  href: string;
  size: "large" | "wide" | "small";
};

const catalogPreviewItems: CatalogPreviewItem[] = [
  {
    id: "vd-paint",
    label: "Категория",
    title: "ВД краска",
    description:
      "Интерьерные и фасадные решения для ровного, стойкого покрытия",
    image: "/images/sections/catalog/preview/catalog-preview-vd-paint.webp",
    href: "#catalog-grid",
    size: "large",
  },
  {
    id: "enamels",
    label: "Защитные покрытия",
    title: "Эмали",
    description: "Для металла, фасадов и износостойких поверхностей",
    image: "/images/sections/catalog/preview/catalog-preview-enamels.webp",
    href: "#catalog-grid",
    size: "wide",
  },
  {
    id: "varnishes",
    label: "Финишные покрытия",
    title: "Лаки",
    image: "/images/sections/catalog/preview/catalog-preview-varnishes.webp",
    href: "#catalog-grid",
    size: "small",
  },
  {
    id: "primer",
    label: "Подготовка основания",
    title: "Грунт укрывной",
    image: "/images/sections/catalog/preview/catalog-preview-primer.webp",
    href: "#catalog-grid",
    size: "small",
  },
  {
    id: "liquid-glass",
    label: "Минеральная защита",
    title: "Жидкое стекло",
    image: "/images/sections/catalog/preview/catalog-preview-liquid-glass.webp",
    href: "#catalog-grid",
    size: "small",
  },
  {
    id: "antiseptics",
    label: "Защита древесины",
    title: "Антисептики",
    image: "/images/sections/catalog/preview/catalog-preview-antiseptics.webp",
    href: "#catalog-grid",
    size: "small",
  },
];

const sizeClassMap: Record<CatalogPreviewItem["size"], string> = {
  large: "min-h-[520px] md:min-h-[560px] xl:min-h-[620px]",
  wide: "min-h-[240px] md:min-h-[260px] xl:min-h-[302px]",
  small: "min-h-[220px] md:min-h-[240px] xl:min-h-[302px]",
};

function CatalogPreviewCard({ item }: { item: CatalogPreviewItem }) {
  const isLarge = item.size === "large";
  const isWide = item.size === "wide";
  const isSmall = item.size === "small";

  return (
    <Link
      href={item.href}
      className={cn(
        "group relative isolate block overflow-hidden rounded-[32px] bg-[var(--color-surface)] md:rounded-[36px]",
        "transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-[2px] hover:shadow-[0_14px_34px_rgba(43,47,51,0.08)]",
        sizeClassMap[item.size],
      )}
    >
      <div className="absolute inset-0">
        <img
          src={`${basePath}${item.image}`}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,12,16,0.06)_0%,rgba(9,12,16,0.08)_30%,rgba(9,12,16,0.62)_100%)] transition duration-300 group-hover:bg-[linear-gradient(180deg,rgba(9,12,16,0.08)_0%,rgba(9,12,16,0.10)_28%,rgba(9,12,16,0.72)_100%)]" />

      <div className="absolute right-4 top-4 z-[2] md:right-5 md:top-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-white/15 text-white backdrop-blur-md transition duration-300 group-hover:bg-white/20 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]">
          <ArrowUpRight size={20} strokeWidth={2.1} />
        </div>
      </div>

      <div
        className={cn(
          "relative z-[2] flex h-full flex-col justify-end text-white",
          isLarge
            ? "p-5 md:p-7 xl:p-9"
            : isWide
              ? "p-5 md:p-6 xl:p-7"
              : "p-5 md:p-6",
        )}
      >
        <div
          className={cn(
            "mb-3 inline-flex w-fit items-center rounded-[999px] bg-[var(--color-accent-1)]/18 px-3 py-1.5 backdrop-blur-sm",
            isLarge ? "mb-4" : "mb-3",
          )}
        >
          <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
            {item.label}
          </span>
        </div>

        <h3
          className={cn(
            "font-heading tracking-[-0.05em] text-white",
            isLarge
              ? "max-w-[420px] text-[32px] leading-[0.98] md:text-[40px] xl:text-[52px]"
              : isWide
                ? "max-w-[520px] text-[28px] leading-[0.98] md:text-[34px] xl:text-[42px]"
                : "max-w-[240px] text-[26px] leading-[0.98] md:text-[30px] xl:text-[34px]",
          )}
        >
          {item.title}
        </h3>

        {item.description ? (
          <p
            className={cn(
              "mt-3 max-w-[540px] text-white/88",
              isLarge
                ? "text-[15px] leading-[1.35] md:text-[17px] xl:text-[18px]"
                : "text-[14px] leading-[1.35] md:text-[15px] xl:text-[16px]",
            )}
          >
            {item.description}
          </p>
        ) : null}

        {isLarge ? (
          <div className="mt-5 md:mt-6">
            <span
              className={cn(
                "inline-flex h-[52px] items-center justify-center gap-3 rounded-[18px] bg-[var(--color-accent-1)] px-6 text-[16px] font-semibold transition duration-300 group-hover:gap-4",
                "text-[var(--color-accent-1-foreground)]",
              )}
            >
              Открыть каталог
              <ArrowRight size={18} strokeWidth={2.2} />
            </span>
          </div>
        ) : null}
      </div>
    </Link>
  );
}

export function CatalogPreview() {
  const largeCard = catalogPreviewItems.find((item) => item.size === "large");
  const wideCard = catalogPreviewItems.find((item) => item.size === "wide");
  const smallCards = catalogPreviewItems.filter((item) => item.size === "small");

  if (!largeCard || !wideCard) return null;

  return (
    <Section id="catalog-preview" className="pt-10 md:pt-12 xl:pt-14">
      <Container>
        <div className="mb-6 flex flex-col gap-4 md:mb-7 md:flex-row md:items-end md:justify-between xl:mb-8">
          <div className="max-w-[720px]">
            <span className="mb-3 inline-flex w-fit rounded-[999px] bg-[var(--color-surface)] px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
              Каталог
            </span>

            <h2 className="font-heading text-[34px] leading-[0.98] tracking-[-0.05em] text-[var(--color-text)] md:text-[40px] xl:text-[52px]">
              Каталог продукции
            </h2>

            <p className="mt-3 max-w-[640px] text-[15px] leading-[1.45] text-[var(--color-text-muted)] md:text-[16px] xl:text-[17px]">
              6 категорий лакокрасочных и защитных материалов для интерьерных,
              фасадных и технических задач.
            </p>
          </div>

          <Link
            href="#catalog-grid"
            className="inline-flex h-[52px] items-center justify-center rounded-[18px] bg-[var(--color-surface)] px-6 text-[15px] font-semibold text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px] hover:bg-[var(--color-surface-strong)]"
          >
            Смотреть весь каталог
          </Link>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.02fr_1fr]">
          <CatalogPreviewCard item={largeCard} />

          <div className="grid gap-4">
            <CatalogPreviewCard item={wideCard} />

            <div className="grid gap-4 sm:grid-cols-2">
              {smallCards.map((item) => (
                <CatalogPreviewCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
