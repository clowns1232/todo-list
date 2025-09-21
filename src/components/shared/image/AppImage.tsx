import Image from "next/image";
import { IMAGE_ALTS, ImageName } from "./image";

type AppImageProps = {
  name: ImageName;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;

  /** 선택: 부모를 relative로 두고 꽉 채울 때 */
  fill?: boolean;
  sizes?: string; // 예: "(max-width:768px) 28px, 32px"
  priority?: boolean; // fold 상단 로고 등
};

export function AppImage({
  name,
  width,
  height,
  alt,
  className,
  fill = false,
  sizes,
  priority = false,
}: AppImageProps) {
  const common = {
    src: `/images/${name}.png`,
    alt: alt ?? IMAGE_ALTS[name],
    className,
    priority,
  };

  if (fill) {
    // 부모가 relative/정해진 크기여야 함
    return <Image {...common} fill sizes={sizes} />;
  }

  // width/height가 없으면 기본값(로고에 적당한 값)
  const w = width ?? 28;
  const h = height ?? 28;
  return <Image {...common} width={w} height={h} />;
}
