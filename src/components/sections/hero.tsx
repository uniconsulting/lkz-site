"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { heroSlides, type HeroSlide } from "@/lib/content/hero";
import { cn } from "@/lib/utils/cn";

const indicatorMajorPositions = [0, 5, 10];

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
        className="inline-flex h-12 w-[128px] items-center justify-center rounded-[20px] bg-[var(--color-bg)] text-[var(--color-accent-3)] transition duration-200 hover:opacity-85"
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
        <span
          className={cn(
            "block font-heading text-[var(--color-accent-1)]",
            slide.metricTopClassName,
          )}
        >
          {slide.metricTop}
        </span>
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
      <span
        className={cn(
          "block font-heading text-[var(--color-accent-1)]",
          slide.metricTopClassName,
        )}
      >
        {slide.metricTop}
      </span>

      <span
        className={cn(
          "block h-[3px] bg-[var(--color-accent-3)]/85",
          slide.metricDividerClassName,
        )}
      />

      <span
        className={cn(
          "block font-heading text-[var(--color-accent-1)]",
          slide.metricBottomClassName,
        )}
      >
        {slide.metricBottom}
      </span>
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
            <h1 className="font-heading whitespace-nowrap text-[44px] leading-[1] tracking-[-0.05em] text-[var(--color-text)]">
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
