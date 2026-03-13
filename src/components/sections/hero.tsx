"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Factory,
  FlaskConical,
  Leaf,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { heroSlides, type HeroSlide } from "@/lib/content/hero";
import { cn } from "@/lib/utils/cn";

const basePath = process.env.NODE_ENV === "production" ? "/lkz-site" : "";

const heroBanners = [
  {
    id: "private-label",
    src: `${basePath}/images/sections/hero/banners/hero-banner-private-label.webp`,
    alt: "Private Label",
  },
  {
    id: "logistics",
    src: `${basePath}/images/sections/hero/banners/hero-banner-logistics.webp`,
    alt: "Логистика",
  },
  {
    id: "quality",
    src: `${basePath}/images/sections/hero/banners/hero-banner-quality.webp`,
    alt: "Качество",
  },
] as const;

const indicatorMajorPositions = [0, 5, 10];
const DESKTOP_STICKY_TOP = 128;

const LEFT_CARD_WIDTH = 300;
const CARD_OVERLAP = 64;
const FACTORY_CARD_WIDTH = 560;
const RIGHT_AREA_LEFT = LEFT_CARD_WIDTH - CARD_OVERLAP;
const ECO_CARD_LEFT = FACTORY_CARD_WIDTH - CARD_OVERLAP;

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
    shell: "w-[138px]",
    top: "relative -top-[4px] text-[98px] leading-[0.82] tracking-[-0.08em]",
    gap: "gap-[28px]",
    descriptionShell: "w-[220px]",
  },
  volume: {
    shell: "w-[142px]",
    top: "text-[27px] leading-[0.9] tracking-[-0.05em]",
    bottom:
      "relative -top-[2px] text-[36px] leading-[0.88] tracking-[-0.06em]",
    divider: "h-px w-[138px] my-[12px]",
    gap: "gap-[28px]",
    descriptionShell: "w-[220px]",
  },
  partners: {
    shell: "w-[142px]",
    top: "text-[47px] leading-[0.84] tracking-[-0.06em]",
    bottom:
      "relative -top-[2px] text-[19px] leading-[0.94] tracking-[-0.04em]",
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
        <Icon
          size={20}
          strokeWidth={2.2}
          className="md:h-[22px] md:w-[22px]"
        />
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
  const mobileStyle =
    mobileMetricStyles[slide.id] ?? mobileMetricStyles.experience;

  const shellClassName = mobile ? mobileStyle.shell : slide.metricShellClassName;
  const topClassName = mobile ? mobileStyle.top : slide.metricTopClassName;
  const bottomClassName = mobile
    ? mobileStyle.bottom
    : slide.metricBottomClassName;
  const dividerClassName = mobile
    ? mobileStyle.divider
    : slide.metricDividerClassName;

  if (slide.metricVariant === "single") {
    return (
      <div className={cn("shrink-0 self-center overflow-hidden", shellClassName)}>
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
    <div className={cn("shrink-0 self-center overflow-hidden", shellClassName)}>
      <AnimatedMetricNumber
        value={slide.metricTop}
        className={cn(
          "block font-heading text-[var(--color-accent-1)]",
          topClassName,
        )}
      />

      <span
        className={cn("block bg-[var(--color-accent-3)]/85", dividerClassName)}
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

function HeroRotatingBanner({
  bannerIndex,
  className,
}: {
  bannerIndex: number;
  className?: string;
}) {
  const activeBanner = heroBanners[bannerIndex];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[28px] bg-[var(--color-accent-2)] md:rounded-[36px]",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={activeBanner.id}
          src={activeBanner.src}
          alt={activeBanner.alt}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.045, y: 8, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.985, y: -6, filter: "blur(6px)" }}
          transition={{
            duration: 0.95,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </AnimatePresence>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: [0.14, 0.24, 0.14], x: ["-3%", "3%", "-3%"] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
        style={{
          background:
            "linear-gradient(115deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.08) 42%, rgba(255,255,255,0.0) 72%)",
        }}
      />
    </div>
  );
}

function ProgressBars({ activeStage }: { activeStage: number }) {
  return (
    <div className="flex items-center justify-end gap-2">
      {[0, 1, 2].map((stage) => (
        <span
          key={stage}
          className={cn(
            "rounded-full transition-all duration-300",
            activeStage === stage
              ? "h-[4px] w-10 bg-[var(--color-accent-1)]"
              : "h-[4px] w-6 bg-[var(--color-accent-3)]/45",
          )}
        />
      ))}
    </div>
  );
}

function RnDCard({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between border-[6px] border-[var(--color-accent-2)] bg-[var(--color-bg)]",
        mobile
          ? "rounded-[28px] px-6 py-6"
          : "w-[300px] rounded-[32px] px-8 py-7",
      )}
    >
      <FlaskConical
        size={mobile ? 34 : 42}
        strokeWidth={2.1}
        className="text-[var(--color-accent-2)]"
      />

      <div className={cn(mobile ? "space-y-4" : "space-y-5")}>
        <div
          className={cn(
            "font-heading tracking-[-0.04em] text-[var(--color-accent-2)]",
            mobile
              ? "relative -top-[2px] text-[18px] leading-[1.08]"
              : "relative -top-[2px] text-[20px] leading-[1.06]",
          )}
        >
          <div>R&amp;D Центр</div>
          <div>и лаборатория</div>
        </div>

        <div
          className={cn(
            "text-[var(--color-text)]/82",
            mobile ? "text-[15px] leading-[1.3]" : "text-[16px] leading-[1.28]",
          )}
        >
          <div>улучшаем рецептуру</div>
          <div>и контролируем качество</div>
        </div>
      </div>
    </div>
  );
}

