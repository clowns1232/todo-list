"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/shared/icon/Icon";
import type { IconName } from "@/components/shared/icon/icons";

type Props = {
  label: string;
  checked?: boolean;

  /** 🔘 토글(왼쪽 원형) 클릭 */
  onToggle?: (next: boolean) => void;

  /** 📝 본문 클릭(루트 div 클릭) - href 없을 때 호출 */
  onBodyClick?: () => void;

  /** 🧭 본문 클릭 시 이동 경로. 지정되면 router.push(href) */
  href?: string;

  disabled?: boolean;
  className?: string;
  width?: number | string; // 미지정 시 w-full
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
  const router = useRouter();

  const styleWidth =
    width !== undefined
      ? typeof width === "number"
        ? `${width}px`
        : width
      : undefined;

  const containerClasses = clsx(
    "flex w-full items-center gap-3 px-4 rounded-[999px] border-2 box-border cursor-pointer",
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

  const handleBodyActivate = () => {
    if (disabled) return;
    if (href) router.push(href);
    else onBodyClick?.();
  };

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      onClick={handleBodyActivate}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleBodyActivate();
        }
      }}
      className={containerClasses}
      style={{ ...(styleWidth ? { width: styleWidth } : {}), height: 50 }}
    >
      {/* 🔘 토글 버튼(왼쪽 원형) — 루트 클릭과 분리: stopPropagation */}
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation(); // ✅ 부모 클릭 막기
          if (!disabled) onToggle?.(!checked);
        }}
        onKeyDown={(e) => e.stopPropagation()} // 키보드 전파 방지
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

      {/* 📝 라벨(본문) — 루트가 이미 클릭 가능하므로 단순 텍스트 */}
      <span
        className={labelClasses}
        style={{
          textDecorationColor: "var(--color-slate-800)",
          lineHeight: "18px",
        }}
      >
        {label}
      </span>
    </div>
  );
}
