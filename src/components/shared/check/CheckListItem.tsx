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

  /** ✅ 너비: px 또는 퍼센트 (예: 320, "320px", "80%") */
  width?: number | string;
};

export function CheckListItem({
  label,
  checked = false,
  onChange,
  disabled,
  className,
  width = "100%", // 기본은 꽉 차게
}: Props) {
  const styleWidth = typeof width === "number" ? `${width}px` : width;

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange?.(!checked)}
      className={clsx(
        // 컨테이너: 흰 배경 + 캡슐 + 보더 + 높이 50px
        "inline-flex items-center gap-3 px-4 rounded-[999px] border-2 box-border",
        "bg-white border-[var(--color-slate-900)] leading-[1]",
        disabled && "opacity-60 cursor-not-allowed",
        className
      )}
      style={{
        width: styleWidth, // ✅ 퍼센트/px 모두 지원
        height: 50, // ✅ 고정 높이 50px (border 포함)
      }}
    >
      {/* 인디케이터: 32px 원형 */}
      <span
        className={clsx(
          "shrink-0 inline-flex items-center justify-center rounded-full",
          checked
            ? "bg-[var(--color-violet-600)] border-[var(--color-violet-600)]"
            : "bg-[#FEFCE8] border-[var(--color-slate-900)]" // yellow/50
        )}
        style={{ width: 32, height: 32, borderWidth: 2 }}
        aria-hidden
      >
        {checked && (
          <Icon name={"check" as IconName} size={18} color="#fff" alignY={-1} />
        )}
      </span>

      {/* 라벨: 16/Regular, slate-800, 체크 시 취소선 */}
      <span
        className={clsx(
          "truncate",
          "text-[var(--text-base)] font-[var(--font-weight-regular)]",
          "text-[var(--color-slate-800)]",
          checked && "line-through decoration-2"
        )}
        style={{
          textDecorationColor: "var(--color-slate-800)",
          lineHeight: "18px",
        }}
      >
        {label}
      </span>
    </button>
  );
}