function FactoryPanel({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between bg-[var(--color-accent-2)] text-[var(--color-accent-2-foreground)]",
        mobile
          ? "rounded-[28px] px-6 py-6"
          : "w-[560px] rounded-[32px] px-16 py-7",
      )}
    >
      <div className="flex h-full flex-col justify-between pl-7">
        <div
          className={cn(
            "font-heading tracking-[-0.04em]",
            mobile ? "text-[18px] leading-[1]" : "text-[20px] leading-[1]",
          )}
        >
          комплекс на
        </div>

        <div className={cn("flex items-center", mobile ? "gap-3" : "gap-5")}>
          <Factory
            size={mobile ? 38 : 44}
            strokeWidth={2.1}
            className="shrink-0"
          />

          <div
            className={cn(
              "font-heading whitespace-nowrap tracking-[-0.06em]",
              mobile ? "text-[42px] leading-none" : "text-[56px] leading-none",
            )}
          >
            2300 м²
          </div>
        </div>

        <div
          className={cn(
            "opacity-90",
            mobile ? "text-[15px] leading-[1.3]" : "max-w-[560px] text-[17px] leading-[1.24]",
          )}
        >
          <div>современный заводской комплекс,</div>
          <div>оснащённый автоматизированными</div>
          <div>линиями последнего поколения</div>
        </div>
      </div>
    </div>
  );
}

