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
  getProductCategoryById,
  getProductLineById,
  type ProductItem,
} from "@/lib/content/products";

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

export function ProductDetailPage({ product }: { product: ProductItem }) {
  const category = getProductCategoryById(product.categoryId);
  const line = getProductLineById(product.lineId);

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
            className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr] xl:items-stretch"
          >
            <div className="rounded-[32px] bg-[var(--color-surface)] p-4 md:p-5">
              <div className="relative flex h-[420px] items-center justify-center overflow-hidden rounded-[24px] bg-[var(--color-bg)]">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full scale-[1.12] object-contain p-6"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-[var(--color-surface)] text-[var(--color-text-muted)]">
                    <PackageSearch size={38} strokeWidth={1.9} />
                  </div>
                )}
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

                {product.isArchived ? (
                  <span className="inline-flex items-center rounded-[999px] bg-[var(--color-bg)] px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                    архивная позиция
                  </span>
                ) : null}
              </div>

              <h1 className="mt-5 font-heading text-[34px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[44px]">
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

              <div className="mt-8">
                <div className="mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                  доступные фасовки
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.packagings.map((item) => (
                    <PackagingBadge key={item} value={item} />
                  ))}
                </div>
              </div>

              {product.characteristics && product.characteristics.length > 0 ? (
                <div className="mt-8 grid gap-3 md:grid-cols-2">
                  {product.characteristics.map((item) => (
                    <div
                      key={`${item.label}-${item.value}`}
                      className="rounded-[20px] bg-[var(--color-bg)] p-4"
                    >
                      <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                        {item.label}
                      </div>
                      <div className="mt-3 text-[16px] leading-[1.35] text-[var(--color-text)]">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contacts"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[18px] bg-[var(--color-accent-1)] px-6 text-[15px] font-semibold text-[var(--color-accent-1-foreground)] transition duration-300 hover:-translate-y-[1px]"
                >
                  <ShoppingBag size={16} strokeWidth={2.2} />
                  <span>запросить КП</span>
                </Link>

                <Link
                  href="/contacts"
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
    </div>
  );
}
