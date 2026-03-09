"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { heroSlides, type HeroSlide } from "@/lib/content/hero";
import { cn } from "@/lib/utils/cn";

const indicatorMajorPositions = [0, 4, 8];

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
        className="inline-flex h-12 w-[150px] items-center justify-center rounded-[20px] bg-[var(--color-bg)] text-[var(--color-accent-3)] transition duration-200 hover:opacity-85"
      >
        <Icon size={24} strokeWidth={2.2} />
      </button>
    </div>
  );
}

function HeroMetric({ slide }: { slide: HeroSlide }) {
  if (slide.metricVariant === "single") {
    return (
      <div className="flex items-center">
        <span className="font-heading text-[172px] leading-[0.84] tracking-[-0.08em] text-[var(--color-accent-1)]">
          {slide.metricTop}
        </span>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-[315px] flex-col items-start">
      <span className="font-heading text-[78px] leading-[0.92] tracking-[-0.06em] text-[var(--color-accent-1)]">
        {slide.metricTop}
      </span>

      <span className="my-2 h-[3px] w-full bg-[var(--color-accent-3)]/85" />

      <span className="font-heading text-[74px] leading-[0.92] tracking-[-0.06em] text-[var(--color-accent-1)]">
        {slide.metricBottom}
      </span>
    </div>
  );
}

function HeroIndicators({ activeIndex }: { activeIndex: number }) {
  const activeMajorIndex = indicatorMajorPositions[activeIndex] ?? 0;

  return (
    <div className="flex items-end gap-[20px]">
      {Array.from({ length: 9 }).map((_, index) => {
        const isMajor = indicatorMajorPositions.includes(index);
        const isActive = index === activeMajorIndex;

        return (
          <span
            key={index}
            className={cn(
              "block rounded-full transition duration-300",
              isMajor
                ? "h-[62px] w-[3px]"
                : "h-[44px] w-[2px]",
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

function HeroBanner({ slide }: { slide: HeroSlide }) {
  const toneClassMap = {
    dark: "bg-[var(--color-accent-2)] text-white",
    muted: "bg-[var(--color-accent-3)]/85 text-white",
    light: "bg-[var(--color-surface)] text-[var(--color-text)]",
  } as const;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slide.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className={cn(
          "flex h-[360px] w-full items-center justify-center rounded-[36px]",
          toneClassMap[slide.bannerTone],
        )}
      >
        <span className="font-body text-[46px] tracking-[-0.03em]">
          {slide.bannerLabel}
        </span>
      </motion.div>
    </AnimatePresence>
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
            <h1 className="font-heading text-[62px] leading-[0.94] tracking-[-0.06em] text-[var(--color-text)]">
              Симбирские краски
            </h1>

            <div className="flex-1 py-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="grid h-full grid-cols-[340px_1fr] items-center gap-7"
                >
                  <HeroMetric slide={activeSlide} />

                  <div className="flex flex-col gap-[6px]">
                    {activeSlide.description.map((line) => (
                      <p
                        key={line}
                        className="text-[28px] leading-[1.4] tracking-[-0.03em] text-[var(--color-text)]"
                      >
                        {line}
                      </p>
                    ))}
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

          <HeroBanner slide={activeSlide} />
        </div>
      </Container>
    </Section>
  );
}
