import type { WeeklyMenuData } from "@/lib/weekly-menu";
import { DietBadge } from "@/components/ui/DietBadge";
import { SampleContentNote } from "@/components/ui/SampleContentNote";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { cn } from "@/lib/cn";

const mealLabels = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
} as const;

function DayCard({
  day,
}: {
  day: WeeklyMenuData["days"][number];
}) {
  return (
    <article
      className={cn(
        "w-[85%] shrink-0 snap-start overflow-hidden rounded-3xl border border-charcoal/10 bg-white md:w-auto",
        day.isToday && "ring-2 ring-olive",
      )}
    >
      <header className="bg-sage/80 px-5 py-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-xl text-charcoal md:text-2xl">{day.weekday}</h3>
          <p className="font-mono text-[11px] tracking-[0.14em] text-olive">
            {day.dateLabel}
          </p>
        </div>
        {day.isToday ? (
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-terracotta-ink">
            Today
          </p>
        ) : null}
      </header>
      <div className="divide-y divide-dashed divide-charcoal/15 px-5">
        {day.meals.map((meal, index) => (
          <div key={`${meal.meal}-${meal.diet}-${index}`} className="py-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-terracotta-ink">
              {mealLabels[meal.meal]}
            </p>
            <div className="mt-1.5 flex items-start justify-between gap-3">
              <p className="font-medium leading-snug text-charcoal">{meal.dishes}</p>
              <DietBadge diet={meal.diet} />
            </div>
            {meal.note && meal.note.toLowerCase() !== "sample" ? (
              <p className="mt-1 text-sm text-charcoal/65">{meal.note}</p>
            ) : null}
          </div>
        ))}
      </div>
    </article>
  );
}

function EmptyWeek({ source }: { source: WeeklyMenuData["source"] }) {
  const message =
    source === "error"
      ? "We couldn't load this week's menu just now. Please check again shortly, or ask us directly."
      : "This week's menu will be posted soon.";
  return (
    <div className="mt-8 rounded-3xl border border-dashed border-charcoal/20 bg-white px-6 py-10">
      <p className="max-w-xl text-base leading-relaxed text-charcoal/75 md:text-lg">{message}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <WhatsAppCTA message="Hello Native Meals, could you share this week's menu?">
          Ask on WhatsApp
        </WhatsAppCTA>
        <ButtonLink href="/contact" variant="secondary">
          Contact us
        </ButtonLink>
      </div>
    </div>
  );
}

export function WeeklyMenu({ menu }: { menu: WeeklyMenuData }) {
  const days = menu.days;
  const support =
    menu.source === "sample"
      ? "A sample of the kind of week we cook, so you can see the style. The live menu for the current week replaces this."
      : menu.rangeLabel
        ? `Posted for ${menu.rangeLabel}.`
        : "What the kitchen is cooking, updated through the week.";

  return (
    <div id="this-week" className="scroll-mt-24">
      <div className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-terracotta-ink">
          This week
        </p>
        <h2 className="mt-3 font-serif text-3xl leading-tight text-charcoal md:text-5xl">
          This week&apos;s menu.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-charcoal/75 md:text-lg">{support}</p>
        {menu.source === "sample" ? (
          <SampleContentNote>
            Sample week, so you can judge the food. The live menu replaces this.
          </SampleContentNote>
        ) : null}
      </div>

      {days.length === 0 ? (
        <EmptyWeek source={menu.days.length === 0 ? menu.source : "empty"} />
      ) : (
        <>
          <div className="mt-6 flex max-w-full snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:mt-8 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible xl:grid-cols-3">
            {days.map((day) => (
              <DayCard key={day.date} day={day} />
            ))}
          </div>
          <p className="mt-3 font-mono text-xs tracking-wide text-charcoal/45 md:hidden">
            Swipe for the week
          </p>
        </>
      )}

      {menu.footnote ? (
        <p className="mt-4 text-sm text-charcoal/60">{menu.footnote}</p>
      ) : null}
    </div>
  );
}
