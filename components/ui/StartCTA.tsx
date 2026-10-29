import { ButtonLink } from "@/components/ui/Button";

export function StartCTA({
  href = "/meal-plans#enquire",
  label = "Start your plan",
  variant = "primary",
  className,
}: {
  href?: string;
  label?: string;
  variant?: "primary" | "secondary" | "inverse" | "ghost";
  className?: string;
}) {
  return (
    <ButtonLink href={href} variant={variant} className={className}>
      {label}
    </ButtonLink>
  );
}
