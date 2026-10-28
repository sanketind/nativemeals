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
    <section id={id} className={cn("py-16 md:py-24", tones[tone], className)}>
      {children}
    </section>
  );
}
