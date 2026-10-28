import type { MealPlan } from "@/data/plans";
import { formatInr } from "@/lib/format";
import { DietBadge } from "@/components/ui/DietBadge";
import { FoodImage } from "@/components/ui/FoodImage";
import { ButtonLink } from "@/components/ui/Button";

export function MealPlanCard({
  plan,
  compact = false,
}: {
  plan: MealPlan;
  compact?: boolean;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-charcoal/10 bg-white">
      {compact ? null : (
        <div className="relative aspect-[16/10] bg-sage">
          <FoodImage
            imageId={plan.imageId}
            sizes="(min-width: 768px) 30vw, 100vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-serif text-xl text-charcoal md:text-2xl">{plan.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/75">
          {plan.summary}
        </p>
        {!compact && plan.includes && plan.includes.length > 0 ? (
          <ul className="mt-4 space-y-1 text-sm text-charcoal/75">
            {plan.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
        <div className={compact ? "mt-5 flex-1" : "mt-6"}>
          {plan.price !== null ? (
            <p className="flex flex-wrap items-end gap-x-2 gap-y-1">
              <span className="font-serif text-3xl leading-none text-charcoal md:text-4xl">
                {formatInr(plan.price)}
              </span>
              <span className="pb-1 font-mono text-[11px] uppercase tracking-[0.16em] text-charcoal/50">
                {plan.priceUnit === "day" ? "per day" : "per meal"}
              </span>
              {plan.priceNote ? (
                <span className="w-full text-sm text-olive">{plan.priceNote}</span>
              ) : null}
            </p>
          ) : (
            <p>
              <span className="font-serif text-2xl text-charcoal md:text-3xl">
                Pricing on enquiry
              </span>
              <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.16em] text-charcoal/50">
                per meal
              </span>
            </p>
          )}
        </div>
        {!compact && plan.pricingTiers && plan.pricingTiers.some((tier) => tier.onCard) ? (
          <>
          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-charcoal/50">
            {plan.priceUnit === "day" ? "Per day, by duration" : "Per meal, by duration"}
          </p>
          <dl className="mt-3 grid grid-cols-2 gap-3">
            {plan.pricingTiers.filter((tier) => tier.onCard).map((tier) => (
              <div key={tier.label} className="rounded-2xl bg-cream px-3 py-2">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-charcoal/50">
                  {tier.label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-charcoal">
                  {tier.price !== null ? formatInr(tier.price) : "On enquiry"}
                </dd>
                {tier.price !== null ? (
                  <p className="mt-0.5 text-xs text-charcoal/55">
                    {tier.days === 1
                      ? "try one meal"
                      : `${tier.days} days · ${formatInr(tier.price * tier.days)}`}
                  </p>
                ) : null}
              </div>
            ))}
          </dl>
          </>
        ) : null}
        {compact ? null : (
          <>
            <p className="mt-4 text-sm leading-relaxed text-charcoal/70">
              {plan.frequency && plan.duration
                ? `${plan.frequency} · ${plan.duration}`
                : "Schedule confirmed when you start."}
            </p>
            {plan.deliveryTerms ? (
              <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{plan.deliveryTerms}</p>
            ) : null}
            {plan.dietOptions && plan.dietOptions.length > 0 ? (
              <div className="mt-3 flex gap-3">
                {plan.dietOptions.map((diet) => (
                  <DietBadge key={diet} diet={diet} />
                ))}
              </div>
            ) : null}
          </>
        )}
        <div className="mt-6">
          <ButtonLink href={`/meal-plans?plan=${plan.id}#build`}>
            Start this plan
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
