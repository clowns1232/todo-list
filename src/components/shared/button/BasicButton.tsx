"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";
import { Icon } from "@/components/shared/icon/Icon";
import { IconName } from "@/components/shared/icon/icons";

type FontSizeToken = "sm" | "base" | "lg" | "xl";
type FontWeightToken = "regular" | "bold" | "extrabold";
type RadiusProp = number | string | "pill";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  bg?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number | string;
  borderStyle?: "solid" | "dashed" | "dotted";
  radius?: RadiusProp;

  width?: "auto" | "full" | number | string;

  /** 아이콘 */
  iconName?: IconName;
  iconSize?: number | string;
  iconAlignY?: number;

  /** 폰트 (토큰/직접값 중 택1; 직접값이 우선) */
  fontSizeToken?: FontSizeToken;
  fontWeightToken?: FontWeightToken;
  fontSize?: number | string; // ex) 18 or "18px"
  fontWeightRaw?: number | string; // ex) 400 | 700 | "800"

  /** 타이포 세부 */
  letterSpacing?: number | string; // ex) 0 | "0.02em"
  lineHeight?: number | string; // ex) 1 | "18px"
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";

  /** 간격/크기 */
  gap?: number | string; // 아이콘-텍스트 간격
  height?: number | string; // ex) 48 | "25px"
  px?: number | string; // 좌우 패딩
  py?: number | string; // 상하 패딩 (보통 생략)

  /** 그림자 */
  shadowX?: number;
  shadowY?: number;
  shadowBlur?: number;
  shadowSpread?: number;
  shadowColor?: string;

  ariaLabel?: string; // 아이콘만일 때 접근성
};

export const BasicButton = forwardRef<HTMLButtonElement, Props>(
  (
    {
      className,
      children,

      bg = "bg-slate-100",
      textColor = "text-[var(--color-slate-900)]",
      borderColor = "border-[var(--color-slate-900)]",
      borderWidth = 2,
      borderStyle = "solid",
      radius = 28,

      width = "auto",

      iconName,
      iconSize,
      iconAlignY = -1,

      // 타이포
      fontSizeToken = "base",
      fontWeightToken = "bold",
      fontSize,
      fontWeightRaw,
      letterSpacing,
      lineHeight = 1,
      textTransform = "none",

      // 레이아웃
      gap = 8,
      height = 48, // h-12 기본
      px = 20,
      py,

      // 그림자
      shadowX = 10,
      shadowY = 12,
      shadowBlur = 0,
      shadowSpread = 0,
      shadowColor = "var(--color-slate-900)",

      ariaLabel,
      type = "button",
      ...rest
    },
    ref
  ) => {
    const base =
      "relative inline-flex items-center justify-center leading-[1] " +
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-slate-900)] " +
      "disabled:opacity-60 disabled:cursor-not-allowed";
    // 고정 높이/패딩 제거, 변수 기반 라운드
    const shape = "border rounded-[var(--btn-radius)]";

    const widthCls = width === "full" ? "w-full" : undefined;
    const styleWidth =
      typeof width === "number"
        ? { width: `${width}px` }
        : typeof width === "string" && width !== "auto" && width !== "full"
        ? { width }
        : undefined;

    const resolvedRadius =
      typeof radius === "number"
        ? `${radius}px`
        : radius === "pill"
        ? "9999px"
        : radius;

    const toCss = (v?: number | string) =>
      typeof v === "number" ? `${v}px` : v;

    return (
      <button
        ref={ref}
        type={type}
        aria-label={!children ? ariaLabel : undefined}
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
          // 크기/간격
          height: toCss(height),
          paddingLeft: toCss(px),
          paddingRight: toCss(px),
          ...(py !== undefined
            ? { paddingTop: toCss(py), paddingBottom: toCss(py) }
            : {}),
          columnGap: toCss(gap),

          // 보더/그림자
          borderWidth,
          borderStyle,
          boxShadow: `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}`,

          // 라운드
          ["--btn-radius" as any]: resolvedRadius,

          // 타이포 (직접값 우선)
          fontSize: fontSize ?? `var(--text-${fontSizeToken})`,
          fontWeight:
            fontWeightRaw ??
            (fontWeightToken === "extrabold"
              ? `var(--font-weight-extrabold)`
              : `var(--font-weight-${fontWeightToken})`),
          letterSpacing: toCss(letterSpacing) ?? undefined,
          lineHeight: toCss(lineHeight),
          textTransform,
        }}
        {...rest}
      >
        {iconName && (
          <Icon
            name={iconName}
            size={iconSize ?? "1em"}
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
