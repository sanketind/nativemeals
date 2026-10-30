import type { WeeklyMenuData } from "@/lib/weekly-menu";
import { DietBadge } from "@/components/ui/DietBadge";
import { SampleContentNote } from "@/components/ui/SampleContentNote";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Eyebrow, Heading, Text } from "@/components/ui/Type";
import { type as typeStyles } from "@/components/ui/styles";
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
    <Card
      as="article"
      padded={false}
      className={cn(
        "relative w-[85%] shrink-0 snap-start overflow-hidden md:w-auto",
        day.isToday && "ring-2 ring-olive md:col-span-2",
      )}
    >
      <header className="bg-sage/80 px-5 py-4">
        <div className="flex items-baseline justify-between gap-3">
          {day.isToday ? (
            <h3 className="font-sans text-2xl font-bold leading-snug text-olive md:text-3xl">
              {day.weekday}
            </h3>
          ) : (
            <Heading as="h3" size="card">
              {day.weekday}
            </Heading>
          )}
          <p className={cn(typeStyles.caption, "text-olive")}>{day.dateLabel}</p>
        </div>
        {day.isToday ? <Eyebrow className="mt-1">Today</Eyebrow> : null}
      </header>
      <div
        className={cn(
          "px-5",
          day.isToday
            ? "divide-y divide-dashed divide-charcoal/15 md:grid md:grid-cols-3 md:divide-x md:divide-y-0"
            : "divide-y divide-dashed divide-charcoal/15",
        )}
      >
        {day.meals.map((meal, index) => (
          <div key={`${meal.meal}-${meal.diet}-${index}`} className={cn("py-4", day.isToday && "md:px-4 md:first:pl-0 md:last:pr-0")}>
            <Eyebrow>{mealLabels[meal.meal]}</Eyebrow>
            <div className="mt-1.5 flex items-start justify-between gap-3">
              <p
                className={cn(
                  "leading-snug text-olive",
                  day.isToday ? "text-lg font-bold md:text-xl" : "font-semibold",
                )}
              >
                {meal.dishes}
              </p>
              <DietBadge diet={meal.diet} />
            </div>
            {meal.note && meal.note.toLowerCase() !== "sample" ? (
              <p className="mt-1 text-sm text-muted">{meal.note}</p>
            ) : null}
          </div>
        ))}
      </div>
    </Card>
  );
}

function EmptyWeek({ source }: { source: WeeklyMenuData["source"] }) {
  const message =
    source === "error"
      ? "We couldn't load this week's menu just now. Please check again shortly, or ask us directly."
      : "This week's menu will be posted soon.";
  return (
    <Card
      padded={false}
      bordered={false}
      className="mt-8 border border-dashed border-charcoal/20 px-6 py-10"
    >
      <Text className="max-w-xl">{message}</Text>
      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonLink href="/meal-plans#enquire">Start your plan</ButtonLink>
        <ButtonLink href="/contact" variant="secondary">
          Contact us
        </ButtonLink>
      </div>
    </Card>
  );
}

export function WeeklyMenu({ menu }: { menu: WeeklyMenuData }) {
  const days = menu.days;
  const support =
    menu.source === "sample"
      ? null
      : menu.rangeLabel
        ? `Posted for ${menu.rangeLabel}.`
        : "What the kitchen is cooking, updated through the week.";

  return (
    <div id="this-week" className="scroll-mt-24">
      <div className="max-w-2xl">
        <Eyebrow>This week</Eyebrow>
        <Heading className="mt-3">This week&apos;s menu.</Heading>
        {support ? <Text className="mt-4">{support}</Text> : null}
        {menu.source === "sample" ? (
          <SampleContentNote>Sample week. The live menu replaces this.</SampleContentNote>
        ) : null}
      </div>

      {days.length === 0 ? (
        <EmptyWeek source={menu.days.length === 0 ? menu.source : "empty"} />
      ) : (
        <>
          <div className="relative mt-6 flex max-w-full snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-2 md:mt-8 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible xl:grid-cols-3">
            {days.map((day) => (
              <DayCard key={day.date} day={day} />
            ))}
          </div>
          <p className={cn(typeStyles.hint, "mt-3 text-muted md:hidden")}>
            Swipe for the week
          </p>
        </>
      )}

      {menu.footnote ? (
        <p className="mt-4 text-sm text-muted">{menu.footnote}</p>
      ) : null}
    </div>
  );
}
