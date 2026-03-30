import { Package } from "lucide-react";
import { LoginForm } from "@/components/admin/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-4">
      <div className="w-full max-w-[420px]">
        <div className="rounded-[32px] bg-[var(--color-surface)] p-8">
          {/* Бренд */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-[var(--color-bg)]">
              <Package size={18} strokeWidth={2.1} className="text-[var(--color-text)]" />
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
                lkz
              </div>
              <div className="text-[15px] font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                admin panel
              </div>
            </div>
          </div>

          {/* Заголовок */}
          <div className="mt-8">
            <h1 className="font-heading text-[30px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)]">
              Вход
            </h1>
            <p className="mt-2 text-[14px] leading-[1.5] text-[var(--color-text-muted)]">
              Введите пароль для доступа к панели управления
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
