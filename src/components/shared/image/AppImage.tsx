import Image from "next/image";
import { IMAGE_ALTS, ImageName } from "./image";

type ObjectFit = "contain" | "cover" | "fill" | "none" | "scale-down";

type AppImageProps = {
  name: ImageName;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;

  /** 부모를 relative로 두고 꽉 채울 때 */
  fill?: boolean;
  sizes?: string; // 예: "(max-width:768px) 28px, 32px"
  priority?: boolean; // fold 상단 로고 등
  unoptimized?: boolean; // next/image 최적화 끄기
  draggable?: boolean; // 드래그 방지 등
  fit?: ObjectFit; // object-fit
};

const SIZE_PRESET: Partial<Record<ImageName, { w: number; h: number }>> = {
  // ✅ 라벨 기본 크기(피그마 스펙)
  "todo-label": { w: 101, h: 36 },
  "done-label": { w: 97, h: 36 },
  // 필요하면 로고/심볼도 추가 가능
  // logo: { w: 28, h: 28 },
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
  unoptimized,
  draggable,
  fit,
}: AppImageProps) {
  const preset = SIZE_PRESET[name];
  const w = width ?? preset?.w ?? 28; // ✅ 라벨은 자동 프리셋, 없으면 28
  const h = height ?? preset?.h ?? 28;

  const common = {
    src: `/images/${name}.png`,
    alt: alt ?? IMAGE_ALTS[name],
    className,
    priority,
    unoptimized,
    draggable,
    // object-fit은 style로
    style: fit ? ({ objectFit: fit } as React.CSSProperties) : undefined,
  };

  if (fill) {
    // 부모 컨테이너가 relative & 크기 지정되어 있어야 함
    return <Image {...common} fill sizes={sizes ?? "100vw"} />;
  }

  return <Image {...common} width={w} height={h} />;
}
