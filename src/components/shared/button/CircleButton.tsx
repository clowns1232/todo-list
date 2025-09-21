"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";
import { Icon } from "@/components/shared/icon/Icon";
import { IconName } from "@/components/shared/icon/icons";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** 지름 */
  size?: number | string;
  /** 배경/보더 */
  bgColor?: string;
  borderColor?: string;
  borderWidth?: number | string;
  borderStyle?: "solid" | "dashed" | "dotted";
  /** 아이콘 */
  iconName: IconName;
  iconSize?: number | string;
  iconColor?: string;
  iconAlignY?: number;
  /** 접근성 */
  ariaLabel?: string;

  /** ✅ 위치 제어(필요 시 절대배치로) */
  absolute?: boolean;
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
};

const toCss = (v?: number | string) =>
  v === undefined ? undefined : typeof v === "number" ? `${v}px` : v;

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

      // ✅ 위치 관련
      absolute,
      top,
      right,
      bottom,
      left,

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
          "inline-flex items-center justify-center leading-[1] box-border focus:outline-none",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          absolute ? "absolute" : "relative",
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
          // ✅ 절대배치 좌표
          top: toCss(top),
          right: toCss(right),
          bottom: toCss(bottom),
          left: toCss(left),
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
