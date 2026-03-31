"use client";

import { useActionState, useEffect, useState } from "react";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { loginAction } from "@/app/adpanel/login/actions";

export function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const [state, formAction, isPending] = useActionState(loginAction, {
    error: null,
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (state.success) onSuccess?.();
  }, [state.success, onSuccess]);

  return (
    <form action={formAction} className="mt-8 space-y-3">
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Введите пароль"
          autoFocus
          autoComplete="current-password"
          className="h-14 w-full rounded-[18px] bg-[var(--color-bg)] px-5 pr-12 text-[15px] text-[var(--color-text)] outline-none transition duration-300 placeholder:text-[var(--color-text-muted)] focus:ring-2 focus:ring-[var(--color-accent-1)]/30"
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] transition hover:text-[var(--color-text)]"
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff size={17} strokeWidth={2.1} />
          ) : (
            <Eye size={17} strokeWidth={2.1} />
          )}
        </button>
      </div>

      {state.error ? (
        <div className="rounded-[14px] bg-red-500/[0.10] px-4 py-3 text-[13px] font-medium text-red-400">
          {state.error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-[18px] bg-[var(--color-accent-1)] text-[15px] font-semibold text-[var(--color-accent-1-foreground)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(30,222,123,0.22)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? (
          <Loader2 size={17} strokeWidth={2.2} className="animate-spin" />
        ) : (
          <Lock size={17} strokeWidth={2.2} />
        )}
        <span>{isPending ? "Проверяем..." : "Войти"}</span>
      </button>
    </form>
  );
}
