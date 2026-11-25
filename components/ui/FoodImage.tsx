import Image from "next/image";
import { getImage } from "@/data/images";
import { cn } from "@/lib/cn";

export function FoodImage({
  imageId,
  priority = false,
  sizes,
  fit = "cover",
  quality,
  className,
}: {
  imageId: string;
  priority?: boolean;
  sizes: string;
  fit?: "cover" | "contain";
  quality?: number;
  className?: string;
}) {
  const image = getImage(imageId);
  if (!image) return null;
  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      priority={priority}
      loading={priority ? "eager" : undefined}
      quality={quality}
      sizes={sizes}
      className={cn("rounded-[inherit]", fit === "cover" ? "object-cover" : "object-contain", className)}
    />
  );
}
