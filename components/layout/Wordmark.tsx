import { cn } from "@/lib/cn";

export function BrandMark({
  className,
  tone = "olive",
}: {
  className?: string;
  tone?: "olive" | "cream";
}) {
  const bodyFill = tone === "cream" ? "#FFFDF4" : "#0C3F25";
  const domeFill = tone === "cream" ? "#B8DFC2" : "#197241";

  return (
    <svg viewBox="10 6 44 52" className={className} aria-hidden="true">
      <path
        fill={bodyFill}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.5 14.5a4.5 4.5 0 0 1 4.5-4.5h4a4.5 4.5 0 0 1 4.5 4.5v2.2c4.8.9 8.5 4.5 8.5 9.3v4.2a3.8 3.8 0 0 1-2.1 3.4 3.8 3.8 0 0 1 2.1 3.4V41c0 7.2-5.8 13-13 13h-4c-7.2 0-13-5.8-13-13v-4c0-1.5.8-2.8 2.1-3.4A3.8 3.8 0 0 1 17 30.2V26c0-4.8 3.7-8.4 8.5-9.3v-2.2Zm3.5 1.8q3-.3 6 0v-1.6a1.5 1.5 0 0 0-1.5-1.5h-3a1.5 1.5 0 0 0-1.5 1.5v1.6Z"
      />
      <path
        d="M20.5 25.5c0-3.8 5.1-6.3 11.5-6.3s11.5 2.5 11.5 6.3v2.5h-23v-2.5Z"
        fill={domeFill}
      />
      <rect x="21" y="31.9" width="22" height="3.4" rx="1.7" fill="#F9D82B" />
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
      <BrandMark tone={tone} className="size-9 shrink-0" />
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
