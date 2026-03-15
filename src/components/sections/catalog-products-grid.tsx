"use client";

import Link from "next/link";
import { useState, type MouseEvent } from "react";
import { motion } from "motion/react";
import { ArrowRight, ChevronRight } from "lucide-react";
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
    titleClassName: "text-[16px] md:text-[14px] xl:text-[15px]",
  },
  {
    id: "facade-white-paint",
    subtitle: "фасадная",
    title: "Краска белоснежная",
    image: `${basePath}/images/sections/catalog/products/product-paint-white-facade.webp`,
    href: "#products",
    titleClassName: "text-[16px] md:text-[14px] xl:text-[15px]",
  },
  {
    id: "water-based-gloss-lacquer",
    subtitle: "универсальная",
    title: "ВД лак глянцевый",
    image: `${basePath}/images/sections/catalog/products/product-lacquer-gloss.webp`,
    href: "#products",
    titleClassName: "text-[16px] md:text-[14px] xl:text-[15px]",
  },
  {
    id: "wood-paint",
    subtitle: "универсальная",
    title: "Краска для дерева",
    image: `${basePath}/images/sections/catalog/products/product-wood-paint.webp`,
    href: "#products",
    titleClassName: "text-[16px] md:text-[14px] xl:text-[15px]",
  },
  {
    id: "sodium-liquid-glass",
    subtitle: "натриевое",
    title: "Жидкое стекло",
    image: `${basePath}/images/sections/catalog/products/product-liquid-glass.webp`,
    href: "#products",
    titleClassName: "text-[16px] md:text-[14px] xl:text-[15px]",
  },
  {
    id: "universal-antiseptic",
    subtitle: "универсальный",
    title: "Антисептик",
    image: `${basePath}/images/sections/catalog/products/product-antiseptic.webp`,
    href: "#products",
    titleClassName: "text-[16px] md:text-[14px] xl:text-[15px]",
  },
  {
    id: "deep-penetration-primer",
    subtitle: "эмальер",
    title: "Грунт глубокого прон.",
    image: `${basePath}/images/sections/catalog/products/product-primer-deep.webp`,
    href: "#products",
    titleClassName: "text-[16px] md:text-[13px] xl:text-[14px] tracking-[-0.04em]",
  },
  {
    id: "pva-glue",
    subtitle: "универсальный",
    title: "Клей ПВА",
    image: `${basePath}/images/sections/catalog/products/product-pva-glue.webp`,
    href: "#products",
    titleClassName: "text-[16px] md:text-[14px] xl:text-[15px]",
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
    if (mobile) return;

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
            href={item.href}
            className={cn(
              "group block h-full rounded-[28px] bg-[var(--color-surface)] p-3 md:rounded-[32px]",
              "transform-gpu transition-[box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "hover:shadow-[0_18px_42px_rgba(43,47,51,0.10)]",
              mobile
                ? "min-h-[408px] w-[84vw] max-w-[360px] shrink-0 snap-start"
                : "min-h-[452px]",
            )}
          >
            <div className="flex h-full flex-col">
              <div
                className={cn(
                  "relative overflow-hidden rounded-[22px] bg-[var(--color-bg)] md:rounded-[24px]",
                  mobile ? "h-[310px]" : "h-[348px]",
                )}
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

                <img
                  src={item.image}
                  alt={item.title}
                  className={cn(
                    "h-full w-full scale-[1.3] object-contain p-2 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.36]",
                    item.imageClassName,
                  )}
                />
              </div>

<div
  className="flex min-h-[48px] items-end justify-between gap-3 px-0 pb-0 pt-2"
  style={{ transform: "translateZ(22px)" }}
>
  <div className="min-w-0 flex-1 px-2">
    <div className="mb-[2px] text-[15px] leading-[1.02] tracking-[-0.02em] text-[var(--color-text-muted)] md:text-[13px] xl:text-[14px]">
      {item.subtitle}
    </div>

    <div
      className={cn(
        "truncate font-semibold leading-[0.96] text-[var(--color-text)]",
        item.titleClassName,
      )}
      title={item.title}
    >
      {item.title}
    </div>
  </div>

  <div className="shrink-0 pr-0">
    <div className="flex h-10 w-[64px] items-center justify-center rounded-[14px] bg-[var(--color-bg)] text-[var(--color-accent-2)] transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[2px] group-hover:shadow-[0_8px_18px_rgba(43,47,51,0.06)] xl:h-10 xl:w-[72px]">
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

export function CatalogProductsGrid() {
  return (
    <Section className="pt-8 md:pt-10 xl:pt-12">
      <Container>
        <div className="mb-7 hidden md:flex md:items-center md:justify-between">
          <div className="ml-[10px] flex items-center gap-[6px]">
            <span className="cursor-default text-[17px] leading-none tracking-[-0.02em] text-[var(--color-text-muted)] transition duration-300 hover:text-[var(--color-text)]">
              каталог
            </span>

            <ChevronRight
              size={17}
              strokeWidth={2.5}
              className="relative top-[1px] text-[var(--color-accent-1)] transition duration-300"
            />

            <span className="cursor-default text-[17px] leading-none tracking-[-0.02em] text-[var(--color-text)] transition duration-300 hover:text-[var(--color-accent-1)]">
              рекомендуемые товары
            </span>
          </div>

          <Link
            href="#products"
            className="mr-[10px] text-[17px] leading-none tracking-[-0.02em] text-[var(--color-text)] transition duration-300 hover:text-[var(--color-accent-1)]"
          >
            открыть весь каталог
          </Link>
        </div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="hidden md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-4"
        >
          {catalogProductCards.map((item) => (
            <CatalogProductCard key={item.id} item={item} />
          ))}
        </motion.div>

        <div className="md:hidden">
          <div className="mb-5 flex items-center gap-2">
            <span className="text-[15px] tracking-[-0.02em] text-[var(--color-text-muted)]">
              каталог
            </span>

            <ChevronRight
              size={16}
              strokeWidth={2.5}
              className="relative top-[1px] text-[var(--color-accent-1)]"
            />

            <span className="text-[15px] tracking-[-0.02em] text-[var(--color-text)]">
              рекомендуемые товары
            </span>
          </div>

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
