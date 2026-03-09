"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { heroSlides, type HeroSlide } from "@/lib/content/hero";
import { cn } from "@/lib/utils/cn";

const indicatorMajorPositions = [0, 5, 10];

function formatMetricValue(value: number, original: string) {
  if (original.includes(".")) {
    return new Intl.NumberFormat("de-DE").format(value);
  }

  return String(value);
}

function AnimatedMetricNumber({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const targetValue = Number(value.replace(/\./g, ""));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let frameId = 0;
    const duration = 950;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.round(targetValue * eased);

      setDisplayValue(nextValue);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    }

    setDisplayValue(0);
    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [targetValue]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.34, ease: "easeOut" }}
      className={className}
    >
      {formatMetricValue(displayValue, value)}
    </motion.span>
  );
}

function ArrowFrameButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;

  return (
    <div className="rounded-[28px] bg-[var(--color-surface)] p-2">
      <button
        type="button"
        onClick={onClick}
        aria-label={direction === "prev" ? "Предыдущий блок" : "Следующий блок"}
        className={cn(
          "inline-flex h-12 w-[128px] items-center justify-center rounded-[20px] bg-[var(--color-bg)] text-[var(--color-accent-3)]",
          "transition-[transform,box-shadow,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "hover:-translate-y-[1px] hover:text-[var(--color-accent-1)] hover:shadow-[0_6px_14px_rgba(43,47,51,0.06)]",
        )}
      >
        <Icon size={22} strokeWidth={2.2} />
      </button>
    </div>
  );
}

function HeroMetric({ slide }: { slide: HeroSlide }) {
  if (slide.metricVariant === "single") {
    return (
      <div
        className={cn(
          "shrink-0 self-center overflow-hidden",
          slide.metricShellClassName,
        )}
      >
        <AnimatedMetricNumber
          value={slide.metricTop}
          className={cn(
            "block font-heading text-[var(--color-accent-1)]",
            slide.metricTopClassName,
          )}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "shrink-0 self-center overflow-hidden",
        slide.metricShellClassName,
      )}
    >
      <AnimatedMetricNumber
        value={slide.metricTop}
        className={cn(
          "block font-heading text-[var(--color-accent-1)]",
          slide.metricTopClassName,
        )}
      />

      <span
        className={cn(
          "block h-[3px] bg-[var(--color-accent-3)]/85",
          slide.metricDividerClassName,
        )}
      />

      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.34, ease: "easeOut", delay: 0.06 }}
        className={cn(
          "block font-heading text-[var(--color-accent-1)]",
          slide.metricBottomClassName,
        )}
      >
        {slide.metricBottom}
      </motion.span>
    </div>
  );
}

function HeroIndicators({ activeIndex }: { activeIndex: number }) {
  const activeMajorIndex = indicatorMajorPositions[activeIndex] ?? 0;

  return (
    <div className="flex items-end gap-[12px]">
      {Array.from({ length: 11 }).map((_, index) => {
        const isMajor = indicatorMajorPositions.includes(index);
        const isActive = index === activeMajorIndex;

        return (
          <span
            key={index}
            className={cn(
              "block rounded-full transition duration-300",
              isMajor ? "h-[54px] w-[3px]" : "h-[34px] w-[2px]",
              isActive
                ? "bg-[var(--color-accent-1)]"
                : isMajor
                  ? "bg-[var(--color-accent-2)]"
                  : "bg-[var(--color-accent-3)]",
            )}
          />
        );
      })}
    </div>
  );
}

function HeroBannerPlaceholder() {
  return (
    <div className="flex h-[360px] w-full items-center justify-center rounded-[36px] bg-[var(--color-accent-2)] text-white">
      <span className="font-body text-[44px] tracking-[-0.03em]">БАННЕР</span>
    </div>
  );
}

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSlide = useMemo(() => heroSlides[activeIndex], [activeIndex]);

  function goPrev() {
    setActiveIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  }

  function goNext() {
    setActiveIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  }

  return (
    <Section className="pt-4 md:pt-6 xl:pt-8">
      <Container>
        <div className="grid items-start gap-8 xl:grid-cols-[1fr_720px] xl:gap-10">
          <div className="flex h-[360px] flex-col justify-between">
            <h1 className="font-heading whitespace-nowrap text-[46px] leading-[1] tracking-[-0.05em] text-[var(--color-text)]">
              Симбирские краски
            </h1>

            <div className="flex-1 py-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                  className={cn(
                    "flex h-full items-center",
                    activeSlide.contentGapClassName,
                  )}
                >
                  <HeroMetric slide={activeSlide} />

                  <div
                    className={cn(
                      "min-w-0 flex-1 self-center",
                      activeSlide.descriptionShellClassName,
                    )}
                  >
                    <div className="flex flex-col gap-[10px]">
                      {activeSlide.description.map((line) => (
                        <p
                          key={line}
                          className="text-[18px] leading-[1.18] tracking-[-0.02em] text-[var(--color-text)]"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between gap-6">
              <ArrowFrameButton direction="prev" onClick={goPrev} />
              <HeroIndicators activeIndex={activeIndex} />
              <ArrowFrameButton direction="next" onClick={goNext} />
            </div>
          </div>

          <HeroBannerPlaceholder />
        </div>
      </Container>
    </Section>
  );
}
