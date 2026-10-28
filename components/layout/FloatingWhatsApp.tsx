import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/lib/contact";

export function FloatingWhatsApp() {
  const href = whatsappHref(
    "Hello Native Meals, I would like to enquire about meals in Pune.",
  );
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-24 z-30 inline-flex size-12 items-center justify-center rounded-full bg-[#128C7E] text-white shadow-lg md:bottom-6"
      aria-label="Chat with Native Meals on WhatsApp"
    >
      <MessageCircle aria-hidden="true" className="size-5" />
    </a>
  );
}
