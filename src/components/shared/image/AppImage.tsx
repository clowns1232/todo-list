import Image from "next/image";
import { IMAGE_ALTS, ImageName } from "./image";

type AppImageProps = {
  name: ImageName;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
};

export function AppImage({
  name,
  width,
  height,
  alt,
  className,
}: AppImageProps) {
  const commonProps = {
    src: `/images/${name}.png`,
    alt: alt ?? IMAGE_ALTS[name],
    className,
  };

  return width && height ? (
    <Image {...commonProps} width={width} height={height} />
  ) : (
    <Image {...commonProps} />
  );
}
