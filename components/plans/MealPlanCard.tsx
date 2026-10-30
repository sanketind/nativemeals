import type { MealPlan } from "@/data/plans";
import { formatInr } from "@/lib/format";
import { DietBadge } from "@/components/ui/DietBadge";
import { FoodImage } from "@/components/ui/FoodImage";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Caption, Heading, Price, Text } from "@/components/ui/Type";
import { cn } from "@/lib/cn";

export function MealPlanCard({
  plan,
  compact = false,
}: {
  plan: MealPlan;
  compact?: boolean;
}) {
  return (
    <Card as="article" padded={false} className="flex h-full flex-col overflow-hidden">
      <div className={cn("relative bg-sage", compact ? "aspect-[2/1]" : "aspect-[16/10]")}>
        <FoodImage
          imageId={plan.imageId}
          sizes="(min-width: 768px) 30vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <Heading as="h3" size="card">
          {plan.name}
        </Heading>
        <Text size="body" className="mt-2">
          {plan.summary}
        </Text>
        {!compact && plan.includes && plan.includes.length > 0 ? (
          <ul className="mt-4 space-y-1">
            {plan.includes.map((item) => (
              <Text key={item} as="li" size="body">
                {item}
              </Text>
            ))}
          </ul>
        ) : null}
        <div className={compact ? "mt-5 flex-1" : "mt-6"}>
          {plan.price !== null ? (
            <p className="flex flex-wrap items-end gap-x-2 gap-y-1">
              <Price size="lg">{formatInr(plan.price)}</Price>
              <Caption className="pb-1">
                {plan.priceUnit === "day" ? "per day" : "per meal"}
              </Caption>
              {plan.priceNote ? (
                <span className="w-full text-sm text-olive">{plan.priceNote}</span>
              ) : null}
            </p>
          ) : (
            <p>
              <Price>Pricing on enquiry</Price>
              <Caption className="mt-1 block">per meal</Caption>
            </p>
          )}
        </div>
        {!compact && plan.pricingTiers && plan.pricingTiers.length > 0 ? (
          <>
            <Caption className="mt-5">Lengths</Caption>
            <p className="mt-1 text-xs text-muted">Monday to Friday, or with Saturday</p>
            <dl className="mt-3 grid grid-cols-3 gap-3">
              {plan.pricingTiers.map((tier) => (
                <div key={tier.label} className="rounded-control bg-cream px-3 py-2">
                  <Caption as="dt">{tier.label}</Caption>
                  <dd className="mt-1 text-sm font-semibold text-olive">
                    {tier.weekdays === tier.withSaturday
                      ? tier.weekdays
                      : `${tier.weekdays} or ${tier.withSaturday}`}
                  </dd>
                </div>
              ))}
            </dl>
          </>
        ) : null}
        {compact ? null : (
          <>
            <Text size="body" className="mt-4">
              {plan.frequency && plan.duration
                ? `${plan.frequency} · ${plan.duration}`
                : "Schedule confirmed when you start."}
            </Text>
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
    </Card>
  );
}
