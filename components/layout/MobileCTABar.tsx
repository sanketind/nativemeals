import { lowestPlanPrice } from "@/data/plans";
import { formatInr } from "@/lib/format";
import { ButtonLink } from "@/components/ui/Button";

export function MobileCTABar() {
  const price = lowestPlanPrice();
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-charcoal/10 bg-cream/95 px-4 py-3 backdrop-blur md:hidden">
      <div className="flex items-center gap-3">
        {price !== null ? (
          <p className="min-w-24 leading-tight">
            <span className="block font-serif text-lg text-charcoal">
              From {formatInr(price)}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-charcoal/55">
              a meal
            </span>
          </p>
        ) : null}
        <ButtonLink href="/meal-plans" className="flex-1">
          Explore Plans
        </ButtonLink>
      </div>
    </div>
  );
}
