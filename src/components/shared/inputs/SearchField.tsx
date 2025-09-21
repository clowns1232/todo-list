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
  /** 하드 섀도우 */
  shadowX?: number; // 기본 0
  shadowY?: number; // 기본 0
  shadowBlur?: number; // 기본 0
  shadowSpread?: number; // 기본 0
  shadowColor?: string; // 기본 var(--color-slate-900)
};

export function SearchField({
  value = "",
  onChange,
  placeholder = "할 일을 입력해주세요",
  className,
  size = "lg",
  autoFocus,
  readOnlyDisplay = false,

  shadowX = 0,
  shadowY = 0,
  shadowBlur = 0,
  shadowSpread = 0,
  shadowColor = "var(--color-slate-900)",
}: Props) {
  const id = useId();
  const h = size === "lg" ? "h-14" : "h-12";
  const isEmpty = value.trim().length === 0;

  const boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}`;

  if (readOnlyDisplay) {
    return (
      <div
        className={clsx(
          "w-full rounded-[999px] border-2 box-border px-5",
          h,
          // ✅ 배경 slate/100 & 보더 slate/900
          "bg-[var(--color-slate-100)] border-[var(--color-slate-900)]",
          "flex items-center",
          // 16 / Regular / 100%
          "text-[var(--text-base)] font-[var(--font-weight-regular)] leading-[1]",
          "text-[var(--color-slate-900)]",
          className
        )}
        style={{ boxShadow }}
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
        "bg-[var(--color-slate-100)] border-[var(--color-slate-900)]",
        "flex items-center",
        className
      )}
      style={{ boxShadow }}
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
          "text-left",
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
