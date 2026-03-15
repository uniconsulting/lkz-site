"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Droplets,
  Shield,
  Sparkles,
  Layers,
  FlaskConical,
  Leaf,
  type LucideIcon,
} from "lucide-react";
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
    label: "ВД краска",
    title: "ВД краска",
    description:
      "Интерьерные и фасадные решения для ровного, стойкого покрытия",
    image: `${basePath}/images/sections/catalog/preview/catalog-preview-vd-paint.webp`,
    href: "#products",
    size: "large",
    cta: "Открыть каталог",
    icon: Droplets,
  },
  {
    id: "enamels",
    label: "Защитные покрытия",
    title: "Эмали",
    description: "Для металла, фасадов и износостойких поверхностей",
    image: `${basePath}/images/sections/catalog/preview/catalog-preview-enamels.webp`,
    href: "#products",
    size: "wide",
    icon: Shield,
  },
  {
    id: "varnishes",
    label: "Финишные покрытия",
    title: "Лаки",
    image: `${basePath}/images/sections/catalog/preview/catalog-preview-varnishes.webp`,
    href: "#products",
    size: "small",
    icon: Sparkles,
  },
  {
    id: "primer",
    label: "Подготовка основания",
    title: "Грунт укрывной",
    image: `${basePath}/images/sections/catalog/preview/catalog-preview-primer.webp`,
    href: "#products",
    size: "small",
    icon: Layers,
  },
  {
    id: "liquid-glass",
    label: "Минеральная защита",
    title: "Жидкое стекло",
    image: `${basePath}/images/sections/catalog/preview/catalog-preview-liquid-glass.webp`,
    href: "#products",
    size: "small",
    icon: FlaskConical,
  },
  {
    id: "antiseptics",
    label: "Защита древесины",
    title: "Антисептики",
    image: `${basePath}/images/sections/catalog/preview/catalog-preview-antiseptics.webp`,
    href: "#products",
    size: "small",
    icon: Leaf,
  },
];

const headerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const gridVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 34, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function AnimatedCatalogButton() {
  return (
    <Link href="#products" className="hidden md:inline-flex">
      <div className="relative inline-flex overflow-hidden rounded-[18px] p-px">
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[18px]"
          style={{
            background:
              "linear-gradient(115deg, transparent 0%, transparent 34%, rgba(30,222,123,0.08) 42%, rgba(30,222,123,0.95) 50%, rgba(30,222,123,0.08) 58%, transparent 66%, transparent 100%)",
          }}
          animate={{ x: ["-140%", "140%"] }}
          transition={{
            duration: 2.8,
            ease: "linear",
            repeat: Infinity,
          }}
        />

        <span className="absolute inset-px rounded-[17px] bg-[var(--color-surface)]" />

        <span className="relative inline-flex h-12 items-center justify-center rounded-[17px] px-5 text-[15px] font-semibold text-[var(--color-text)]">
          смотреть весь каталог
        </span>
      </div>
    </Link>
  );
}

function CatalogPreviewCard({ item }: { item: PreviewItem }) {
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

  const isLarge = item.size === "large";
  const isWide = item.size === "wide";
  const isSmall = item.size === "small";
  const Icon = item.icon;

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    const rotateY = (px - 0.5) * 8;
    const rotateX = (0.5 - py) * 8;

    setTilt({
      rotateX,
      rotateY,
      y: -4,
      scale: 1.01,
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
        className="h-full [perspective:1400px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          animate={tilt}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 22,
            mass: 0.8,
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="h-full"
        >
          <Link
            href={item.href}
            className={cn(
              "group relative isolate block h-full overflow-hidden rounded-[28px] bg-[var(--color-surface)] md:rounded-[32px]",
isLarge && "min-h-[520px] md:min-h-[522px]",
isWide && "min-h-[240px] md:min-h-[240px]",
isSmall && "min-h-[220px] md:min-h-[240px]",
            )}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              style={{ backgroundImage: `url("${item.image}")` }}
            />

            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(20,24,28,0.08) 0%, rgba(20,24,28,0.14) 32%, rgba(20,24,28,0.76) 100%)",
              }}
            />

            <motion.div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              animate={{ opacity: glow.opacity }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{
                background: `radial-gradient(320px circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.18), transparent 60%)`,
              }}
            />

            <div
              className="absolute left-5 top-5 z-20 flex items-center gap-2 text-[var(--color-bg)] md:left-6 md:top-6"
              style={{ transform: "translateZ(30px)" }}
            >
              <Icon size={16} strokeWidth={2.1} className="shrink-0" />
              <span className="text-[12px] font-semibold uppercase tracking-[0.08em]">
                {item.label}
              </span>
            </div>

            <div
              className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-[18px] bg-white/16 text-white backdrop-blur-sm transition duration-300 group-hover:bg-white/22 md:right-5 md:top-5"
              style={{ transform: "translateZ(36px)" }}
            >
              <ArrowUpRight size={20} strokeWidth={2.2} />
            </div>

            <div
              className={cn(
                "relative z-10 flex h-full flex-col justify-end text-white",
                isLarge && "p-6 md:p-8",
                isWide && "p-5 md:p-7",
                isSmall && "p-5 md:p-6",
              )}
              style={{ transform: "translateZ(28px)" }}
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
                      isLarge &&
                        "text-[15px] leading-[1.45] md:mt-4 md:text-[18px]",
                      isWide &&
                        "text-[14px] leading-[1.42] md:mt-3 md:text-[16px]",
                    )}
                  >
                    {item.description}
                  </p>
                ) : null}
              </div>

              {item.cta ? (
                <div className="mt-5 md:mt-6">
                  <span className="inline-flex h-12 items-center justify-center rounded-[18px] bg-[var(--color-accent-1)] px-6 text-[15px] font-semibold text-[var(--color-accent-1-foreground)] transition duration-300 group-hover:translate-y-[-1px] group-hover:shadow-[0_8px_18px_rgba(30,222,123,0.22)] md:h-[52px] md:px-7 md:text-[16px]">
                    {item.cta}
                  </span>
                </div>
              ) : null}
            </div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
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
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          className="mb-8 flex items-end justify-between gap-6 md:mb-10"
        >
          <div className="max-w-[760px]">
            <h2 className="font-heading text-[30px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[40px] xl:text-[46px]">
              Каталог продукции
            </h2>

            <p className="mt-5 max-w-[680px] text-[15px] leading-[1.45] text-[var(--color-text-muted)] md:text-[17px]">
              <span className="block">Лакокрасочные и защитные материалы</span>
              <span className="block">
                для интерьерных, фасадных и специализированных задач.
              </span>
            </p>
          </div>

          <AnimatedCatalogButton />
        </motion.div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.14 }}
          className="grid gap-4 xl:grid-cols-[1.05fr_1fr]"
        >
          <CatalogPreviewCard item={largeCard} />

          <div className="grid gap-4">
            <CatalogPreviewCard item={wideCard} />

            <div className="grid gap-4 sm:grid-cols-2">
              {smallCards.map((item) => (
                <CatalogPreviewCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
