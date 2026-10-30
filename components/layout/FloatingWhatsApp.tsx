import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { whatsappHref } from "@/lib/contact";

export function FloatingWhatsApp() {
  const href = whatsappHref(siteConfig.messages.general);
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-6 z-30 inline-flex size-12 items-center justify-center rounded-full bg-whatsapp text-white shadow-float"
      aria-label="Chat with Native Meals on WhatsApp"
    >
      <MessageCircle aria-hidden="true" className="size-5" />
    </a>
  );
}
