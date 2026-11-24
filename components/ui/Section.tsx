import { cn } from "@/lib/cn";
import { surface } from "@/components/ui/styles";

const tones = {
  stone: "bg-stone",
  white: "bg-white",
  mist: "bg-mist",
  field: cn("bg-field", surface.brandPattern),
};

export function Section({
  id,
  tone = "stone",
  className,
  children,
}: {
  id?: string;
  tone?: keyof typeof tones;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "pb-12 md:pb-24",
        "first:pt-12 md:first:pt-24",
        // Positioned so the band paints over photos in the band above, which next/image positions.
        "not-first:relative not-first:-mt-8 not-first:rounded-t-[1.25rem] not-first:pt-20",
        "md:not-first:-mt-12 md:not-first:rounded-t-section md:not-first:pt-36",
        tones[tone],
        className,
      )}
    >
      {children}
    </section>
  );
}
