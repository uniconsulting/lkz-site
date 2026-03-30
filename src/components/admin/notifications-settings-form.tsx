"use client";

import { useState, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import {
  saveTelegramSettingsAction,
  saveMaxSettingsAction,
  testTelegramAction,
  testMaxAction,
} from "@/app/admin/settings/actions";

// ─── Types ───────────────────────────────────────────────────────────────────

type Status = "idle" | "saving" | "saved" | "testing" | "ok" | "error";
type FeedbackState = { status: Status; message?: string };

// ─── Step ────────────────────────────────────────────────────────────────────

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <div className="mt-[2px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-1)]/[0.14] text-[11px] font-bold text-[var(--color-accent-1)]">
        {n}
      </div>
      <div className="text-[13px] leading-[1.6] text-[var(--color-text-muted)]">
        {children}
      </div>
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-[6px] bg-[var(--color-bg)] px-1.5 py-0.5 font-mono text-[12px] text-[var(--color-text)]">
      {children}
    </code>
  );
}

// ─── Instructions accordion ───────────────────────────────────────────────────

function Instructions({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-[18px] bg-[var(--color-bg)] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-left transition duration-200 hover:opacity-80"
      >
        <span className="text-[13px] font-semibold text-[var(--color-text)]">
          {title}
        </span>
        <ChevronDown
          size={15}
          strokeWidth={2.2}
          className={cn(
            "shrink-0 text-[var(--color-text-muted)] transition duration-300",
            open ? "rotate-180" : "",
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-3 px-4 pb-4 pt-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── SettingInput ─────────────────────────────────────────────────────────────

function SettingInput({
  label,
  value,
  onChange,
  placeholder,
  description,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  description?: string;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 text-[13px] font-semibold text-[var(--color-text)]">
        {label}
      </div>
      {description ? (
        <div className="mb-2 text-[12px] leading-[1.4] text-[var(--color-text-muted)]">
          {description}
        </div>
      ) : null}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-[16px] bg-[var(--color-bg)] px-4 text-[14px] text-[var(--color-text)] outline-none transition duration-300 placeholder:text-[var(--color-text-muted)] focus:ring-2 focus:ring-[var(--color-accent-1)]/30"
      />
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
          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-bg)] px-3 py-1.5 text-[12px] font-semibold text-[var(--color-text-muted)]"
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
  const visible =
    state.status !== "idle" &&
    state.status !== "saving" &&
    state.status !== "testing" &&
    !!state.message;

  return (
    <AnimatePresence mode="wait">
      {visible ? (
        <motion.div
          key={state.message}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.22 }}
          className={cn(
            "text-[13px] font-medium",
            state.status === "error" ? "text-red-400" : "text-[var(--color-accent-1)]",
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
  name,
  instructions,
  tokenLabel,
  tokenDescription,
  tokenPlaceholder,
  idLabel,
  idDescription,
  idPlaceholder,
  token,
  chatId,
  onTokenChange,
  onChatIdChange,
  onSave,
  onTest,
  saveState,
  testState,
}: {
  name: string;
  instructions: React.ReactNode;
  tokenLabel: string;
  tokenDescription?: string;
  tokenPlaceholder: string;
  idLabel: string;
  idDescription?: string;
  idPlaceholder: string;
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
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[20px] font-semibold tracking-[-0.03em] text-[var(--color-text)]">
          {name}
        </h2>
        <StatusBadge active={isConfigured} />
      </div>

      <div className="my-4 h-px bg-[var(--color-bg)]" />

      {/* Instructions */}
      <Instructions title="Как получить данные для подключения?">
        {instructions}
      </Instructions>

      {/* Fields */}
      <div className="mt-4 space-y-4">
        <SettingInput
          label={tokenLabel}
          description={tokenDescription}
          value={token}
          onChange={onTokenChange}
          placeholder={tokenPlaceholder}
        />
        <SettingInput
          label={idLabel}
          description={idDescription}
          value={chatId}
          onChange={onChatIdChange}
          placeholder={idPlaceholder}
        />
      </div>

      {/* Feedback */}
      <div className="mt-4 min-h-[20px]">
        <FeedbackLine state={testState.status !== "idle" ? testState : saveState} />
      </div>

      {/* Actions */}
      <div className="mt-3 flex gap-3">
        <button
          type="button"
          onClick={onTest}
          disabled={isTesting || isSaving || !isConfigured}
          className={cn(
            "inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[16px] text-[14px] font-semibold transition duration-300 hover:-translate-y-[1px]",
            isTesting || isSaving || !isConfigured
              ? "cursor-not-allowed bg-[var(--color-bg)] text-[var(--color-text-muted)] opacity-50"
              : "bg-[var(--color-bg)] text-[var(--color-text)] hover:shadow-[0_8px_20px_rgba(43,47,51,0.06)]",
          )}
        >
          {isTesting ? (
            <Loader2 size={15} strokeWidth={2.2} className="animate-spin" />
          ) : (
            <Send size={15} strokeWidth={2.2} />
          )}
          <span>{isTesting ? "отправляем..." : "Проверить связь"}</span>
        </button>

        <button
          type="button"
          onClick={onSave}
          disabled={isSaving || isTesting}
          className={cn(
            "inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[16px] text-[14px] font-semibold transition duration-300 hover:-translate-y-[1px]",
            isSaving || isTesting
              ? "cursor-not-allowed opacity-70 bg-[var(--color-accent-1)] text-[var(--color-accent-1-foreground)]"
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
      setTgSaveState({ status: "saved", message: "✓ Настройки сохранены" });
      setTimeout(() => setTgSaveState({ status: "idle" }), 3000);
    });
  }

  function handleTgTest() {
    setTgTestState({ status: "testing" });
    setTgSaveState({ status: "idle" });
    startTgTest(async () => {
      const res = await testTelegramAction(tgToken, tgChatId);
      if (res.ok) {
        setTgTestState({ status: "ok", message: "✓ Тестовое сообщение доставлено — всё работает!" });
      } else {
        setTgTestState({ status: "error", message: `Ошибка: ${res.error ?? "не удалось отправить сообщение"}` });
      }
      setTimeout(() => setTgTestState({ status: "idle" }), 5000);
    });
  }

  function handleMaxSave() {
    setMaxSaveState({ status: "saving" });
    setMaxTestState({ status: "idle" });
    startMaxSave(async () => {
      await saveMaxSettingsAction(maxToken, maxChatId);
      setMaxSaveState({ status: "saved", message: "✓ Настройки сохранены" });
      setTimeout(() => setMaxSaveState({ status: "idle" }), 3000);
    });
  }

  function handleMaxTest() {
    setMaxTestState({ status: "testing" });
    setMaxSaveState({ status: "idle" });
    startMaxTest(async () => {
      const res = await testMaxAction(maxToken, maxChatId);
      if (res.ok) {
        setMaxTestState({ status: "ok", message: "✓ Тестовое сообщение доставлено — всё работает!" });
      } else {
        setMaxTestState({ status: "error", message: `Ошибка: ${res.error ?? "не удалось отправить сообщение"}` });
      }
      setTimeout(() => setMaxTestState({ status: "idle" }), 5000);
    });
  }

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {/* ── Telegram ── */}
      <ProviderCard
        name="Telegram"
        instructions={
          <>
            <Step n={1}>
              Откройте Telegram и в строке поиска найдите бота{" "}
              <Code>@BotFather</Code> — это официальный бот для создания ботов.
            </Step>
            <Step n={2}>
              Напишите ему команду <Code>/newbot</Code>. Он попросит придумать
              название бота (например «LKZ Уведомления») и его никнейм,
              который обязательно должен заканчиваться на{" "}
              <Code>bot</Code> (например <Code>lkz_notify_bot</Code>).
            </Step>
            <Step n={3}>
              После этого BotFather пришлёт вам <strong>токен</strong> —
              длинный набор символов вида{" "}
              <Code>7123456789:AAFxyz...</Code>. Скопируйте его и вставьте
              в поле «Токен бота» ниже.
            </Step>
            <Step n={4}>
              Откройте вашего нового бота и нажмите кнопку{" "}
              <strong>Запустить</strong> или напишите ему любое слово.
              Это нужно, чтобы бот мог вам писать.
            </Step>
            <Step n={5}>
              Теперь нужно узнать ваш <strong>Chat ID</strong>. Откройте
              в браузере ссылку:{" "}
              <Code>
                {"https://api.telegram.org/bot<ТОКЕН>/getUpdates"}
              </Code>{" "}
              (замените <Code>{"<ТОКЕН>"}</Code> на ваш токен). Найдите в
              ответе число рядом с <Code>"id"</Code> внутри блока{" "}
              <Code>"chat"</Code> — это и есть ваш Chat ID. Вставьте его
              в поле ниже.
            </Step>
            <Step n={6}>
              Нажмите <strong>Сохранить</strong>, затем{" "}
              <strong>Проверить связь</strong> — бот должен прислать вам
              тестовое сообщение.
            </Step>
          </>
        }
        tokenLabel="Токен бота"
        tokenDescription="Выдаётся ботом @BotFather после создания бота. Выглядит как длинная строка с цифрами и буквами."
        tokenPlaceholder="7123456789:AAFxyzABCdef..."
        idLabel="Chat ID"
        idDescription="Уникальный номер вашего чата. Получается через getUpdates после того, как вы написали боту."
        idPlaceholder="-1001234567890"
        token={tgToken}
        chatId={tgChatId}
        onTokenChange={setTgToken}
        onChatIdChange={setTgChatId}
        onSave={handleTgSave}
        onTest={handleTgTest}
        saveState={tgSaveState}
        testState={tgTestState}
      />

      {/* ── MAX Messenger ── */}
      <ProviderCard
        name="MAX Messenger"
        instructions={
          <>
            <Step n={1}>
              Откройте приложение <strong>MAX Messenger</strong> на телефоне
              или компьютере.
            </Step>
            <Step n={2}>
              В строке поиска найдите бота <Code>@MasterBot</Code> и
              напишите ему — он поможет создать вашего бота.
            </Step>
            <Step n={3}>
              Следуйте инструкциям <Code>@MasterBot</Code>: придумайте
              имя и никнейм для бота. После создания он пришлёт вам{" "}
              <strong>токен доступа</strong>. Скопируйте его и вставьте
              в поле «Токен бота» ниже.
            </Step>
            <Step n={4}>
              Чтобы узнать свой <strong>User ID</strong>, напишите{" "}
              <Code>@MasterBot</Code> команду <Code>/myid</Code> или
              спросите его «какой у меня ID». Он пришлёт ваш числовой
              идентификатор — вставьте его в поле ниже.
            </Step>
            <Step n={5}>
              Найдите вашего нового бота в поиске и напишите ему
              любое сообщение — это активирует бота для отправки вам
              уведомлений.
            </Step>
            <Step n={6}>
              Нажмите <strong>Сохранить</strong>, затем{" "}
              <strong>Проверить связь</strong> — бот должен прислать
              тестовое сообщение.
            </Step>
          </>
        }
        tokenLabel="Токен бота"
        tokenDescription="Выдаётся ботом @MasterBot после создания бота в приложении MAX."
        tokenPlaceholder="токен из @MasterBot"
        idLabel="Ваш User ID"
        idDescription="Числовой идентификатор вашего аккаунта в MAX. Узнайте командой /myid у @MasterBot."
        idPlaceholder="123456789"
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
