import Image from "next/image";
import { getImage } from "@/data/images";
import { cn } from "@/lib/cn";

export function FoodImage({
  imageId,
  priority = false,
  sizes,
  className,
}: {
  imageId: string;
  priority?: boolean;
  sizes: string;
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
      sizes={sizes}
      className={cn("object-cover", className)}
    />
  );
}
