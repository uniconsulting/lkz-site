"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Calculator, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { headerNav } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils/cn";
import { ThemeToggle } from "./theme-toggle";

const basePath = process.env.NODE_ENV === "production" ? "/lkz-site" : "";

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
    <a
      href={href}
      aria-label={label}
      title={label}
      className={cn(
        "interactive-lift-accent inline-flex h-11 items-center justify-center rounded-[18px] bg-[var(--color-bg)] text-[var(--color-text)] transition duration-200",
        className,
      )}
    >
      {icon ? icon : label}
    </a>
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

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <>
      <header className="sticky top-0 z-50 py-4 md:py-5">
        <Container>
          <div className="md:hidden">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 rounded-[28px] bg-[var(--color-surface)] p-2">
                <Link
                  href="/"
                  aria-label="На главную"
                  className="inline-flex h-11 items-center justify-start px-2"
                  onClick={closeMenu}
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
              </div>

              <div className="rounded-[28px] bg-[var(--color-surface)] p-2">
                <div className="flex items-center gap-2">
                  <HeaderActionButton
                    href="#calculator"
                    label="Открыть калькулятор"
                    icon={<Calculator size={18} />}
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
            <div className="min-w-0 rounded-[28px] bg-[var(--color-surface)] p-2">
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
                        <a
                          href={item.href}
                          className={cn(
                            "inline-flex h-11 items-center justify-center rounded-[20px] px-4 text-[14px] font-medium text-[var(--color-text)] transition duration-200",
                            "bg-transparent hover:bg-[var(--color-bg)]",
                            "focus:outline-none",
                          )}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>

            <div className="rounded-[28px] bg-[var(--color-surface)] p-2">
              <div className="flex items-center gap-2">
                <a
                  href="tel:+79648589910"
                  className="interactive-lift-accent inline-flex h-11 items-center justify-center rounded-[18px] bg-[var(--color-bg)] px-5 text-center text-[14px] font-semibold text-[var(--color-text)] whitespace-nowrap transition duration-200"
                >
                  +7 (964) 858-99-10
                </a>

                <HeaderActionButton
                  href="#calculator"
                  label="Открыть калькулятор"
                  icon={<Calculator size={18} />}
                  className="w-11"
                />

                <ThemeToggle />
              </div>
            </div>
          </div>
        </Container>
      </header>

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

          <nav aria-label="Мобильная навигация" className="mt-6">
            <ul className="flex flex-col gap-4">
              {headerNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className="font-heading text-[28px] leading-[0.98] tracking-[-0.03em] text-[var(--color-text)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

<div className="mt-8 h-px bg-white/80" />

<p className="mt-5 max-w-[290px] text-[14px] leading-[1.45] text-[var(--color-text-muted)]">
  Симбирские краски — собственное производство лакокрасочной продукции для
  надёжной и стабильной работы партнёров.
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
