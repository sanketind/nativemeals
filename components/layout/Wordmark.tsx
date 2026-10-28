import { cn } from "@/lib/cn";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle
        cx="16"
        cy="11"
        r="4.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M16 4.2v1.6M8.2 7.2l1.2 1.2M23.8 7.2l-1.2 1.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M7 20.5c1.8 4.2 16.2 4.2 18 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M9.2 20.5h13.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Wordmark({
  className,
  tone = "olive",
}: {
  className?: string;
  tone?: "olive" | "cream";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <BrandMark
        className={cn(
          "size-9",
          tone === "cream" ? "text-cream" : "text-olive",
        )}
      />
      <span
        className={cn(
          "font-sans text-[1.15rem] font-extrabold leading-none tracking-[-0.03em] sm:text-[1.25rem]",
          tone === "cream" ? "text-cream" : "text-olive",
        )}
      >
        Native Meals
      </span>
    </span>
  );
}
