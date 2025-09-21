// src/components/shared/gnb/GNB.tsx
"use client";

import React, { useId, useState } from "react";
import clsx from "clsx";
import Link from "next/link";

import { BasicButton } from "@/components/shared/button/BasicButton";
import { Icon } from "@/components/shared/icon/Icon";
import type { IconName } from "@/components/shared/icon/icons";

import { AppImage } from "@/components/shared/image/AppImage";
import type { ImageName } from "@/components/shared/image/image";

export type GnbLink = {
  label: string;
  href: string;
  iconName?: IconName;
};

export type GnbAction =
  | {
      type: "button";
      label: string;
      onClick?: () => void;
      iconName?: IconName;
    }
  | {
      type: "link";
      label: string;
      href: string;
      iconName?: IconName;
    };

type Brand =
  | ({ href?: string } & { text: string })
  | {
      href?: string;
      image: {
        name: ImageName;
        width?: number;
        height?: number;
        className?: string;
        priority?: boolean;
        alt?: string;
      };
    };

type Props = {
  brand?: Brand;

  links?: GnbLink[];
  actions?: GnbAction[];

  /** 태블릿(md)에서 노출할 링크 개수 (나머지는 lg~에서만 보임) */
  tabletVisibleLinks?: number;

  /** sticky + 컨테이너 최대폭 */
  sticky?: boolean;
  maxW?: "xl" | "2xl" | "3xl" | "full";

  /** 스타일 */
  bgClass?: string;
  borderClass?: string;
  textClass?: string;
  className?: string;
};

const maxWMap = {
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  "3xl": "max-w-[1600px]",
  full: "max-w-full",
} as const;

/** ----------------------------------------------------------------
 *  Component
 *  ---------------------------------------------------------------- */
export function GNB({
  brand = { text: "do it;", href: "/" },
  links = [],
  actions = [],
  tabletVisibleLinks = 3,
  sticky = true,
  maxW = "xl",
  bgClass = "bg-white",
  borderClass = "border-b border-[var(--color-slate-300)]",
  textClass = "text-[var(--color-slate-900)]",
  className,
}: Props) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  // 브랜드 렌더러
  const BrandNode = (() => {
    const href = "href" in brand && brand.href ? brand.href : "/";
    return (
      <Link href={href} className="flex items-center gap-2 shrink-0">
        {"image" in brand ? (
          <AppImage
            name={brand.image.name}
            width={brand.image.width ?? 28}
            height={brand.image.height ?? 28}
            className={brand.image.className}
            alt={brand.image.alt}
            priority={brand.image.priority}
          />
        ) : (
          <span className="text-[var(--text-lg)] font-[var(--font-weight-bold)] tracking-tight">
            {brand.text}
          </span>
        )}
      </Link>
    );
  })();

  return (
    <header
      className={clsx(
        sticky && "sticky top-0 z-50",
        bgClass,
        borderClass,
        textClass,
        className
      )}
      role="banner"
    >
      {/* Top bar */}
      <div
        className={clsx(
          "mx-auto px-4 md:px-6 lg:px-8",
          maxWMap[maxW],
          "h-14 md:h-16"
        )}
      >
        <div className="h-full flex items-center justify-between gap-3">
          {BrandNode}

          {/* Links (tablet/desktop) */}
          <nav
            className="hidden md:block"
            role="navigation"
            aria-label="Global"
          >
            <ul className="flex items-center gap-4 lg:gap-6">
              {links.map((l, idx) => {
                const hideOnMd = idx >= tabletVisibleLinks;
                return (
                  <li
                    key={l.href + l.label}
                    className={clsx(hideOnMd && "hidden lg:block")}
                  >
                    <Link
                      href={l.href}
                      className="inline-flex items-center gap-2 py-2 text-[var(--text-base)] font-[var(--font-weight-bold)] hover:opacity-80"
                    >
                      {l.iconName && (
                        <Icon
                          name={l.iconName}
                          size="1em"
                          color="currentColor"
                          alignY={-1}
                        />
                      )}
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Actions (desktop/tablet) + Mobile toggle */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              {actions.map((a, i) =>
                a.type === "button" ? (
                  <BasicButton
                    key={`act-${i}`}
                    gap={8}
                    fontSizeToken="base"
                    fontWeightToken="bold"
                    bg="bg-slate-100"
                    textColor="text-[var(--color-slate-900)]"
                    borderColor="border-[var(--color-slate-900)]"
                    shadowX={6}
                    shadowY={8}
                    shadowBlur={0}
                    shadowColor="var(--color-slate-900)"
                    iconName={a.iconName}
                    onClick={a.onClick}
                  >
                    {a.label}
                  </BasicButton>
                ) : (
                  <Link
                    key={`act-${i}`}
                    href={a.href}
                    className="inline-flex items-center gap-2 h-10 px-4 rounded-[999px] border border-[var(--color-slate-900)] bg-slate-100 font-[var(--font-weight-bold)] hover:opacity-90"
                  >
                    {a.iconName && (
                      <Icon
                        name={a.iconName}
                        size="1em"
                        color="currentColor"
                        alignY={-1}
                      />
                    )}
                    {a.label}
                  </Link>
                )
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--color-slate-900)] bg-[var(--color-slate-100)]"
              aria-controls={menuId}
              aria-expanded={open}
              aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="text-[var(--color-slate-900)] text-[12px] font-[var(--font-weight-bold)]">
                {open ? "닫기" : "메뉴"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel (same centered container as top bar) */}
      <div
        id={menuId}
        className={clsx(
          "md:hidden border-t border-[var(--color-slate-300)]",
          open ? "block" : "hidden"
        )}
      >
        <div className={clsx("mx-auto px-4 py-3 space-y-2", maxWMap[maxW])}>
          {links.map((l) => (
            <Link
              key={l.href + l.label}
              href={l.href}
              className="block w-full rounded-lg px-3 py-3 bg-white/70 hover:bg-white font-[var(--font-weight-bold)]"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}

          {actions.length > 0 && (
            <div className="h-px bg-[var(--color-slate-300)] my-2" />
          )}

          {actions.map((a, i) =>
            a.type === "button" ? (
              <button
                key={`m-${i}`}
                onClick={() => {
                  a.onClick?.();
                  setOpen(false);
                }}
                className="w-full rounded-lg px-3 py-3 bg-slate-100 border border-[var(--color-slate-900)] text-left font-[var(--font-weight-bold)]"
              >
                {a.label}
              </button>
            ) : (
              <Link
                key={`m-${i}`}
                href={a.href}
                className="block w-full rounded-lg px-3 py-3 bg-slate-100 border border-[var(--color-slate-900)] font-[var(--font-weight-bold)]"
                onClick={() => setOpen(false)}
              >
                {a.label}
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
}
