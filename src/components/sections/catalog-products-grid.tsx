"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils/cn";

type CatalogProductCardItem = {
  id: string;
  subtitle: string;
  title: string;
  image: string;
  href: string;
  titleClassName?: string;
  imageClassName?: string;
};

const basePath = process.env.NODE_ENV === "production" ? "/lkz-site" : "";

const catalogProductCards: CatalogProductCardItem[] = [
  {
    id: "matte-enamel-base-a",
    subtitle: "универсальная",
    title: "Эмаль матовая база A",
    image: `${basePath}/images/sections/catalog/products/product-enamel-matte-base-a.webp`,
    href: "#products",
    titleClassName: "text-[18px] md:text-[17px] xl:text-[18px]",
  },
  {
    id: "facade-white-paint",
    subtitle: "фасадная",
    title: "Краска белоснежная",
    image: `${basePath}/images/sections/catalog/products/product-paint-white-facade.webp`,
    href: "#products",
    titleClassName: "text-[18px] md:text-[17px] xl:text-[18px]",
  },
  {
    id: "water-based-gloss-lacquer",
    subtitle: "универсальная",
    title: "ВД лак глянцевый",
    image: `${basePath}/images/sections/catalog/products/product-lacquer-gloss.webp`,
    href: "#products",
    titleClassName: "text-[18px] md:text-[17px] xl:text-[18px]",
  },
  {
    id: "sodium-liquid-glass",
    subtitle: "натриевое",
    title: "Жидкое стекло",
    image: `${basePath}/images/sections/catalog/products/product-liquid-glass.webp`,
    href: "#products",
    titleClassName: "text-[18px] md:text-[17px] xl:text-[18px]",
  },
  {
    id: "universal-antiseptic",
    subtitle: "универсальный",
    title: "Антисептик",
    image: `${basePath}/images/sections/catalog/products/product-antiseptic.webp`,
    href: "#products",
    titleClassName: "text-[18px] md:text-[17px] xl:text-[18px]",
  },
  {
    id: "deep-penetration-primer",
    subtitle: "эмальер",
    title: "Грунт глубокого проникновения",
    image: `${basePath}/images/sections/catalog/products/product-primer-deep.webp`,
    href: "#products",
    titleClassName: "text-[16px] md:text-[14px] xl:text-[15px] tracking-[-0.04em]",
  },
];

const gridVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.992 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function CatalogProductCard({
  item,
  mobile = false,
}: {
  item: CatalogProductCardItem;
  mobile?: boolean;
}) {
  return (
    <motion.div variants={cardVariants} className="h-full">
      <Link
        href={item.href}
        className={cn(
          "group block h-full rounded-[28px] bg-[var(--color-surface)] p-3 md:rounded-[32px]",
          "transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "hover:-translate-y-[2px] hover:shadow-[0_10px_24px_rgba(43,47,51,0.08)]",
          mobile ? "min-h-[420px] w-[84vw] max-w-[360px] shrink-0 snap-start" : "min-h-[500px]",
        )}
      >
        <div className="flex h-full flex-col">
          <div
            className={cn(
              "relative overflow-hidden rounded-[22px] bg-[var(--color-bg)] md:rounded-[24px]",
              mobile ? "h-[310px]" : "h-[378px]",
            )}
          >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.0)_0%,rgba(255,255,255,0.06)_100%)]" />

            <img
              src={item.image}
              alt={item.title}
              className={cn(
                "h-full w-full object-contain p-5 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]",
                item.imageClassName,
              )}
            />
          </div>

          <div className="flex min-h-[78px] items-end justify-between gap-4 px-2 pb-1 pt-5">
            <div className="min-w-0 flex-1">
              <div className="mb-1 text-[13px] leading-[1.1] tracking-[-0.02em] text-[var(--color-text-muted)] md:text-[12px] xl:text-[13px]">
                {item.subtitle}
              </div>

              <div
                className={cn(
                  "truncate font-heading leading-[0.98] text-[var(--color-text)]",
                  item.titleClassName,
                )}
                title={item.title}
              >
                {item.title}
              </div>
            </div>

            <div className="shrink-0 rounded-[18px] bg-[var(--color-bg)] p-2">
              <div className="flex h-10 w-[74px] items-center justify-center rounded-[14px] bg-[var(--color-surface)] text-[var(--color-accent-1)] transition duration-300 group-hover:translate-x-[2px] md:h-11 md:w-[86px]">
                <ArrowRight size={22} strokeWidth={2.2} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function CatalogProductsGrid() {
  return (
    <Section className="pt-8 md:pt-10 xl:pt-12">
      <Container>
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="hidden md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-3"
        >
          {catalogProductCards.map((item) => (
            <CatalogProductCard key={item.id} item={item} />
          ))}
        </motion.div>

        <div className="md:hidden">
          <div className="-mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <motion.div
              variants={gridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              className="flex snap-x snap-mandatory gap-4 pr-4"
            >
              {catalogProductCards.map((item) => (
                <CatalogProductCard key={item.id} item={item} mobile />
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
