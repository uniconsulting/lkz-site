import Image from "next/image";
import { LoginForm } from "@/components/admin/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-[var(--color-bg)]">
      {/* Левая часть — форма */}
      <div className="relative z-10 flex w-full flex-col justify-between px-10 py-10 lg:w-[480px] lg:shrink-0">
        {/* Лого */}
        <div className="flex items-center gap-3">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-accent-1)]">
              ЛКЗ
            </div>
            <div className="text-[16px] font-semibold tracking-[-0.03em] text-[var(--color-text)]">
              Административная панель
            </div>
          </div>
        </div>

        {/* Форма — центр */}
        <div className="mx-auto w-full max-w-[360px]">
          <h1 className="font-heading text-[38px] leading-[0.94] tracking-[-0.05em] text-[var(--color-text)]">
            Вход
          </h1>
          <p className="mt-3 text-[14px] leading-[1.5] text-[var(--color-text-muted)]">
            Введите пароль для доступа к панели управления
          </p>
          <div className="mt-8">
            <LoginForm />
          </div>
        </div>

        {/* Подвал */}
        <div className="text-[12px] text-[var(--color-text-muted)]">
          © {new Date().getFullYear()} ЛКЗ. Панель управления
        </div>
      </div>

      {/* Правая часть — фото */}
      <div className="relative hidden flex-1 overflow-hidden lg:block">
        <Image
          src="/images/sections/partnership/partnership-hero.webp"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="absolute bottom-10 left-10 right-10">
          <div className="text-[13px] font-medium uppercase tracking-[0.1em] text-[var(--color-accent-1)]">
            Лакокрасочный завод
          </div>
          <div className="mt-2 font-heading text-[28px] leading-[1.1] tracking-[-0.04em] text-white">
            13 лет производим<br />лакокрасочные материалы
          </div>
        </div>
      </div>
    </div>
  );
}
