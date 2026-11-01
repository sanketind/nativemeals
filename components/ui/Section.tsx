import { cn } from "@/lib/cn";

const tones = {
  cream: "bg-cream",
  white: "bg-white",
  sage: "bg-sage/50",
  olive: "bg-olive",
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
        "not-first:-mt-8 not-first:rounded-t-[2rem] not-first:pt-20",
        "md:not-first:-mt-12 md:not-first:rounded-t-section md:not-first:pt-36",
        tones[tone],
        className,
      )}
    >
      {children}
    </section>
  );
}
