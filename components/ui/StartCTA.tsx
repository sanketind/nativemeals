import { siteConfig } from "@/data/site-config";
import { whatsappHref } from "@/lib/contact";
import { ButtonLink } from "@/components/ui/Button";

export function StartCTA({
  message = siteConfig.messages.trial,
  fallbackHref = "/meal-plans#build",
  fallbackLabel = "Start Monday",
  whatsappLabel = "Start on WhatsApp",
  variant = "primary",
  className,
}: {
  message?: string;
  fallbackHref?: string;
  fallbackLabel?: string;
  whatsappLabel?: string;
  variant?: "primary" | "secondary" | "inverse" | "ghost";
  className?: string;
}) {
  const href = whatsappHref(message);
  if (href) {
    return (
      <ButtonLink href={href} variant={variant} className={className}>
        {whatsappLabel}
      </ButtonLink>
    );
  }
  return (
    <ButtonLink href={fallbackHref} variant={variant} className={className}>
      {fallbackLabel}
    </ButtonLink>
  );
}
