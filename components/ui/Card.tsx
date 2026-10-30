import { cn } from "@/lib/cn";
import { surface } from "@/components/ui/styles";

export function Card({
  as: Tag = "div",
  tone = "white",
  bordered = true,
  padded = true,
  className,
  children,
}: {
  as?: "div" | "article" | "li" | "aside";
  tone?: "white" | "cream" | "sage";
  bordered?: boolean;
  padded?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "rounded-card",
        bordered && "border border-charcoal/10",
        tone === "white" && "bg-white",
        tone === "cream" && "bg-cream",
        tone === "sage" && "bg-sage/70",
        padded && "p-5 md:p-6",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Panel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn(surface.panel, className)}>{children}</div>;
}
