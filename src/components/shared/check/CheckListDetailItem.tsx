"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";
import { Icon } from "@/components/shared/icon/Icon";
import type { IconName } from "@/components/shared/icon/icons";

type Props = {
  label: string;
  checked?: boolean;

  /** ⛳️ 하위호환 토글 콜백 */
  onChange?: (next: boolean) => void;

  /** ✅ 토글 버튼 클릭 */
  onToggle?: (next: boolean) => void;

  /** ✅ 제목 입력 변경 */
  onLabelChange?: (value: string) => void;

  /** 제목 수정 가능 여부 */
  editable?: boolean;

  disabled?: boolean;
  className?: string;

  /** 인디케이터 지름(px) */
  indicatorSize?: number;
};

export function CheckListDetailItem({
  label,
  checked = false,
  onChange,
  onToggle,
  onLabelChange,
  editable = true,
  disabled,
  className,
  indicatorSize = 22,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  const handleToggle = () => {
    if (disabled) return;
    const next = !checked;
    onToggle?.(next);
    onChange?.(next);
  };

  // ✅ 실제 렌더링 폭 측정 → input width에 반영 (잘림 방지)
  useEffect(() => {
    const span = measureRef.current;
    const input = inputRef.current;
    if (!span || !input) return;

    span.textContent = label && label.length > 0 ? label : " "; // 빈 문자열일 때도 최소 폭 보장
    // 여유 버퍼(px): 커서 공간/약간의 패딩
    const buffer = 12;
    const nextWidth = Math.max(28, span.offsetWidth + buffer);
    input.style.width = `${nextWidth}px`;
  }, [label]);

  return (
    <div
      className={clsx(
        "w-full h-14 px-4 rounded-[999px] border-2 box-border",
        "flex items-center justify-center gap-3", // ✅ 버튼+인풋 묶음 중앙 정렬
        "border-[var(--color-slate-900)]",
        checked ? "bg-[var(--color-violet-200)]" : "bg-white",
        disabled && "opacity-60 cursor-not-allowed",
        className
      )}
    >
      {/* 🔘 토글 버튼 */}
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleToggle}
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
      </button>

      {/* ✏️ 제목 입력(버튼 옆, 가운데 정렬, 자동 너비) */}
      <input
        ref={inputRef}
        type="text"
        value={label}
        disabled={disabled || !editable}
        onChange={(e) => onLabelChange?.(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") (e.target as HTMLInputElement).blur();
        }}
        className={clsx(
          "bg-transparent outline-none text-center", // 가운데 정렬
          "text-[var(--text-xl)] font-[var(--font-weight-bold)]",
          "underline decoration-2 decoration-[var(--color-slate-900)]",
          "w-auto ml-[-10px]" // ✅ 요청: width auto + 왼쪽 -10px 마진
        )}
        // width는 effect에서 직접 주입
      />

      {/* 🔒 폭 측정용 숨김 span (input과 동일한 타이포 스타일) */}
      <span
        ref={measureRef}
        aria-hidden
        className={clsx(
          "invisible absolute whitespace-pre",
          "text-[var(--text-xl)] font-[var(--font-weight-bold)] underline decoration-2"
        )}
        style={{
          // input과 최대한 동일한 렌더링 컨텍스트
          position: "absolute",
          left: -99999,
          top: 0,
          textDecorationColor: "var(--color-slate-900)",
        }}
      />
    </div>
  );
}
