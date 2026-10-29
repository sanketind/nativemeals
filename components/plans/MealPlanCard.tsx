import type { MealPlan } from "@/data/plans";
import { formatInr } from "@/lib/format";
import { DietBadge } from "@/components/ui/DietBadge";
import { FoodImage } from "@/components/ui/FoodImage";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function MealPlanCard({
  plan,
  compact = false,
}: {
  plan: MealPlan;
  compact?: boolean;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-charcoal/10 bg-white">
      <div className={cn("relative bg-sage", compact ? "aspect-[2/1]" : "aspect-[16/10]")}>
        <FoodImage
          imageId={plan.imageId}
          sizes="(min-width: 768px) 30vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-sans text-[1.17rem] font-bold leading-[1.3] text-olive">{plan.name}</h3>
        <p className="mt-2 text-[0.94rem] font-normal leading-[1.65] text-muted">
          {plan.summary}
        </p>
        {!compact && plan.includes && plan.includes.length > 0 ? (
          <ul className="mt-4 space-y-1 text-[0.94rem] leading-[1.65] text-muted">
            {plan.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
        <div className={compact ? "mt-5 flex-1" : "mt-6"}>
          {plan.price !== null ? (
            <p className="flex flex-wrap items-end gap-x-2 gap-y-1">
              <span className="font-sans text-[clamp(1.75rem,3vw,2.55rem)] font-bold leading-none tracking-[-0.03em] text-olive">
                {formatInr(plan.price)}
              </span>
              <span className="pb-1 font-sans text-[0.72rem] font-bold uppercase tracking-[0.12em] text-muted">
                {plan.priceUnit === "day" ? "per day" : "per meal"}
              </span>
              {plan.priceNote ? (
                <span className="w-full text-sm text-olive">{plan.priceNote}</span>
              ) : null}
            </p>
          ) : (
            <p>
              <span className="font-sans text-[clamp(1.5rem,2.4vw,2rem)] font-bold leading-none tracking-[-0.03em] text-olive">
                Pricing on enquiry
              </span>
              <span className="mt-1 block font-sans text-[0.72rem] font-bold uppercase tracking-[0.12em] text-muted">
                per meal
              </span>
            </p>
          )}
        </div>
        {!compact && plan.pricingTiers && plan.pricingTiers.some((tier) => tier.onCard) ? (
          <>
          <p className="mt-5 font-sans text-[0.72rem] font-bold uppercase tracking-[0.12em] text-muted">
            {plan.priceUnit === "day" ? "Per day, by duration" : "Per meal, by duration"}
          </p>
          <dl className="mt-3 grid grid-cols-2 gap-3">
            {plan.pricingTiers.filter((tier) => tier.onCard).map((tier) => (
              <div key={tier.label} className="rounded-2xl bg-cream px-3 py-2">
                <dt className="font-sans text-[0.72rem] font-bold uppercase tracking-[0.12em] text-muted">
                  {tier.label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-olive">
                  {tier.price !== null ? formatInr(tier.price) : "On enquiry"}
                </dd>
                {tier.price !== null ? (
                  <p className="mt-0.5 text-xs text-muted">
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
            <p className="mt-4 text-[0.94rem] leading-[1.65] text-muted">
              {plan.frequency && plan.duration
                ? `${plan.frequency} · ${plan.duration}`
                : "Schedule confirmed when you start."}
            </p>
            {plan.deliveryTerms ? (
              <p className="mt-2 text-sm leading-relaxed text-muted">{plan.deliveryTerms}</p>
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
