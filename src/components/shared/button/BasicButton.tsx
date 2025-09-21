"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";
import { Icon } from "@/components/shared/icon/Icon";
import { IconName } from "@/components/shared/icon/icons";

type FontSizeToken = "sm" | "base" | "lg" | "xl";
type FontWeightToken = "regular" | "bold" | "extrabold";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  bg?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number | string;
  borderStyle?: "solid" | "dashed" | "dotted";
  radius?: number | string;

  width?: "auto" | "full" | number | string;

  /** 아이콘을 props로 바로 쓰고 싶을 때 */
  iconName?: IconName;
  iconSize?: number;
  iconAlignY?: number; // ✅ PNG 여백 보정 (px), 기본 -1 권장

  /** 텍스트/폰트 */
  fontSizeToken?: FontSizeToken;
  fontWeightToken?: FontWeightToken;

  /** 간격 */
  gap?: number | string; // ✅ 아이콘-텍스트 간격 (기본 8px)

  /** 그림자 */
  shadowX?: number;
  shadowY?: number;
  shadowBlur?: number;
  shadowSpread?: number;
  shadowColor?: string;

  /** 아이콘만 있는 버튼 접근성용 */
  ariaLabel?: string;
};

export const BasicButton = forwardRef<HTMLButtonElement, Props>(
  (
    {
      className,
      children,

      bg = "bg-slate-100",
      textColor = "text-[var(--slate-900)]",
      borderColor = "border-[var(--slate-900)]",
      borderWidth = 2,
      borderStyle = "solid",
      radius = 28,

      width = "auto",

      iconName,
      iconAlignY = -1,

      fontSizeToken = "base",
      fontWeightToken = "bold",

      gap = 8,

      shadowX = 10,
      shadowY = 12,
      shadowBlur = 0,
      shadowSpread = 0,
      shadowColor = "var(--color-slate-900)",

      ariaLabel,

      type = "button", // ✅ 기본값 지정
      ...rest
    },
    ref
  ) => {
    const base =
      "relative inline-flex items-center justify-center leading-[1] " +
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-slate-900)] " +
      "disabled:opacity-60 disabled:cursor-not-allowed";
    const shape = "h-12 px-5 rounded-[28px] border"; // gap 고정 클래스 제거

    const widthCls = width === "full" ? "w-full" : undefined;
    const styleWidth =
      typeof width === "number"
        ? { width: `${width}px` }
        : typeof width === "string" && width !== "auto" && width !== "full"
        ? { width }
        : undefined;

    return (
      <button
        ref={ref}
        type={type}
        aria-label={!children ? ariaLabel : undefined} // 아이콘 전용일 때 필수
        className={clsx(
          base,
          shape,
          bg,
          textColor,
          borderColor,
          widthCls,
          className
        )}
        style={{
          ...styleWidth,
          columnGap: typeof gap === "number" ? `${gap}px` : gap, // ✅ 간격
          borderWidth,
          borderStyle,
          borderRadius: typeof radius === "number" ? `${radius}px` : radius,
          boxShadow: `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}`,
          fontSize: `var(--text-${fontSizeToken})`,
          fontWeight: `var(--font-weight-${fontWeightToken})`,
        }}
        {...rest}
      >
        {iconName && (
          <Icon
            name={iconName}
            size="1em"
            color="currentColor"
            alignY={iconAlignY}
          />
        )}
        {children}
      </button>
    );
  }
);
BasicButton.displayName = "BasicButton";
