import Link from "next/link";
import { Calculator } from "lucide-react";
import { Container } from "@/components/ui/container";
import { headerNav } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils/cn";
import { ThemeToggle } from "./theme-toggle";
import Image from "next/image";
import Link from "next/link";

<Link
  href="/"
  className="inline-flex h-12 shrink-0 items-center rounded-[20px] bg-[var(--color-bg)] px-4 md:min-w-[168px]"
>
  <Image
    src="/images/common/logo.svg"
    alt="Логотип"
    width={120}
    height={28}
    className="h-auto w-auto max-h-[28px] object-contain"
    priority
  />
</Link>

function HeaderActionButton({
  href,
  label,
  icon,
  className,
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-[16px] bg-[var(--color-bg)] text-[var(--color-text)] transition duration-200 hover:opacity-90",
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
                className={cn(
                  "inline-flex h-12 shrink-0 items-center rounded-[20px] bg-[var(--color-bg)] px-4 text-[14px] font-semibold text-[var(--color-text)]",
                  "md:min-w-[168px]",
                )}
              >
                ЛОГО
              </Link>

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
                  "inline-flex h-11 items-center rounded-[16px] bg-[var(--color-bg)] px-4 text-[14px] font-semibold text-[var(--color-text)] transition duration-200 hover:opacity-90",
                  "min-w-[188px]",
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
