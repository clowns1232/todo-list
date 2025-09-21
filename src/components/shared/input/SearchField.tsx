"use client";

import clsx from "clsx";
import { useId } from "react";

type Props = {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  className?: string;

  size?: "md" | "lg"; // md: h-12, lg: h-14
  autoFocus?: boolean;
  readOnlyDisplay?: boolean;

  /** 빈값일 때 가운데 정렬 */
  alignCenterWhenEmpty?: boolean;
};

export function SearchField({
  value = "",
  onChange,
  placeholder = "할 일을 입력해주세요",
  className,
  size = "lg",
  autoFocus,
  readOnlyDisplay = false,
  alignCenterWhenEmpty = true,
}: Props) {
  const id = useId();
  const h = size === "lg" ? "h-14" : "h-12";
  const isEmpty = value.trim().length === 0;

  if (readOnlyDisplay) {
    return (
      <div
        className={clsx(
          "w-full rounded-[999px] border-2 box-border px-5",
          h,
          "bg-white border-[var(--color-slate-900)]",
          "flex items-center",
          // 16 / Regular / 100%
          "text-[var(--text-base)] font-[var(--font-weight-regular)] leading-[1]",
          "text-[var(--color-slate-900)]",
          className
        )}
        title={value}
      >
        <span className="truncate">{value}</span>
      </div>
    );
  }

  return (
    <label
      htmlFor={id}
      className={clsx(
        "w-full rounded-[999px] border-2 box-border px-5",
        h,
        "bg-white border-[var(--color-slate-900)]",
        "flex items-center",
        className
      )}
    >
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={clsx(
          "w-full bg-transparent outline-none",
          "text-[var(--text-base)] font-[var(--font-weight-regular)] leading-[1]",
          "isEmpty text-left",
          "text-[var(--color-slate-900)]",
          "placeholder:text-[var(--color-slate-500)]"
        )}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
      />
    </label>
  );
}
