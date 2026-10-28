import type { MealPlan } from "@/data/plans";
import { formatInr } from "@/lib/format";
import { DietBadge } from "@/components/ui/DietBadge";
import { FoodImage } from "@/components/ui/FoodImage";
import { ButtonLink } from "@/components/ui/Button";

export function MealPlanCard({ plan }: { plan: MealPlan }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-charcoal/10 bg-white">
      <div className="relative aspect-[16/10] bg-sage">
        <FoodImage
          imageId={plan.imageId}
          sizes="(min-width: 768px) 30vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-2xl text-charcoal">{plan.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/75">
          {plan.summary}
        </p>
        <div className="mt-6">
          {plan.price !== null ? (
            <p className="flex flex-wrap items-end gap-x-2 gap-y-1">
              <span className="font-serif text-4xl leading-none text-charcoal">
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
              <span className="font-serif text-3xl text-charcoal">
                Pricing on enquiry
              </span>
              <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.16em] text-charcoal/50">
                per meal
              </span>
            </p>
          )}
        </div>
        {plan.pricingTiers && plan.pricingTiers.length > 0 ? (
          <>
          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-charcoal/50">
            {plan.priceUnit === "day" ? "Per day, by duration" : "Per meal, by duration"}
          </p>
          <dl className="mt-3 grid grid-cols-2 gap-y-3 sm:grid-cols-4 sm:divide-x sm:divide-charcoal/10 sm:border-t sm:border-charcoal/10 sm:pt-4">
            {plan.pricingTiers.map((tier) => (
              <div key={tier.label} className="px-2 first:pl-0">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-charcoal/50">
                  {tier.label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-charcoal">
                  {tier.price !== null ? formatInr(tier.price) : "On enquiry"}
                </dd>
              </div>
            ))}
          </dl>
          </>
        ) : null}
        <p className="mt-4 text-sm leading-relaxed text-charcoal/70">
          {plan.frequency && plan.duration
            ? `${plan.frequency} · ${plan.duration}`
            : "Schedule confirmed when you enquire."}
        </p>
        {plan.dietOptions && plan.dietOptions.length > 0 ? (
          <div className="mt-3 flex gap-3">
            {plan.dietOptions.map((diet) => (
              <DietBadge key={diet} diet={diet} />
            ))}
          </div>
        ) : null}
        <div className="mt-6">
          <ButtonLink href={`/meal-plans?plan=${plan.id}#build`}>
            Build this plan
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
