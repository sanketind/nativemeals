import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/lib/contact";
import { ButtonLink } from "@/components/ui/Button";

export function WhatsAppCTA({
  message,
  children,
  variant = "primary",
  className,
}: {
  message?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "inverse" | "ghost";
  className?: string;
}) {
  const href = whatsappHref(message);
  if (!href) return null;
  return (
    <ButtonLink href={href} variant={variant} className={className}>
      <MessageCircle aria-hidden="true" className="size-4" />
      {children}
    </ButtonLink>
  );
}
