"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";
import { Icon } from "@/components/shared/icon/Icon";
import { IconName } from "@/components/shared/icon/icons";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** 지름 */
  size?: number | string; // 56 | "3rem"
  /** 배경색 (CSS 값) */
  bgColor?: string; // 예: "var(--color-slate-100)" | "#111827"
  /** 보더 */
  borderColor?: string; // 예: "var(--color-slate-900)"
  borderWidth?: number | string; // 2 | "1.5px"
  borderStyle?: "solid" | "dashed" | "dotted";
  /** 아이콘 */
  iconName: IconName;
  iconSize?: number | string; // 기본 "50%" (버튼 지름 대비)
  iconColor?: string; // 예: "#fff" | "currentColor"
  iconAlignY?: number; // PNG 여백 미세 보정(px)
  /** 접근성 */
  ariaLabel?: string;
};

export const CircleButton = forwardRef<HTMLButtonElement, Props>(
  (
    {
      className,
      size = 56,
      bgColor = "var(--color-slate-100)",
      borderColor = "var(--color-slate-900)",
      borderWidth = 2,
      borderStyle = "solid",

      iconName,
      iconSize = "50%",
      iconColor = "currentColor",
      iconAlignY = 0,

      type = "button",
      ariaLabel,
      ...rest
    },
    ref
  ) => {
    const cssSize = typeof size === "number" ? `${size}px` : size;

    return (
      <button
        ref={ref}
        type={type}
        aria-label={ariaLabel}
        className={clsx(
          "relative inline-flex items-center justify-center leading-[1]",
          "focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed box-border",
          className
        )}
        style={{
          width: cssSize,
          height: cssSize,
          borderRadius: "50%",
          backgroundColor: bgColor,
          borderColor,
          borderWidth,
          borderStyle,
        }}
        {...rest}
      >
        <Icon
          name={iconName}
          size={iconSize}
          color={iconColor}
          alignY={iconAlignY}
        />
      </button>
    );
  }
);

CircleButton.displayName = "CircleButton";
