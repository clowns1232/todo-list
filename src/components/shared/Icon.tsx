import Image from "next/image";
import { ICON_ALTS, IconName } from "./iconsType";

type IconProps = {
  name: IconName;
  size?: number; // 지정 안 하면 원본 크기
  alt?: string;
  className?: string;
};

export function Icon({ name, size, alt, className }: IconProps) {
  const commonProps = {
    src: `/icons/${name}.png`,
    alt: alt ?? ICON_ALTS[name],
    className,
  };

  return size ? (
    <>
      <Image {...commonProps} width={size} height={size} />
    </>
  ) : (
    <Image {...commonProps} />
  );
}
