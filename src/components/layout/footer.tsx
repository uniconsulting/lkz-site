import type { ReactNode } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock3 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils/cn";

const companyLinks = [
  { label: "О компании", href: "#about" },
  { label: "Новости", href: "#news" },
  { label: "Контакты", href: "#contacts" },
  { label: "Сертификаты", href: "#certificates" },
] as const;

const catalogLinks = [
  { label: "Эмали", href: "#products" },
  { label: "Лаки", href: "#products" },
  { label: "ВД краска", href: "#products" },
  { label: "Грунт укрывной", href: "#products" },
  { label: "Антисептики", href: "#products" },
  { label: "Жидкое стекло", href: "#products" },
] as const;

const helpLinks = [
  { label: "Как заказать", href: "#how-to-buy" },
  { label: "Доставка и оплата", href: "#how-to-buy" },
  { label: "Частые вопросы", href: "#faq" },
  { label: "Политика конфиденциальности", href: "#privacy" },
  { label: "Пользовательское соглашение", href: "#terms" },
  { label: "Обработка персональных данных", href: "#personal-data" },
] as const;

function FooterList({
  title,
  items,
  linkClassName,
}: {
  title: string;
  items: readonly { label: string; href: string }[];
  linkClassName?: string;
}) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="font-heading text-[22px] leading-[1.02] tracking-[-0.03em]">
        {title}
      </h3>

      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className={cn(
                "text-[16px] leading-[1.35] transition duration-200",
                linkClassName,
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactRow({
  icon,
  children,
  href,
  interactive = false,
}: {
  icon: ReactNode;
  children: ReactNode;
  href?: string;
  interactive?: boolean;
}) {
  const content = (
    <span className="grid grid-cols-[24px_1fr] items-center gap-3">
      <span
        className={cn(
          "flex h-6 w-6 items-center justify-center transition duration-200",
          interactive
            ? "text-[var(--footer-shell-text-muted)] group-hover:text-[var(--color-accent-1)]"
            : "text-[var(--footer-shell-text-muted)]",
        )}
      >
        {icon}
      </span>

      <span
        className={cn(
          "transition duration-200",
          interactive && "group-hover:text-[var(--color-accent-1)]",
        )}
      >
        {children}
      </span>
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn(
          "group text-[16px] font-semibold leading-[1.35] text-[var(--footer-shell-text)] transition duration-200",
          interactive && "lg:hover:text-[var(--color-accent-1)]",
        )}
      >
        {content}
      </a>
    );
  }

  return (
    <div className="text-[16px] font-semibold leading-[1.35] text-[var(--footer-shell-text)]">
      {content}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 bg-[var(--footer-shell-bg)] text-[var(--footer-shell-text)]">
      <Container className="pt-10 md:pt-12 xl:pt-14">
        <div className="grid items-start gap-8 xl:grid-cols-[0.95fr_1.08fr_0.9fr]">
          <div className="flex flex-col self-start">
            <Link
              href="/"
              aria-label="На главную"
              className="inline-flex w-fit items-start"
            >
              <img
                src={"/images/common/logo-dark.svg"}
                alt="Логотип"
                className="footer-logo-on-dark block h-auto w-auto max-h-[136px] max-w-[270px] object-contain"
              />

              <img
                src={"/images/common/logo.svg"}
                alt="Логотип"
                className="footer-logo-on-light hidden h-auto w-auto max-h-[136px] max-w-[270px] object-contain"
              />
            </Link>

            <div className="mt-7 h-px bg-[var(--footer-shell-divider)]" />

            <div className="mt-7 flex flex-col gap-5">
              <ContactRow
                icon={<Phone size={22} />}
                href="tel:+79648589910"
                interactive
              >
                +7 (964) 858-99-10
              </ContactRow>

              <ContactRow
                icon={<Mail size={22} />}
                href="mailto:simkraski@bk.ru"
                interactive
              >
                simkraski@bk.ru
              </ContactRow>

              <ContactRow icon={<MapPin size={22} />}>
                г. Ульяновск, Московское шоссе, 42Е
              </ContactRow>

              <ContactRow icon={<Clock3 size={22} />}>
                Пн-Пт: 8:00 – 18:00
              </ContactRow>
            </div>
          </div>

          <div className="self-start rounded-[32px] bg-[var(--footer-main-card-bg)] p-8 text-[var(--footer-main-card-text)] xl:p-10">
            <div className="grid items-start gap-8 md:grid-cols-[1fr_auto_1fr]">
              <FooterList
                title="Компания"
                items={companyLinks}
                linkClassName="lg:hover:text-[var(--color-accent-1)]"
              />

              <div className="hidden h-full w-px bg-current/20 md:block" />

              <FooterList
                title="Каталог"
                items={catalogLinks}
                linkClassName="lg:hover:text-[var(--color-accent-1)]"
              />
            </div>
          </div>

          <div className="self-start rounded-[32px] bg-[var(--footer-accent-card-bg)] p-8 text-[var(--footer-accent-card-text)] xl:p-10">
            <FooterList
              title="Помощь и инфо"
              items={helpLinks}
              linkClassName="underline underline-offset-4"
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-[var(--footer-shell-divider)] py-6 lg:flex-row lg:items-center lg:justify-between">
          <a
            href="https://uniconsulting.github.io/uni.ai/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[15px] leading-[1.35] text-[var(--footer-shell-text-muted)] transition duration-200 lg:hover:text-[var(--color-accent-1)]"
          >
            <span className="flex h-[14px] w-[21px] shrink-0 items-center justify-center opacity-70">
<img
  src={"/images/common/logo-uni.svg"}
  alt="ЮНИ.ai"
  className="footer-uni-logo-on-light h-full w-full object-contain"
/>

<img
  src={"/images/common/logo-uni-dark.svg"}
  alt="ЮНИ.ai"
  className="footer-uni-logo-on-dark h-full w-full object-contain"
/>
            </span>

            <span>Сайт разработан командой ЮНИ.ai</span>
          </a>

          <p className="text-[15px] leading-[1.45] text-[var(--footer-shell-text-muted)] lg:text-right">
            <span className="block lg:inline">© 2015 – 2026 Симбирские краски</span>
            <span className="hidden lg:inline"> | </span>
            <span className="block lg:inline">
              ИНН: 7327093976 | ОГРН: 1207300001963
            </span>
            <span className="hidden lg:inline"> | </span>
            <span className="block lg:inline">Все права защищены.</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
