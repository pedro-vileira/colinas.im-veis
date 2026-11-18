import Image from "next/image";
import type { PropertyImage } from "@/types/property";

type Props = {
  image: PropertyImage;
  ratio?: "45" | "32" | "169" | "11" | "34" | "21";
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function Photo({ image, ratio = "32", sizes, priority, className = "" }: Props) {
  return (
    <div className={`media ratio-${ratio} ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={image.src.endsWith(".svg")}
      />
    </div>
  );
}

export const cols = (m: number, t?: number, d?: number, start?: number) =>
  ({ "--m": m, "--t": t ?? m, "--d": d ?? t ?? m, ...(start ? { "--sd": start } : {}) }) as React.CSSProperties;
