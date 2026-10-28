import { pricing } from "@/data/plans";
import { siteConfig } from "@/data/site-config";
import { formatInr } from "@/lib/format";
import { whatsappHref } from "@/lib/contact";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";

export function MobileCTABar() {
  const lunch = pricing.perMeal.lunch["weekdays-month"];
  const message = siteConfig.messages.trial;
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-charcoal/10 bg-cream/95 px-4 py-3 backdrop-blur md:hidden">
      <div className="flex items-center gap-3">
        <p className="min-w-24 leading-tight">
          <span className="block font-serif text-lg text-charcoal">
            Lunch {formatInr(lunch)}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-charcoal/55">
            weekday month
          </span>
        </p>
        {whatsappHref(message) ? (
          <WhatsAppCTA message={message} className="flex-1">
            Start Monday
          </WhatsAppCTA>
        ) : (
          <ButtonLink href="/meal-plans#build" className="flex-1">
            Start Monday
          </ButtonLink>
        )}
      </div>
    </div>
  );
}
