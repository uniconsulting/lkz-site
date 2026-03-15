"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Droplets,
  FlaskConical,
  Leaf,
  PaintBucket,
  Shield,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils/cn";
import {
  getProductsByCategory,
  productCategories,
  productLines,
  type ProductCategoryId,
  type ProductLineId,
} from "@/lib/content/products";

const sectionMotion = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const cardMotion = {
  hidden: { opacity: 0, y: 20, scale: 0.992 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.52,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const categoryIconMap: Record<ProductCategoryId, LucideIcon> = {
  enamels: PaintBucket,
  paints: Droplets,
  "special-paints": Shield,
  primers: BadgeCheck,
  varnishes: Sparkles,
  "adhesives-glass": FlaskConical,
  protective: Leaf,
  "special-products": Wrench,
};

const lineTitleMap: Record<ProductLineId, string> = Object.fromEntries(
  productLines.map((line) => [line.id, line.title]),
) as Record<ProductLineId, string>;

const productsPageContent = {
  eyebrow: "продукция",
  title: "Каталог продукции",
  description: [
    "полный каталог лакокрасочной продукции с разбивкой по категориям,",
    "позициям и доступным фасовкам",
  ],
  cta: "запросить коммерческое предложение",
};

function CategoryNavButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      className="inline-flex h-11 items-center justify-center rounded-[18px] bg-[var(--color-bg)] px-5 text-[14px] font-semibold text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px] hover:text-[var(--color-accent-1)] hover:shadow-[0_8px_20px_rgba(43,47,51,0.06)]"
    >
      {label}
    </a>
  );
}

function PackagingBadge({ value }: { value: string }) {
  return (
    <span className="inline-flex h-9 items-center justify-center rounded-[14px] bg-[var(--color-bg)] px-3 text-[13px] font-medium text-[var(--color-text)]">
      {value}
    </span>
  );
}

function ProductCard({
  title,
  subtitle,
  description,
  packagings,
  lineId,
  isArchived,
}: {
  title: string;
  subtitle?: string;
  description: string;
  packagings: string[];
  lineId: ProductLineId;
  isArchived?: boolean;
}) {
  return (
    <motion.div
      variants={cardMotion}
      className="flex h-full flex-col rounded-[28px] bg-[var(--color-surface)] p-5 md:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-[999px] bg-[var(--color-bg)] px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
              {lineTitleMap[lineId]}
            </span>

            {isArchived ? (
              <span className="inline-flex items-center rounded-[999px] bg-[var(--color-bg)] px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                архив
              </span>
            ) : null}
          </div>

          <h3 className="mt-5 font-heading text-[26px] leading-[0.96] tracking-[-0.04em] text-[var(--color-text)]">
            {title}
          </h3>

          {subtitle ? (
            <div className="mt-2 text-[14px] font-semibold uppercase tracking-[0.06em] text-[var(--color-text-muted)]">
              {subtitle}
            </div>
          ) : null}
        </div>

        <div className="shrink-0 rounded-[18px] bg-[var(--color-bg)] p-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[var(--color-surface)] text-[var(--color-accent-1)]">
            <ArrowRight size={18} strokeWidth={2.2} />
          </div>
        </div>
      </div>

      <p className="mt-5 text-[15px] leading-[1.46] text-[var(--color-text-muted)]">
        {description}
      </p>

      <div className="mt-6">
        <div className="mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
          фасовки
        </div>

        <div className="flex flex-wrap gap-2">
          {packagings.map((item) => (
            <PackagingBadge key={item} value={item} />
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6">
        <a
          href="/contacts"
          className="inline-flex h-11 items-center justify-center rounded-[18px] bg-[var(--color-accent-1)] px-5 text-[14px] font-semibold text-[var(--color-accent-1-foreground)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(30,222,123,0.22)]"
        >
          запросить КП
        </a>
      </div>
    </motion.div>
  );
}

function CategorySection({
  categoryId,
  title,
  description,
}: {
  categoryId: ProductCategoryId;
  title: string;
  description: string;
}) {
  const products = getProductsByCategory(categoryId);
  const Icon = categoryIconMap[categoryId];

  if (products.length === 0) return null;

  return (
    <section id={categoryId} className="scroll-mt-[120px]">
      <motion.div
        variants={sectionMotion}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
      >
        <div className="mb-6 md:mb-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-[var(--color-surface)] text-[var(--color-accent-1)]">
              <Icon size={20} strokeWidth={2.1} />
            </div>

            <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
              категория
            </div>
          </div>

          <h2 className="font-heading text-[30px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[38px] xl:text-[42px]">
            {title}
          </h2>

          <p className="mt-4 max-w-[760px] text-[15px] leading-[1.46] text-[var(--color-text-muted)] md:text-[16px]">
            {description}
          </p>
        </div>

        <motion.div
          variants={sectionMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              subtitle={product.subtitle}
              description={product.description}
              packagings={product.packagings}
              lineId={product.lineId}
              isArchived={product.isArchived}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export function ProductsPage() {
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
          <motion.div
            variants={sectionMotion}
            initial="hidden"
            animate="visible"
            className="rounded-[28px] bg-[var(--color-surface)] p-4 md:p-5"
          >
            <div className="mb-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
              категории каталога
            </div>

            <div className="flex flex-wrap gap-3">
              {productCategories.map((category) => (
                <CategoryNavButton
                  key={category.id}
                  href={`#${category.id}`}
                  label={category.title}
                />
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section className="pt-8 md:pt-10 xl:pt-12">
        <Container>
          <div className="space-y-12 md:space-y-14 xl:space-y-16">
            {productCategories.map((category) => (
              <CategorySection
                key={category.id}
                categoryId={category.id}
                title={category.title}
                description={category.description}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-10 md:pt-12 xl:pt-14">
        <Container>
          <motion.div
            variants={sectionMotion}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            className="rounded-[32px] bg-[var(--color-surface)] p-6 md:p-8 xl:p-10"
          >
            <div className="max-w-[860px]">
              <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
                нужен подбор
              </div>

              <h2 className="mt-4 font-heading text-[30px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[40px] xl:text-[46px]">
                Подберём продуктовую матрицу под вашу задачу
              </h2>

              <p className="mt-5 max-w-[760px] text-[15px] leading-[1.48] text-[var(--color-text-muted)] md:text-[17px]">
                Если нужен подбор по назначению, фасовке, категории или формату
                сотрудничества, отправьте запрос и мы подготовим коммерческое
                предложение.
              </p>

              <div className="mt-7">
                <Link
                  href="/contacts"
                  className="inline-flex h-12 items-center justify-center rounded-[18px] bg-[var(--color-accent-1)] px-6 text-[15px] font-semibold text-[var(--color-accent-1-foreground)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(30,222,123,0.22)]"
                >
                  запросить КП
                </Link>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>
    </div>
  );
}
