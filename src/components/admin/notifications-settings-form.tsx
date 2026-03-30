"use client";

import { useState, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import {
  saveTelegramSettingsAction,
  saveMaxSettingsAction,
  testTelegramAction,
  testMaxAction,
} from "@/app/admin/settings/actions";

// ─── Logos ──────────────────────────────────────────────────────────────────

function TelegramLogo({ size = 44 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="tg-g" x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2AABEE" />
          <stop offset="1" stopColor="#229ED9" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="24" fill="url(#tg-g)" />
      <path
        d="M35.8 13.5L30.4 36.9c-.4 1.7-1.4 2.1-2.8 1.3l-7.7-5.7-3.7 3.6c-.4.4-.8.8-1.6.8l.6-8 15.6-14.1c.6-.6-.1-.9-1-.3L10.2 26.7l-7.6-2.4C1 23.8.98 22.8 2.6 22l31.1-12c1.4-.5 2.7.4 2.1 3.5z"
        fill="white"
      />
    </svg>
  );
}

function MaxLogo({ size = 44 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="max-g" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5B8EF0" />
          <stop offset="1" stopColor="#3B5EC8" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="13" fill="url(#max-g)" />
      {/* M shape */}
      <path
        d="M11 33V15l7.5 10.5L24 18l5.5 7.5L37 15v18"
        fill="none"
        stroke="white"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────

type Status = "idle" | "saving" | "saved" | "testing" | "ok" | "error";

type FeedbackState = {
  status: Status;
  message?: string;
};

// ─── SettingInput ─────────────────────────────────────────────────────────────

function SettingInput({
  label,
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-[13px] font-medium text-[var(--color-text-muted)]">
        {label}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-[16px] bg-[var(--color-bg)] px-4 text-[14px] text-[var(--color-text)] outline-none transition duration-300 placeholder:text-[var(--color-text-muted)] focus:ring-2 focus:ring-[var(--color-accent-1)]/30"
      />
      {hint ? (
        <div className="mt-1.5 pl-1 text-[12px] leading-[1.4] text-[var(--color-text-muted)]">
          {hint}
        </div>
      ) : null}
    </label>
  );
}

// ─── StatusBadge ─────────────────────────────────────────────────────────────

function StatusBadge({ active }: { active: boolean }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {active ? (
        <motion.div
          key="active"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent-1)]/[0.12] px-3 py-1.5 text-[12px] font-semibold text-[var(--color-accent-1)]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-1)]" />
          настроен
        </motion.div>
      ) : (
        <motion.div
          key="inactive"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-surface)] px-3 py-1.5 text-[12px] font-semibold text-[var(--color-text-muted)]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-text-muted)]" />
          не настроен
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── FeedbackLine ─────────────────────────────────────────────────────────────

