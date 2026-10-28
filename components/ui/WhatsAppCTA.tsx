import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/lib/contact";
import { ButtonLink } from "@/components/ui/Button";

export function WhatsAppCTA({
  message,
  children,
  variant = "primary",
  size = "md",
  className,
}: {
  message?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "inverse" | "ghost";
  size?: "md" | "sm";
  className?: string;
}) {
  const href = whatsappHref(message);
  if (!href) return null;
  return (
    <ButtonLink href={href} variant={variant} size={size} className={className}>
      <MessageCircle aria-hidden="true" className="size-4" />
      {children}
    </ButtonLink>
  );
}
