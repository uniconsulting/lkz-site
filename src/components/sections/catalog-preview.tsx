"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Droplets,
  Layers,
  Leaf,
  Palette,
  Shield,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils/cn";

type PreviewCardSize = "large" | "wide" | "small";

type PreviewItem = {
  id: string;
  label: string;
  title: string;
  description?: string;
  image: string;
  href: string;
  size: PreviewCardSize;
  cta?: string;
  icon: LucideIcon;
};

const basePath = process.env.NODE_ENV === "production" ? "/lkz-site" : "";

const catalogPreviewItems: PreviewItem[] = [
  {
    id: "vd-paint",
    label: "категория",
    title: "ВД краска",
    description:
      "Интерьерные и фасадные решения для ровного, стойкого покрытия",
    image: `${basePath}/images/sections/catalog/preview/catalog-preview-vd-paint.webp`,
    href: "#products",
    size: "large",
    cta: "Открыть каталог",
    icon: Palette,
  },
  {
    id: "enamels",
    label: "защитные покрытия",
    title: "Эмали",
    description: "Для металла, фасадов и износостойких поверхностей",
    image: `${basePath}/images/sections/catalog/preview/catalog-preview-enamels.webp`,
    href: "#products",
    size: "wide",
    icon: Shield,
  },
  {
    id: "varnishes",
    label: "финишные покрытия",
    title: "Лаки",
    image: `${basePath}/images/sections/catalog/preview/catalog-preview-varnishes.webp`,
    href: "#products",
    size: "small",
    icon: Sparkles,
  },
  {
    id: "primer",
    label: "подготовка основания",
    title: "Грунт укрывной",
    image: `${basePath}/images/sections/catalog/preview/catalog-preview-primer.webp`,
    href: "#products",
    size: "small",
    icon: Layers,
  },
  {
    id: "liquid-glass",
    label: "минеральная защита",
    title: "Жидкое стекло",
    image: `${basePath}/images/sections/catalog/preview/catalog-preview-liquid-glass.webp`,
    href: "#products",
    size: "small",
    icon: Droplets,
  },
  {
    id: "antiseptics",
    label: "защита древесины",
    title: "Антисептики",
    image: `${basePath}/images/sections/catalog/preview/catalog-preview-antiseptics.webp`,
    href: "#products",
    size: "small",
    icon: Leaf,
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const cardsParentVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function CatalogPreviewButton() {
  return (
    <Link
      href="#products"
      className="group relative hidden overflow-hidden rounded-[18px] p-px md:inline-flex"
    >
      <span
        className="absolute inset-0 rounded-[18px] animate-[spin_4s_linear_infinite]"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, var(--color-accent-1) 0deg, transparent 72deg, var(--color-accent-1) 144deg, transparent 216deg, var(--color-accent-1) 288deg, transparent 360deg)",
        }}
      />

      <span className="relative z-10 inline-flex h-12 items-center justify-center rounded-[17px] bg-[var(--color-surface)] px-5 text-[15px] font-semibold text-[var(--color-text)] transition duration-300 group-hover:bg-[var(--color-bg)]">
        смотреть весь каталог
      </span>
    </Link>
  );
}

