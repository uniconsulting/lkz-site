"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { heroSlides, type HeroSlide } from "@/lib/content/hero";
import { cn } from "@/lib/utils/cn";

const indicatorMajorPositions = [0, 5, 10];

const mobileMetricStyles: Record<
  string,
  {
    shell: string;
    top: string;
    bottom?: string;
    divider?: string;
    gap: string;
    descriptionShell: string;
  }
> = {
  experience: {
    shell: "w-[132px]",
    top: "relative -top-[2px] text-[98px] leading-[0.82] tracking-[-0.08em]",
    gap: "gap-[28px]",
    descriptionShell: "w-[220px]",
  },
  volume: {
    shell: "w-[142px]",
    top: "text-[27px] leading-[0.9] tracking-[-0.05em]",
    bottom: "relative -top-[2px] text-[36px] leading-[0.88] tracking-[-0.06em]",
    divider: "h-px w-[138px] my-[12px]",
    gap: "gap-[28px]",
    descriptionShell: "w-[220px]",
  },
  partners: {
    shell: "w-[142px]",
    top: "text-[47px] leading-[0.84] tracking-[-0.06em]",
    bottom: "relative -top-[2px] text-[19px] leading-[0.94] tracking-[-0.04em]",
    divider: "h-px w-[138px] my-[12px]",
    gap: "gap-[28px]",
    descriptionShell: "w-[240px]",
  },
};

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
    <div className="rounded-[24px] bg-[var(--color-surface)] p-2 md:rounded-[28px]">
      <button
        type="button"
        onClick={onClick}
        aria-label={direction === "prev" ? "Предыдущий блок" : "Следующий блок"}
        className={cn(
          "inline-flex h-11 w-[88px] items-center justify-center rounded-[18px] bg-[var(--color-bg)] text-[var(--color-accent-3)] md:h-12 md:w-[128px] md:rounded-[20px]",
          "transition-[transform,box-shadow,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "hover:-translate-y-[1px] hover:text-[var(--color-accent-1)] hover:shadow-[0_6px_14px_rgba(43,47,51,0.06)]",
        )}
      >
        <Icon size={20} strokeWidth={2.2} className="md:h-[22px] md:w-[22px]" />
      </button>
    </div>
  );
}

function HeroMetric({
  slide,
  mobile = false,
}: {
  slide: HeroSlide;
  mobile?: boolean;
}) {
  const mobileStyle = mobileMetricStyles[slide.id] ?? mobileMetricStyles.experience;

  const shellClassName = mobile ? mobileStyle.shell : slide.metricShellClassName;
  const topClassName = mobile ? mobileStyle.top : slide.metricTopClassName;
  const bottomClassName = mobile ? mobileStyle.bottom : slide.metricBottomClassName;
  const dividerClassName = mobile
    ? mobileStyle.divider
    : slide.metricDividerClassName;

  if (slide.metricVariant === "single") {
    return (
      <div
        className={cn(
          "shrink-0 self-center overflow-hidden",
          shellClassName,
        )}
      >
        <AnimatedMetricNumber
          value={slide.metricTop}
          className={cn(
            "block font-heading text-[var(--color-accent-1)]",
            topClassName,
          )}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "shrink-0 self-center overflow-hidden",
        shellClassName,
      )}
    >
      <AnimatedMetricNumber
        value={slide.metricTop}
        className={cn(
          "block font-heading text-[var(--color-accent-1)]",
          topClassName,
        )}
      />

      <span
        className={cn(
          "block bg-[var(--color-accent-3)]/85",
          dividerClassName,
        )}
      />

      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.34, ease: "easeOut", delay: 0.06 }}
        className={cn(
          "block font-heading text-[var(--color-accent-1)]",
          bottomClassName,
        )}
      >
        {slide.metricBottom}
      </motion.span>
    </div>
  );
}

function HeroIndicators({
  activeIndex,
  mobile = false,
}: {
  activeIndex: number;
  mobile?: boolean;
}) {
  const activeMajorIndex = indicatorMajorPositions[activeIndex] ?? 0;

  return (
    <div className={cn("flex items-end", mobile ? "gap-[8px]" : "gap-[12px]")}>
      {Array.from({ length: 11 }).map((_, index) => {
        const isMajor = indicatorMajorPositions.includes(index);
        const isActive = index === activeMajorIndex;

        return (
          <span
            key={index}
            className={cn(
              "block rounded-full transition duration-300",
              mobile
                ? isMajor
                  ? "h-[34px] w-[3px]"
                  : "h-[20px] w-[2px]"
                : isMajor
                  ? "h-[54px] w-[3px]"
                  : "h-[34px] w-[2px]",
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

function HeroBannerPlaceholder({
  className,
  labelClassName,
}: {
  className?: string;
  labelClassName?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center rounded-[28px] bg-[var(--color-accent-2)] text-white md:rounded-[36px]",
        className,
      )}
    >
      <span className={cn("font-body tracking-[-0.03em]", labelClassName)}>
        БАННЕР
      </span>
    </div>
  );
}

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSlide = useMemo(() => heroSlides[activeIndex], [activeIndex]);
  const mobileStyle = mobileMetricStyles[activeSlide.id] ?? mobileMetricStyles.experience;

  function goPrev() {
    setActiveIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  }

  function goNext() {
    setActiveIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  }

  return (
    <Section className="pt-4 md:pt-6 xl:pt-8">
      <Container>
        <div className="md:hidden">
          <div className="flex flex-col gap-4">
            <div className="flex min-h-[252px] flex-col justify-between">
              <h1 className="font-heading text-[28px] leading-[1] tracking-[-0.05em] text-[var(--color-text)]">
                Симбирские краски
              </h1>

              <div className="flex-1 pt-5 pb-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`mobile-${activeSlide.id}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className={cn(
                      "flex h-full items-center",
                      mobileStyle.gap,
                    )}
                  >
                    <HeroMetric slide={activeSlide} mobile />

<div
  className={cn(
    "shrink-0 self-center",
    mobileStyle.descriptionShell,
  )}
>
                      <div className="flex flex-col gap-[6px]">
                        {activeSlide.description.map((line) => (
                          <p
                            key={line}
                            className="text-[14px] leading-[1.16] tracking-[-0.02em] text-[var(--color-text)]"
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between gap-3">
                <ArrowFrameButton direction="prev" onClick={goPrev} />
                <HeroIndicators activeIndex={activeIndex} mobile />
                <ArrowFrameButton direction="next" onClick={goNext} />
              </div>
            </div>

            <HeroBannerPlaceholder
              className="aspect-[2/1]"
              labelClassName="text-[28px]"
            />
          </div>
        </div>

        <div className="hidden md:grid md:items-start md:gap-8 xl:grid-cols-[1fr_720px] xl:gap-10">
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

          <HeroBannerPlaceholder
            className="h-[360px]"
            labelClassName="text-[44px]"
          />
        </div>
      </Container>
    </Section>
  );
}
