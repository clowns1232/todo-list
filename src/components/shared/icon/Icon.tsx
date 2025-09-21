import Image from "next/image";
import clsx from "clsx";
import { IconName } from "./icons";

type IconProps = {
  name: IconName;
  size?: number | string; // 20 | "1em" | "1.25rem"
  alt?: string;
  className?: string;
  color?: string; // 지정 시 mask로 단색 렌더
  alignY?: number; // 세로 미세 보정(px)
};

export function Icon({
  name,
  size = 20,
  alt = "",
  className,
  color,
  alignY = 0,
}: IconProps) {
  const src = `/icons/${name}.png`;
  const cssSize = typeof size === "number" ? `${size}px` : size;

  if (color) {
    return (
      <span
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        className={clsx("block", className)}
        style={{
          width: cssSize,
          height: cssSize,
          lineHeight: 0,
          transform: `translateY(${alignY}px)`,
          backgroundColor: color,
          WebkitMaskImage: `url(${src})`,
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          WebkitMaskSize: "contain",
          maskImage: `url(${src})`,
          maskRepeat: "no-repeat",
          maskPosition: "center",
          maskSize: "contain",
        }}
        draggable={false}
      />
    );
  }

  if (typeof size === "number") {
    return (
      <Image
        src={src}
        alt={alt}
        aria-hidden={alt ? undefined : true}
        width={size}
        height={size}
        className={clsx("block", className)}
        style={{ transform: `translateY(${alignY}px)` }}
        draggable={false}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      className={clsx("block", className)}
      style={{
        width: cssSize,
        height: cssSize,
        transform: `translateY(${alignY}px)`,
      }}
      draggable={false}
    />
  );
}
