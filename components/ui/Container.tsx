import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const setsWidth = className?.split(/\s+/).some((token) => token.startsWith("max-w-"));

  return (
    <div className={cn("mx-auto w-full px-5", !setsWidth && "max-w-7xl", className)}>
      {children}
    </div>
  );
}