function FeedbackLine({ state }: { state: FeedbackState }) {
  return (
    <AnimatePresence mode="wait">
      {state.status !== "idle" && state.status !== "saving" && state.status !== "testing" && state.message ? (
        <motion.div
          key={state.message}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.22 }}
          className={cn(
            "text-[13px] font-medium",
            state.status === "error"
              ? "text-red-400"
              : "text-[var(--color-accent-1)]",
          )}
        >
          {state.message}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

// ─── ProviderCard ─────────────────────────────────────────────────────────────

function ProviderCard({
  logo,
  name,
  description,
  tokenLabel,
  tokenPlaceholder,
  tokenHint,
  idLabel,
  idPlaceholder,
  idHint,
  token,
  chatId,
  onTokenChange,
  onChatIdChange,
  onSave,
  onTest,
  saveState,
  testState,
}: {
  logo: React.ReactNode;
  name: string;
  description: string;
  tokenLabel: string;
  tokenPlaceholder: string;
  tokenHint?: string;
  idLabel: string;
  idPlaceholder: string;
  idHint?: string;
  token: string;
  chatId: string;
  onTokenChange: (v: string) => void;
  onChatIdChange: (v: string) => void;
  onSave: () => void;
  onTest: () => void;
  saveState: FeedbackState;
  testState: FeedbackState;
}) {
  const isConfigured = token.trim().length > 0 && chatId.trim().length > 0;
  const isSaving = saveState.status === "saving";
  const isTesting = testState.status === "testing";

  return (
    <div className="flex flex-col rounded-[28px] bg-[var(--color-surface)] p-5 md:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="shrink-0">{logo}</div>
          <div>
            <div className="text-[18px] font-semibold tracking-[-0.03em] text-[var(--color-text)]">
              {name}
            </div>
            <div className="mt-0.5 text-[13px] text-[var(--color-text-muted)]">
              {description}
            </div>
          </div>
        </div>
        <StatusBadge active={isConfigured} />
      </div>

      {/* Divider */}
      <div className="my-5 h-px bg-[var(--color-bg)]" />

      {/* Fields */}
      <div className="space-y-4">
        <SettingInput
          label={tokenLabel}
          value={token}
          onChange={onTokenChange}
          placeholder={tokenPlaceholder}
          hint={tokenHint}
        />
        <SettingInput
          label={idLabel}
          value={chatId}
          onChange={onChatIdChange}
          placeholder={idPlaceholder}
          hint={idHint}
        />
      </div>

      {/* Feedback */}
      <div className="mt-4 min-h-[20px]">
        <FeedbackLine state={testState.status !== "idle" ? testState : saveState} />
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={onTest}
          disabled={isTesting || isSaving || !isConfigured}
          className={cn(
            "inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[16px] text-[14px] font-semibold transition duration-300 hover:-translate-y-[1px]",
            isTesting || isSaving || !isConfigured
              ? "cursor-not-allowed bg-[var(--color-bg)] text-[var(--color-text-muted)] opacity-60"
              : "bg-[var(--color-bg)] text-[var(--color-text)] hover:shadow-[0_8px_20px_rgba(43,47,51,0.06)]",
          )}
        >
          {isTesting ? (
            <Loader2 size={15} strokeWidth={2.2} className="animate-spin" />
          ) : (
            <Send size={15} strokeWidth={2.2} />
          )}
          <span>Тест</span>
        </button>

        <button
          type="button"
          onClick={onSave}
          disabled={isSaving || isTesting}
          className={cn(
            "inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[16px] text-[14px] font-semibold transition duration-300 hover:-translate-y-[1px]",
            isSaving || isTesting
              ? "cursor-not-allowed bg-[var(--color-accent-1)]/60 text-[var(--color-accent-1-foreground)] opacity-80"
              : "bg-[var(--color-accent-1)] text-[var(--color-accent-1-foreground)] hover:shadow-[0_10px_22px_rgba(30,222,123,0.22)]",
          )}
        >
          {isSaving ? (
            <Loader2 size={15} strokeWidth={2.2} className="animate-spin" />
          ) : saveState.status === "saved" ? (
            <Check size={15} strokeWidth={2.4} />
          ) : null}
          <span>{isSaving ? "сохраняем..." : "Сохранить"}</span>
        </button>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function NotificationsSettingsForm({
  initialTelegramToken,
  initialTelegramChatId,
  initialMaxToken,
  initialMaxChatId,
}: {
  initialTelegramToken: string;
  initialTelegramChatId: string;
  initialMaxToken: string;
  initialMaxChatId: string;
}) {
  const [tgToken, setTgToken] = useState(initialTelegramToken);
  const [tgChatId, setTgChatId] = useState(initialTelegramChatId);
  const [maxToken, setMaxToken] = useState(initialMaxToken);
  const [maxChatId, setMaxChatId] = useState(initialMaxChatId);

  const [tgSaveState, setTgSaveState] = useState<FeedbackState>({ status: "idle" });
  const [tgTestState, setTgTestState] = useState<FeedbackState>({ status: "idle" });
  const [maxSaveState, setMaxSaveState] = useState<FeedbackState>({ status: "idle" });
  const [maxTestState, setMaxTestState] = useState<FeedbackState>({ status: "idle" });

  const [, startTgSave] = useTransition();
  const [, startTgTest] = useTransition();
  const [, startMaxSave] = useTransition();
  const [, startMaxTest] = useTransition();

  function handleTgSave() {
    setTgSaveState({ status: "saving" });
    setTgTestState({ status: "idle" });
    startTgSave(async () => {
      await saveTelegramSettingsAction(tgToken, tgChatId);
      setTgSaveState({ status: "saved", message: "Настройки сохранены" });
      setTimeout(() => setTgSaveState({ status: "idle" }), 3000);
    });
  }

  function handleTgTest() {
    setTgTestState({ status: "testing" });
    setTgSaveState({ status: "idle" });
    startTgTest(async () => {
      const res = await testTelegramAction(tgToken, tgChatId);
      if (res.ok) {
        setTgTestState({ status: "ok", message: "✓ Сообщение доставлено" });
      } else {
        setTgTestState({ status: "error", message: res.error ?? "Ошибка" });
      }
      setTimeout(() => setTgTestState({ status: "idle" }), 4000);
    });
  }

  function handleMaxSave() {
    setMaxSaveState({ status: "saving" });
    setMaxTestState({ status: "idle" });
    startMaxSave(async () => {
      await saveMaxSettingsAction(maxToken, maxChatId);
      setMaxSaveState({ status: "saved", message: "Настройки сохранены" });
      setTimeout(() => setMaxSaveState({ status: "idle" }), 3000);
    });
  }

  function handleMaxTest() {
    setMaxTestState({ status: "testing" });
    setMaxSaveState({ status: "idle" });
    startMaxTest(async () => {
      const res = await testMaxAction(maxToken, maxChatId);
      if (res.ok) {
        setMaxTestState({ status: "ok", message: "✓ Сообщение доставлено" });
      } else {
        setMaxTestState({ status: "error", message: res.error ?? "Ошибка" });
      }
      setTimeout(() => setMaxTestState({ status: "idle" }), 4000);
    });
  }

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <ProviderCard
        logo={<TelegramLogo size={44} />}
        name="Telegram"
        description="Уведомления через Telegram-бот"
        tokenLabel="Bot Token"
        tokenPlaceholder="1234567890:ABCdefGHIjklMNOpqrSTUvwxYZ"
        tokenHint="Получить у @BotFather → /newbot"
        idLabel="Chat ID"
        idPlaceholder="-1001234567890 или @username"
        idHint="Напишите боту, затем /getUpdates для получения ID"
        token={tgToken}
        chatId={tgChatId}
        onTokenChange={setTgToken}
        onChatIdChange={setTgChatId}
        onSave={handleTgSave}
        onTest={handleTgTest}
        saveState={tgSaveState}
        testState={tgTestState}
      />

      <ProviderCard
        logo={<MaxLogo size={44} />}
        name="MAX Messenger"
        description="Уведомления через MAX-бот"
        tokenLabel="Access Token"
        tokenPlaceholder="токен бота из @MasterBot"
        tokenHint="В приложении MAX напишите @MasterBot → создать бота"
        idLabel="User ID"
        idPlaceholder="123456789"
        idHint="Ваш User ID в MAX — узнайте у @MasterBot"
        token={maxToken}
        chatId={maxChatId}
        onTokenChange={setMaxToken}
        onChatIdChange={setMaxChatId}
        onSave={handleMaxSave}
        onTest={handleMaxTest}
        saveState={maxSaveState}
        testState={maxTestState}
      />
    </div>
  );
}
