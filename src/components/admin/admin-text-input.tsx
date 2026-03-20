type AdminTextInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "number";
};

export function AdminTextInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: AdminTextInputProps) {
  return (
    <label className="block">
      <div className="mb-2 text-[13px] font-medium text-[var(--color-text-muted)]">
        {label}
      </div>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-[16px] bg-[var(--color-bg)] px-4 text-[14px] text-[var(--color-text)] outline-none transition duration-300 placeholder:text-[var(--color-text-muted)]"
      />
    </label>
  );
}

