"use client";

import Link from "next/link";
import { useState, type MouseEvent } from "react";
import { motion } from "motion/react";
import { ArrowRight, PackageSearch } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { getProductLineById, type ProductItem } from "@/lib/content/products";

const gridVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.06,
      delayChildren: 0.03,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.992 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function RelatedProductCard({ product }: { product: ProductItem }) {
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

  const lineTitle = getProductLineById(product.lineId)?.title ?? "";

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
            href={`/products/${product.slug}`}
            className={cn(
              "group block h-full rounded-[28px] bg-[var(--color-surface)] p-3 md:rounded-[32px]",
              "transform-gpu transition-[box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "hover:shadow-[0_18px_42px_rgba(43,47,51,0.10)]",
              "min-h-[410px]",
            )}
          >
            <div className="flex h-full flex-col">
              <div
                className="relative h-[320px] overflow-hidden rounded-[22px] bg-[var(--color-bg)] md:rounded-[24px]"
                style={{ transform: "translateZ(28px)" }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.05)_100%)]" />

                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  animate={{ opacity: glow.opacity }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    background: `radial-gradient(260px circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.22), transparent 62%)`,
                  }}
                />

                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full scale-[1.28] object-contain p-2 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.34]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-[var(--color-surface)] text-[var(--color-text-muted)]">
                      <PackageSearch size={30} strokeWidth={1.9} />
                    </div>
                  </div>
                )}

                {product.isArchived ? (
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
                    {product.subtitle || lineTitle}
                  </div>

                  <div
                    className="truncate text-[16px] font-semibold leading-[0.96] tracking-[-0.04em] text-[var(--color-text)] md:text-[14px] xl:text-[15px]"
                    title={product.title}
                  >
                    {product.title}
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

export function RelatedProductsGrid({
  products,
}: {
  products: ProductItem[];
}) {
  if (products.length === 0) return null;

  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
    >
      {products.map((product) => (
        <RelatedProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  );
}
