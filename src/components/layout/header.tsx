"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { BarChart3, Menu, Search, X } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Container } from "@/components/ui/container";
import { headerNav } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils/cn";
import { ThemeToggle } from "./theme-toggle";

const basePath = process.env.NODE_ENV === "production" ? "/lkz-site" : "";
const HEADER_HIDE_START_SCROLL = 3200;

function HeaderActionButton({
  href,
  label,
  icon,
  className,
}: {
  href: string;
  label: string;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className={cn(
        "interactive-lift-accent inline-flex h-11 items-center justify-center rounded-[18px] bg-[var(--color-bg)] text-[var(--color-text)] transition duration-200",
        className,
      )}
    >
      {icon ? icon : label}
    </Link>
  );
}

function MobileMenuButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      className="inline-flex h-11 w-11 items-center justify-center rounded-[18px] bg-[var(--color-bg)] text-[var(--color-text)] transition duration-200"
    >
      {isOpen ? <X size={18} /> : <Menu size={18} />}
    </button>
  );
}

function DesktopSearch({
  isOpen,
  onToggle,
  onClose,
}: {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);

      const raf = requestAnimationFrame(() => {
        inputRef.current?.focus();
      });

      return () => {
        cancelAnimationFrame(raf);
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <motion.div
      ref={wrapperRef}
      className="relative h-11 shrink-0"
      initial={false}
      animate={{ width: isOpen ? 340 : 44 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 22,
        mass: 0.9,
      }}
    >
      <motion.button
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? "Закрыть поиск" : "Открыть поиск"}
        title={isOpen ? "Закрыть поиск" : "Открыть поиск"}
        className={cn(
          "absolute inset-0 z-[2] inline-flex h-11 w-11 items-center justify-center rounded-[18px] bg-[var(--color-bg)] text-[var(--color-text)]",
          isOpen ? "pointer-events-none" : "pointer-events-auto",
        )}
        initial={false}
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <Search size={18} />
      </motion.button>

      <motion.form
        role="search"
        onSubmit={(event) => event.preventDefault()}
        className={cn(
          "absolute inset-0 flex h-11 items-center overflow-hidden rounded-[18px] bg-[var(--color-bg)]",
          isOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        initial={false}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Напишите, что хотите найти"
          className="h-full w-full bg-transparent px-5 pr-3 text-[14px] text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-muted)]"
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть поиск"
          title="Закрыть поиск"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-[var(--color-text)]"
        >
          <Search size={18} />
        </button>
      </motion.form>
    </motion.div>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [surfaceProgress, setSurfaceProgress] = useState(0);

  const { scrollY } = useScroll();
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = previousOverflow || "";
    }

    return () => {
      document.body.style.overflow = previousOverflow || "";
    };
  }, [isMenuOpen]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollRef.current;
    const delta = latest - previous;

    const nextSurfaceProgress = Math.max(0, Math.min(latest / 260, 1));
    setSurfaceProgress(nextSurfaceProgress);

    if (latest <= HEADER_HIDE_START_SCROLL) {
      setIsHidden(false);
    } else {
      if (delta > 3) {
        setIsHidden(true);
      } else if (delta < -3) {
        setIsHidden(false);
      }
    }

    lastScrollRef.current = latest;
  });

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function closeSearch() {
    setIsSearchOpen(false);
  }

  const frameStyle = {
    background: `color-mix(in srgb, var(--color-surface) ${100 - surfaceProgress * 22}%, transparent)`,
    backdropFilter: `blur(${surfaceProgress * 7}px)`,
    WebkitBackdropFilter: `blur(${surfaceProgress * 7}px)`,
    boxShadow:
      surfaceProgress > 0.06
        ? `0 10px 30px rgba(20,24,28,${0.03 + surfaceProgress * 0.03})`
        : "none",
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={false}
        animate={{
          y: isHidden && !isMenuOpen ? -132 : 0,
          opacity: isHidden && !isMenuOpen ? 0 : 1,
        }}
        transition={{
          y: {
            type: "spring",
            stiffness: 68,
            damping: 20,
            mass: 1.05,
          },
          opacity: {
            duration: 0.42,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
      >
        <div className="py-4 md:py-5">
          <Container>
            <div className="md:hidden">
              <div className="flex items-center justify-between gap-3">
                <div
                  className="min-w-0 rounded-[28px] p-2 transition-[background,backdrop-filter,box-shadow] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={frameStyle}
                >
                  <Link
                    href="/"
                    aria-label="На главную"
                    className="inline-flex h-11 items-center justify-start px-2"
                    onClick={closeMenu}
                  >
                    <img
                      src={`${basePath}/images/common/logo.svg`}
                      alt="Логотип"
                      className="logo-light block h-[34px] w-auto object-contain md:relative md:-top-[2px] md:h-[36px]"
                    />

                    <img
                      src={`${basePath}/images/common/logo-dark.svg`}
                      alt="Логотип"
                      className="logo-dark hidden h-[34px] w-auto object-contain md:relative md:-top-[2px] md:h-[36px]"
                    />
                  </Link>
                </div>

                <div
                  className="rounded-[28px] p-2 transition-[background,backdrop-filter,box-shadow] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={frameStyle}
                >
                  <div className="flex items-center gap-2">
                    <HeaderActionButton
                      href="#calculator"
                      label="Открыть блок аналитики"
                      icon={<BarChart3 size={18} />}
                      className="w-11"
                    />

                    <ThemeToggle />

                    <MobileMenuButton
                      isOpen={isMenuOpen}
                      onClick={() => setIsMenuOpen((prev) => !prev)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:flex md:flex-col md:gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div
                className="min-w-0 rounded-[28px] p-2 transition-[background,backdrop-filter,box-shadow] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={frameStyle}
              >
                <div className="flex min-w-0 items-center gap-2">
                  <Link
                    href="/"
                    aria-label="На главную"
                    className={cn(
                      "inline-flex h-11 shrink-0 items-center justify-start px-2",
                      "min-w-[78px]",
                    )}
                  >
                    <img
                      src={`${basePath}/images/common/logo.svg`}
                      alt="Логотип"
                      className="logo-light relative -top-[2px] block h-auto max-h-[36px] w-auto max-w-[148px] object-contain"
                    />

                    <img
                      src={`${basePath}/images/common/logo-dark.svg`}
                      alt="Логотип"
                      className="logo-dark relative -top-[2px] hidden h-auto max-h-[36px] w-auto max-w-[148px] object-contain"
                    />
                  </Link>

                  <div className="h-8 w-[2px] shrink-0 bg-white" />

                  <nav
                    aria-label="Основная навигация"
                    className="min-w-0 overflow-x-auto"
                  >
                    <ul className="flex min-w-max items-center gap-2">
                      {headerNav.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className={cn(
                              "inline-flex h-11 items-center justify-center rounded-[20px] px-4 text-[14px] font-medium text-[var(--color-text)] transition duration-200",
                              "bg-transparent hover:bg-[var(--color-bg)]",
                              "focus:outline-none",
                            )}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>

              <div
                className="rounded-[28px] p-2 transition-[background,backdrop-filter,box-shadow] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={frameStyle}
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <a
                      href="tel:+79648589910"
                      className="inline-flex h-11 items-center justify-center rounded-[18px] bg-[var(--color-bg)] px-5 text-center text-[14px] font-semibold text-[var(--color-text)] whitespace-nowrap"
                    >
                      +7 (964) 858-99-10
                    </a>

                    <DesktopSearch
                      isOpen={isSearchOpen}
                      onToggle={() => setIsSearchOpen((prev) => !prev)}
                      onClose={closeSearch}
                    />
                  </div>

                  <HeaderActionButton
                    href="#calculator"
                    label="Открыть блок аналитики"
                    icon={<BarChart3 size={18} />}
                    className="w-11"
                  />

                  <ThemeToggle />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </motion.header>

      <div
        className={cn(
          "fixed inset-0 z-[60] md:hidden",
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!isMenuOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-[rgba(20,24,28,0.18)] backdrop-blur-md transition duration-300",
            isMenuOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={closeMenu}
        />

        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className={cn(
            "absolute inset-x-4 top-4 bottom-4 flex flex-col rounded-[32px] bg-[var(--color-surface)] p-5 transition duration-300",
            isMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0",
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              aria-label="На главную"
              className="inline-flex h-11 items-center justify-start px-2"
              onClick={closeMenu}
            >
              <img
                src={`${basePath}/images/common/logo.svg`}
                alt="Логотип"
                className="logo-light block h-[34px] w-auto object-contain md:relative md:-top-[2px] md:h-[36px]"
              />

              <img
                src={`${basePath}/images/common/logo-dark.svg`}
                alt="Логотип"
                className="logo-dark hidden h-[34px] w-auto object-contain md:relative md:-top-[2px] md:h-[36px]"
              />
            </Link>

            <button
              type="button"
              onClick={closeMenu}
              aria-label="Закрыть меню"
              className="inline-flex h-11 w-11 items-center justify-center rounded-[18px] bg-[var(--color-bg)] text-[var(--color-text)]"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-6 h-px bg-white/80" />

          <form
            role="search"
            onSubmit={(event) => event.preventDefault()}
            className="mt-6 flex h-12 items-center rounded-[20px] bg-[var(--color-bg)]"
          >
            <input
              type="text"
              placeholder="Напишите, что хотите найти"
              className="h-full w-full bg-transparent px-5 pr-3 text-[15px] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none"
            />

            <button
              type="submit"
              aria-label="Искать"
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center text-[var(--color-text)]"
            >
              <Search size={20} />
            </button>
          </form>

          <nav aria-label="Мобильная навигация" className="mt-6">
            <ul className="flex flex-col gap-4">
              {headerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="font-heading text-[28px] leading-[0.98] tracking-[-0.03em] text-[var(--color-text)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 h-px bg-white/80" />

          <p className="mt-5 max-w-[290px] text-[14px] leading-[1.45] text-[var(--color-text-muted)]">
            Симбирские краски — собственное производство лакокрасочной
            продукции для надёжной и стабильной работы партнёров.
          </p>

          <a
            href="tel:+79648589910"
            onClick={closeMenu}
            className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-[20px] bg-[var(--color-bg)] px-5 text-center text-[15px] font-semibold text-[var(--color-text)]"
          >
            +7 (964) 858-99-10
          </a>

          <div className="mt-auto">
            <div className="mb-5 h-px bg-white/80" />

            <div className="flex items-center justify-between gap-3 text-[12px] uppercase tracking-[0.06em] text-[var(--color-text-muted)]">
              <span>Симбирские краски</span>
              <span>г.Ульяновск</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
