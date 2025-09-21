"use client";

import clsx from "clsx";
import { Icon } from "@/components/shared/icon/Icon";
import type { IconName } from "@/components/shared/icon/icons";

type Props = {
  label: string;
  checked?: boolean;
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  className?: string;

  /** 인디케이터 지름(px) */
  indicatorSize?: number;
};

export function CheckListDetailItem({
  label,
  checked = false,
  onChange,
  disabled,
  className,
  indicatorSize = 22,
}: Props) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange?.(!checked)}
      className={clsx(
        "w-full h-14 px-5 rounded-[999px] border-2 box-border",
        "inline-flex items-center justify-center gap-4",
        "text-[var(--text-xl)] font-[var(--font-weight-bold)] leading-[1]",
        checked
          ? "bg-[var(--color-violet-200)] text-[var(--color-slate-900)] border-[var(--color-slate-900)]"
          : "bg-white text-[var(--color-slate-900)] border-[var(--color-slate-900)]",
        disabled && "opacity-60 cursor-not-allowed",
        className
      )}
    >
      {/* 인디케이터 */}
      <span
        aria-hidden
        className={clsx(
          "shrink-0 inline-flex items-center justify-center rounded-full border-2",
          checked
            ? "bg-[var(--color-violet-600)] border-[var(--color-violet-600)]"
            : "bg-[color:var(--color-yellow-50,#FEFCE8)] border-[var(--color-slate-900)]"
        )}
        style={{ width: indicatorSize, height: indicatorSize }}
      >
        {checked && (
          <Icon name={"check" as IconName} size={14} color="#fff" alignY={-1} />
        )}
      </span>

      {/* 라벨: 항상 밑줄, 색만 상태별 */}
      <span
        className={clsx("truncate text-center underline")}
        style={{
          textDecorationColor: "var(--color-slate-900)",
        }}
      >
        {label}
      </span>
    </button>
  );
}
