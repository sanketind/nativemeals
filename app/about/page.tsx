import { siteConfig } from "@/data/site-config";
import { pageMeta } from "@/lib/page-meta";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

export const metadata = pageMeta(
  "Healthy meals in Pune",
  `Why Native Meals exists for people working in ${siteConfig.serviceAreaShort}, and the kitchen rules that hold for every meal.`,
);

const points = [
  {
    title: "Why it exists",
    body: `Planning, shopping and cooking every day is a lot on top of a job. Native Meals handles breakfast, lunch and dinner in ${siteConfig.serviceAreaShort}.`,
  },
  {
    title: "What we cook",
    body: "Vegetarian and non-vegetarian, planned across the week. Lunch and dinner cost more for non-veg. Breakfast is the same either way.",
  },
  {
    title: "Cooked that morning",
    body: "Handed over at your office gate, the security desk, or your door.",
  },
  {
    title: "The name",
    body: "Native is food you can come back to. Meals is breakfast, lunch and dinner, on a plan.",
  },
];

export default function AboutPage() {
  const kitchenLine = [
    siteConfig.kitchenLocality ? `The kitchen is in ${siteConfig.kitchenLocality}.` : null,
    siteConfig.fssai ? `FSSAI ${siteConfig.fssai}.` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="Healthy meals, for a working week."
        imageId="about"
      >
        Native Meals cooks for people in {siteConfig.serviceAreaShort} who want
        to eat well without planning every meal.
      </PageHeader>
      <Section tone="white">
        <Container>
          <ul className="grid gap-3 sm:grid-cols-2">
            {points.map((point) => (
              <li
                key={point.title}
                className="rounded-3xl border border-charcoal/10 bg-cream p-5 md:p-6"
              >
                <h2 className="font-sans text-[1.17rem] font-bold leading-[1.3] text-olive">
                  {point.title}
                </h2>
                <p className="mt-2 text-[0.94rem] font-normal leading-[1.65] text-muted">
                  {point.body}
                  {point.title === "Cooked that morning" && kitchenLine ? ` ${kitchenLine}` : ""}
                </p>
              </li>
            ))}
          </ul>
          {siteConfig.founderNote ? (
            <article className="mt-4 rounded-3xl bg-sage/70 p-6">
              <h2 className="font-sans text-[1.17rem] font-bold leading-[1.3] text-olive">
                {siteConfig.founderNote.heading}
              </h2>
              <p className="mt-2 text-[0.94rem] font-normal leading-[1.65] text-muted">
                {siteConfig.founderNote.body}
              </p>
            </article>
          ) : null}
        </Container>
      </Section>
      <FinalCTA
        tone="olive"
        title="See if a plan fits your week."
        body="Try one lunch first. Tell us your office, your home, and the day you want to start."
        primaryHref="/meal-plans#enquire"
      />
    </>
  );
}