function CatalogPreviewCard({ item }: { item: PreviewItem }) {
  const Icon = item.icon;
  const isLarge = item.size === "large";
  const isWide = item.size === "wide";
  const isSmall = item.size === "small";

  return (
    <Link
      href={item.href}
      className={cn(
        "group relative isolate block overflow-hidden rounded-[28px] bg-[var(--color-surface)] md:rounded-[32px]",
        "transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-[4px] hover:shadow-[0_20px_44px_rgba(20,24,28,0.14)]",
        isLarge && "min-h-[520px] md:min-h-[540px]",
        isWide && "min-h-[240px] md:min-h-[258px]",
        isSmall && "min-h-[220px] md:min-h-[258px]",
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
        style={{ backgroundImage: `url("${item.image}")` }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,24,28,0.10)_0%,rgba(20,24,28,0.16)_34%,rgba(20,24,28,0.78)_100%)] transition duration-500 group-hover:bg-[linear-gradient(180deg,rgba(20,24,28,0.12)_0%,rgba(20,24,28,0.20)_34%,rgba(20,24,28,0.84)_100%)]" />

      <div className="absolute inset-[1px] rounded-[27px] ring-1 ring-white/8 transition duration-500 group-hover:ring-white/14 md:rounded-[31px]" />

      <div className="absolute left-5 top-5 z-20 flex items-center gap-2 text-[var(--color-accent-1)] md:left-6 md:top-6">
        <Icon size={16} strokeWidth={2.2} className="shrink-0" />
        <span className="text-[12px] font-semibold uppercase tracking-[0.08em]">
          {item.label}
        </span>
      </div>

      <div className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-[18px] bg-white/14 text-white/92 backdrop-blur-sm transition duration-500 group-hover:translate-y-[-1px] group-hover:scale-[1.04] group-hover:bg-white/20 md:right-5 md:top-5">
        <ArrowUpRight
          size={20}
          strokeWidth={2.2}
          className="transition duration-500 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
        />
      </div>

      <div
        className={cn(
          "relative z-10 flex h-full flex-col justify-end text-white transition duration-500 group-hover:translate-y-[-2px]",
          isLarge && "p-6 md:p-8",
          isWide && "p-5 md:p-7",
          isSmall && "p-5 md:p-6",
        )}
      >
        <div className="max-w-[92%]">
          <h3
            className={cn(
              "font-heading tracking-[-0.05em]",
              isLarge && "text-[30px] leading-[0.96] md:text-[42px]",
              isWide && "text-[28px] leading-[0.96] md:text-[36px]",
              isSmall && "text-[24px] leading-[0.98] md:text-[28px]",
            )}
          >
            {item.title}
          </h3>

          {item.description ? (
            <p
              className={cn(
                "mt-3 max-w-[520px] text-white/90",
                isLarge && "text-[15px] leading-[1.4] md:mt-4 md:text-[18px]",
                isWide && "text-[14px] leading-[1.38] md:mt-3 md:text-[16px]",
              )}
            >
              {item.description}
            </p>
          ) : null}
        </div>

        {item.cta ? (
          <div className="mt-5 md:mt-6">
            <span className="inline-flex h-12 items-center justify-center rounded-[18px] bg-[var(--color-accent-1)] px-6 text-[15px] font-semibold text-[var(--color-accent-1-foreground)] transition duration-500 group-hover:translate-y-[-1px] group-hover:shadow-[0_10px_22px_rgba(30,222,123,0.24)] md:h-[52px] md:px-7 md:text-[16px]">
              {item.cta}
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

  if (!largeCard || !wideCard || smallCards.length !== 4) {
    return null;
  }

  return (
    <Section className="pt-10 md:pt-12 xl:pt-14">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.16 }}
          variants={sectionVariants}
        >
          <div className="mb-6 flex items-end justify-between gap-6 md:mb-8">
            <div className="max-w-[760px]">
              <h2 className="font-heading text-[30px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[40px] xl:text-[46px]">
                Каталог продукции
              </h2>

              <p className="mt-5 max-w-[680px] text-[15px] leading-[1.45] text-[var(--color-text-muted)] md:text-[17px]">
                Лакокрасочные и защитные материалы
                <br />
                для интерьерных, фасадных и специализированных задач.
              </p>
            </div>

            <CatalogPreviewButton />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            variants={cardsParentVariants}
            className="grid gap-4 xl:grid-cols-[1.05fr_1fr]"
          >
            <motion.div variants={cardVariants}>
              <CatalogPreviewCard item={largeCard} />
            </motion.div>

            <motion.div variants={cardVariants} className="grid gap-4">
              <CatalogPreviewCard item={wideCard} />

              <motion.div variants={cardsParentVariants} className="grid gap-4 sm:grid-cols-2">
                {smallCards.map((item) => (
                  <motion.div key={item.id} variants={cardVariants}>
                    <CatalogPreviewCard item={item} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
