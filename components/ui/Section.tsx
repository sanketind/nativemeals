import { cn } from "@/lib/cn";
import { surface } from "@/components/ui/styles";

const tones = {
  cream: "bg-cream",
  white: "bg-white",
  oat: "bg-oat",
  olive: cn("bg-olive", surface.brandPattern),
};

export function Section({
  id,
  tone = "cream",
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
        "not-first:relative not-first:-mt-8 not-first:rounded-t-[2rem] not-first:pt-20",
        "md:not-first:-mt-12 md:not-first:rounded-t-section md:not-first:pt-36",
        tones[tone],
        className,
      )}
    >
      {children}
    </section>
  );
}