function EcoPanel({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between bg-[var(--color-accent-1)] text-[var(--color-accent-1-foreground)]",
        mobile
          ? "rounded-[28px] px-6 py-6"
          : "w-full rounded-[32px] px-14 py-7",
      )}
    >
      <div className="flex h-full flex-col justify-between pl-10">
        <div
          className={cn(
            "font-heading tracking-[-0.04em]",
            mobile ? "text-[18px] leading-[1]" : "text-[20px] leading-[1]",
          )}
        >
          эко-стандарт
        </div>

        <div className={cn("flex items-center", mobile ? "gap-3" : "gap-5")}>
          <Leaf
            size={mobile ? 38 : 44}
            strokeWidth={2.1}
            className="shrink-0"
          />

          <div
            className={cn(
              "font-heading whitespace-nowrap tracking-[-0.06em]",
              mobile ? "text-[42px] leading-none" : "text-[56px] leading-none",
            )}
          >
            ИСО 14001
          </div>
        </div>

        <div
          className={cn(
            "opacity-95",
            mobile ? "text-[15px] leading-[1.3]" : "max-w-[460px] text-[17px] leading-[1.24]",
          )}
        >
          <div>соблюдаем стандарты эко-норм</div>
          <div>безопасность для человека</div>
          <div>и окружающей среды</div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [catalogStage, setCatalogStage] = useState(0);
  const [bannerIndex, setBannerIndex] = useState(0);
  const sceneRef = useRef<HTMLDivElement | null>(null);

  const activeSlide = useMemo(() => heroSlides[activeIndex], [activeIndex]);
  const mobileStyle =
    mobileMetricStyles[activeSlide.id] ?? mobileMetricStyles.experience;

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % heroBanners.length);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: [`start ${DESKTOP_STICKY_TOP}px`, `end ${DESKTOP_STICKY_TOP}px`],
  });

  const factoryReveal = useTransform(scrollYProgress, [0.02, 0.42], [0, 1], {
    clamp: true,
  });

  const ecoReveal = useTransform(scrollYProgress, [0.44, 0.78], [0, 1], {
    clamp: true,
  });

  const factoryClip = useTransform(
    factoryReveal,
    (v) => `inset(0 ${100.5 - v * 100.5}% 0 0 round 32px)`,
  );

  const ecoClip = useTransform(
    ecoReveal,
    (v) => `inset(0 ${100.5 - v * 100.5}% 0 0 round 32px)`,
  );

  const factoryX = useTransform(factoryReveal, [0, 1], [20, 0]);
  const ecoX = useTransform(ecoReveal, [0, 1], [20, 0]);

  const factoryOpacity = useTransform(factoryReveal, [0, 0.04, 1], [0, 0, 1]);
  const ecoOpacity = useTransform(ecoReveal, [0, 0.04, 1], [0, 0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.02) {
      setCatalogStage(0);
    } else if (latest < 0.44) {
      setCatalogStage(1);
    } else {
      setCatalogStage(2);
    }
  });

  function goPrev() {
    setActiveIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  }

  function goNext() {
    setActiveIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  }

  return (
    <Section className="pt-4 md:pt-0 xl:pt-0">
      <Container>
        <div className="xl:hidden">
          <div className="flex flex-col gap-4">
            <div className="flex min-h-[252px] flex-col justify-between">
              <h1 className="font-heading text-[28px] leading-[1] tracking-[-0.05em] text-[var(--color-text)]">
                Симбирские краски
              </h1>

              <div className="flex-1 pt-10 pb-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`mobile-${activeSlide.id}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className={cn("flex h-full items-center", mobileStyle.gap)}
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

            <HeroRotatingBanner bannerIndex={bannerIndex} className="aspect-[2/1]" />

            {/* Catalog-teaser section start */}
            <div className="flex flex-col gap-3">
              <RnDCard mobile />
              <FactoryPanel mobile />
              <EcoPanel mobile />
            </div>
          </div>
        </div>
      </Container>

      <div ref={sceneRef} className="hidden xl:block h-[3200px]">
        <div
          className="sticky"
          style={{
            top: DESKTOP_STICKY_TOP,
            height: `calc(100svh - ${DESKTOP_STICKY_TOP}px)`,
          }}
        >
          <Container className="pt-0">
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

              <HeroRotatingBanner bannerIndex={bannerIndex} className="h-[360px]" />
            </div>

            {/* Catalog-teaser section start */}
            <div className="mt-6">
              <div className="mb-5 flex items-center justify-end">
                <ProgressBars activeStage={catalogStage} />
              </div>

              <div className="relative h-[252px] w-full">
                <div className="absolute left-0 top-0 z-30 h-full">
                  <RnDCard />
                </div>

                <div
                  className="absolute top-0 z-10 h-full"
                  style={{
                    left: `${RIGHT_AREA_LEFT}px`,
                    right: 0,
                  }}
                >
                  <motion.div
                    className="absolute left-0 top-0 z-20 h-full"
                    style={{
                      width: FACTORY_CARD_WIDTH,
                      clipPath: factoryClip,
                      x: factoryX,
                      opacity: factoryOpacity,
                    }}
                  >
                    <FactoryPanel />
                  </motion.div>

                  <motion.div
                    className="absolute top-0 z-10 h-full"
                    style={{
                      left: `${ECO_CARD_LEFT}px`,
                      right: 0,
                      clipPath: ecoClip,
                      x: ecoX,
                      opacity: ecoOpacity,
                    }}
                  >
                    <EcoPanel />
                  </motion.div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </Section>
  );
}
