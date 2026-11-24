import { cn } from "@/lib/cn";
import { surface } from "@/components/ui/styles";

export function PhotoFrame({
  shadow = false,
  className,
  children,
}: {
  shadow?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn(surface.photo, shadow && "shadow-sm", className)}>{children}</div>
  );
}

export function PhotoBadge({
  as: Tag = "p",
  tone = "stone",
  className,
  children,
}: {
  as?: "p" | "figcaption";
  tone?: "stone" | "white";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      className={cn(
        surface.badge,
        "absolute",
        tone === "stone" ? "bg-stone" : "bg-white/95 text-sm font-semibold text-ink",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
