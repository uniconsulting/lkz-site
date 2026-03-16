"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  BadgeCheck,
  PackageSearch,
  ShoppingBag,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import {
  type ProductItem,
  getProductCategoryById,
  getProductLineById,
  getRelatedProducts,
} from "@/lib/content/products";
import { RelatedProductsGrid } from "@/components/catalog/related-products-grid";

const sectionMotion = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function PackagingBadge({ value }: { value: string }) {
  return (
    <span className="inline-flex h-10 items-center justify-center rounded-[14px] bg-[var(--color-bg)] px-4 text-[14px] font-medium text-[var(--color-text)]">
      {value}
    </span>
  );
}

function CharacteristicCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[20px] bg-[var(--color-bg)] p-4">
      <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
        {label}
      </div>
      <div className="mt-3 text-[16px] leading-[1.35] text-[var(--color-text)]">
        {value}
      </div>
    </div>
  );
}

export function ProductDetailPage({ product }: { product: ProductItem }) {
  const category = getProductCategoryById(product.categoryId);
  const line = getProductLineById(product.lineId);
  const relatedProducts = getRelatedProducts(product.id, { limit: 3 });
  const contactHref = `/contacts?product=${encodeURIComponent(product.slug)}`;

  return (
    <div className="pt-[92px] pb-6 md:pt-[104px] md:pb-8 xl:pb-10">
      <Section className="pt-8 md:pt-10 xl:pt-12">
        <Container>
          <motion.div variants={sectionMotion} initial="hidden" animate="visible">
            <Link
              href="/products"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[16px] bg-[var(--color-surface)] px-4 text-[14px] font-medium text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px]"
            >
              <ArrowLeft size={16} strokeWidth={2.2} />
              <span>назад в каталог</span>
            </Link>

            <div className="mt-6 text-[15px] tracking-[-0.02em] text-[var(--color-text-muted)]">
              главная / продукция / {product.title}
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section className="pt-6 md:pt-8 xl:pt-10">
        <Container>
          <motion.div
            variants={sectionMotion}
            initial="hidden"
            animate="visible"
            className="grid gap-4 xl:grid-cols-[0.94fr_1.06fr] xl:items-stretch"
          >
            <div className="rounded-[32px] bg-[var(--color-surface)] p-4 md:p-5">
              <div className="relative flex h-[520px] items-center justify-center overflow-hidden rounded-[24px] bg-[var(--color-bg)]">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.0)_0%,rgba(255,255,255,0.05)_100%)]" />

                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="relative z-[1] h-full w-full scale-[1.12] object-contain p-6"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-[var(--color-surface)] text-[var(--color-text-muted)]">
                    <PackageSearch size={38} strokeWidth={1.9} />
                  </div>
                )}

                {product.isArchived ? (
                  <div className="absolute left-4 top-4 inline-flex h-9 items-center rounded-[999px] bg-[var(--color-surface)] px-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                    архивная позиция
                  </div>
                ) : null}
              </div>
            </div>

            <div className="rounded-[32px] bg-[var(--color-surface)] p-6 md:p-8">
              <div className="flex flex-wrap gap-2">
                {line ? (
                  <span className="inline-flex items-center rounded-[999px] bg-[var(--color-bg)] px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
                    {line.title}
                  </span>
                ) : null}

                {category ? (
                  <span className="inline-flex items-center rounded-[999px] bg-[var(--color-bg)] px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                    {category.title}
                  </span>
                ) : null}
              </div>

              <h1 className="mt-5 font-heading text-[34px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[46px]">
                {product.title}
              </h1>

              {product.subtitle ? (
                <div className="mt-3 text-[14px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)] md:text-[15px]">
                  {product.subtitle}
                </div>
              ) : null}

              <p className="mt-5 max-w-[760px] text-[16px] leading-[1.5] text-[var(--color-text-muted)]">
                {product.description}
              </p>

              <div className="mt-8 rounded-[24px] bg-[var(--color-bg)] p-5">
                <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
                  доступные фасовки
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.packagings.map((item) => (
                    <PackagingBadge key={item} value={item} />
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={contactHref}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[18px] bg-[var(--color-accent-1)] px-6 text-[15px] font-semibold text-[var(--color-accent-1-foreground)] transition duration-300 hover:-translate-y-[1px]"
                >
                  <ShoppingBag size={16} strokeWidth={2.2} />
                  <span>запросить КП</span>
                </Link>

                <Link
                  href={contactHref}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[18px] bg-[var(--color-bg)] px-6 text-[15px] font-semibold text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px]"
                >
                  <BadgeCheck size={16} strokeWidth={2.2} />
                  <span>уточнить параметры</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {product.characteristics && product.characteristics.length > 0 ? (
        <Section className="pt-8 md:pt-10 xl:pt-12">
          <Container>
            <motion.div
              variants={sectionMotion}
              initial="hidden"
              animate="visible"
              className="rounded-[32px] bg-[var(--color-surface)] p-6 md:p-8"
            >
              <div className="mb-6">
                <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
                  характеристики
                </div>
                <h2 className="mt-4 font-heading text-[28px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[36px]">
                  Параметры товара
                </h2>
              </div>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {product.characteristics.map((item) => (
                  <CharacteristicCard
                    key={`${item.label}-${item.value}`}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </div>
            </motion.div>
          </Container>
        </Section>
      ) : null}

      {relatedProducts.length > 0 ? (
        <Section className="pt-8 md:pt-10 xl:pt-12">
          <Container>
            <motion.div
              variants={sectionMotion}
              initial="hidden"
              animate="visible"
            >
              <div className="mb-6">
                <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
                  похожие позиции
                </div>
                <h2 className="mt-4 font-heading text-[28px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[36px]">
                  Вам также может подойти
                </h2>
              </div>

              <RelatedProductsGrid products={relatedProducts} />
            </motion.div>
          </Container>
        </Section>
      ) : null}

      <Section className="pt-8 md:pt-10 xl:pt-12">
        <Container>
          <motion.div
            variants={sectionMotion}
            initial="hidden"
            animate="visible"
            className="rounded-[32px] bg-[var(--color-surface)] p-6 md:p-8 xl:p-10"
          >
            <div className="max-w-[860px]">
              <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
                нужен подбор
              </div>

              <h2 className="mt-4 font-heading text-[30px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[40px] xl:text-[46px]">
                Подберём подходящий продукт под вашу задачу
              </h2>

              <p className="mt-5 max-w-[760px] text-[15px] leading-[1.48] text-[var(--color-text-muted)] md:text-[17px]">
                Если нужна помощь с выбором позиции, фасовки, аналогов или формата поставки, отправьте запрос и мы подготовим коммерческое предложение.
              </p>

              <div className="mt-7">
                <Link
                  href={contactHref}
                  className="inline-flex h-12 items-center justify-center rounded-[18px] bg-[var(--color-accent-1)] px-6 text-[15px] font-semibold text-[var(--color-accent-1-foreground)] transition duration-300 hover:-translate-y-[1px]"
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
