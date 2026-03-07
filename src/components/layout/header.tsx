import Link from "next/link";
import type { ReactNode } from "react";
import { Calculator } from "lucide-react";
import { Container } from "@/components/ui/container";
import { headerNav } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils/cn";
import { ThemeToggle } from "./theme-toggle";

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
        "inline-flex h-11 items-center justify-center rounded-[18px] bg-[var(--color-bg)] text-[var(--color-text)] transition duration-200 hover:opacity-90",
        className,
      )}
    >
      {icon ? icon : label}
    </a>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 py-4 md:py-5">
      <Container>
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0 rounded-[28px] bg-[var(--color-surface)] p-2">
            <div className="flex min-w-0 flex-col gap-2 md:flex-row md:items-center">
<Link
  href="/"
  aria-label="На главную"
  className={cn(
    "inline-flex h-12 shrink-0 items-center justify-start px-2",
    "md:min-w-[78px]",
  )}
>
  <img
    src="/lkz-site/images/common/logo.svg"
    alt="Логотип"
    className="logo-light relative -top-[2px] block h-auto max-h-[36px] w-auto max-w-[148px] object-contain"
  />

  <img
    src="/lkz-site/images/common/logo-dark.svg"
    alt="Логотип"
    className="logo-dark relative -top-[2px] hidden h-auto max-h-[36px] w-auto max-w-[148px] object-contain"
  />
</Link>

              <div className="hidden h-8 w-[2px] shrink-0 bg-white md:block" />

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
                          "inline-flex h-12 items-center justify-center rounded-[20px] px-4 text-[14px] font-medium text-[var(--color-text)] transition duration-200",
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
                className={cn(
                  "inline-flex h-11 items-center justify-center rounded-[18px] bg-[var(--color-bg)] px-5 text-center text-[14px] font-semibold text-[var(--color-text)] transition duration-200 hover:opacity-90 whitespace-nowrap",
                )}
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
  );
}
