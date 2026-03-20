type AdminTextareaProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeightClassName?: string;
};

export function AdminTextarea({
  label,
  value,
  onChange,
  placeholder,
  minHeightClassName = "min-h-[140px]",
}: AdminTextareaProps) {
  return (
    <label className="block">
      <div className="mb-2 text-[13px] font-medium text-[var(--color-text-muted)]">
        {label}
      </div>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`${minHeightClassName} w-full rounded-[16px] bg-[var(--color-bg)] px-4 py-3 text-[14px] text-[var(--color-text)] outline-none transition duration-300 placeholder:text-[var(--color-text-muted)]`}
      />
    </label>
  );
}

