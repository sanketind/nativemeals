import { cn } from "@/lib/cn";
import { surface } from "@/components/ui/styles";

export function Note({
  tone = "solid",
  className,
  children,
}: {
  tone?: "solid" | "soft";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn(tone === "soft" ? surface.noteSoft : surface.note, className)}>
      {children}
    </div>
  );
}
