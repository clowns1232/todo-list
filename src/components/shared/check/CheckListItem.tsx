"use client";

import clsx from "clsx";
import Link from "next/link";
import { Icon } from "@/components/shared/icon/Icon";
import type { IconName } from "@/components/shared/icon/icons";

type Props = {
  label: string;

  /** 완료 상태 */
  checked?: boolean;

  /** 🔘 왼쪽 토글 버튼 클릭 (isCompleted 토글) */
  onToggle?: (next: boolean) => void;

  /** 📝 본문(라벨) 클릭: href 없을 때 호출 */
  onBodyClick?: () => void;

  /** 🧭 본문 클릭 시 이동할 경로. 지정 시 Link로 이동 */
  href?: string;

  disabled?: boolean;
  className?: string;

  /** 커스텀 너비 (px | %) — 미지정 시 w-full */
  width?: number | string;
};

export function CheckListItem({
  label,
  checked = false,
  onToggle,
  onBodyClick,
  href,
  disabled,
  className,
  width,
}: Props) {
  const styleWidth =
    width !== undefined
      ? typeof width === "number"
        ? `${width}px`
        : width
      : undefined;

  const containerClasses = clsx(
    "flex w-full items-center gap-3 px-4 rounded-[999px] border-2 box-border",
    checked ? "bg-[var(--color-violet-100)]" : "bg-[#FFF]",
    "border-[var(--color-slate-900)]",
    disabled && "opacity-60 cursor-not-allowed",
    className
  );

  const labelClasses = clsx(
    "flex-1 min-w-0 truncate text-left",
    "text-[var(--text-base)] font-[var(--font-weight-regular)]",
    "text-[var(--color-slate-800)]",
    checked && "line-through decoration-2"
  );

  return (
    <div
      className={containerClasses}
      style={{
        ...(styleWidth ? { width: styleWidth } : {}),
        height: 50,
      }}
    >
      {/* 🔘 토글 버튼(왼쪽 원형) */}
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onToggle?.(!checked)}
        className={clsx(
          "shrink-0 inline-flex items-center justify-center rounded-full",
          checked
            ? "bg-[var(--color-violet-600)] border-[var(--color-violet-600)]"
            : "bg-[#FEFCE8] border-[var(--color-slate-900)]"
        )}
        style={{ width: 32, height: 32, borderWidth: 2 }}
        aria-label={checked ? "완료 해제" : "완료로 표시"}
      >
        {checked && (
          <Icon name={"check" as IconName} size={18} color="#fff" alignY={-1} />
        )}
      </button>

      {/* 📝 본문(라벨) 클릭: href 우선, 없으면 onBodyClick */}
      {href ? (
        <Link href={href} className={labelClasses} title={label}>
          <span
            style={{
              textDecorationColor: "var(--color-slate-800)",
              lineHeight: "18px",
            }}
          >
            {label}
          </span>
        </Link>
      ) : (
        <button
          type="button"
          className={labelClasses}
          style={{
            textDecorationColor: "var(--color-slate-800)",
            lineHeight: "18px",
          }}
          onClick={() => !disabled && onBodyClick?.()}
          aria-label="항목 상세"
        >
          {label}
        </button>
      )}
    </div>
  );
}
