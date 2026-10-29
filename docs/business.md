# Business

Native Meals is a healthy meal service for people working and living in Hinjewadi, Wakad and Baner, Pune. It sells breakfast, lunch and dinner on a plan. The homepage calls that offer a daily healthy meal subscription. The meals are cooked the morning they go out, and handed over at an office gate, a security desk, or a door. Monday to Friday is the pattern the site leads with. A six-day week is there for people who also want Saturday. The site takes an enquiry. It does not start or charge the subscription itself.

This note records what the site is allowed to say. If a fact is not here, and it is not in `data/site-config.ts`, do not add it to a page.

## Who it is for

People who already have a job, and do not want planning, shopping and cooking on top of it. Lunch is for the office. Dinner is for the PG or the flat after work. The full day is for someone who wants both, or breakfast as well.

The site speaks to offices in Hinjewadi, Wakad and Baner, including people who work from home some days and need the meal at the door instead of the gate.

## Where it serves

The full list lives in `data/site-config.ts`.

Neighbourhoods: Hinjewadi, Wakad and Baner.

Tech parks named on the site: Rajiv Gandhi Infotech Park, Embassy Tech Zone, Quadron Business Park and Blue Ridge.

Headlines use the same three: Hinjewadi, Wakad and Baner. A visitor still has to share a locality. The site does not check an address by itself. Someone confirms it before the first meal.

## What is sold

Three plans, all enquiry, none paid for on the website:

- Lunch Plan. A healthy lunch at the office gate, Monday to Friday.
- Dinner Plan. Dinner at the PG or the flat.
- All-day Plan. Breakfast, lunch and dinner, or any mix of the three.

Veg and non-veg lunch and dinner are different prices. Breakfast is one rate. The visitor chooses veg, non-veg, or either. Either is priced at the veg rate until they choose non-veg.

Durations are one meal, 3 days, Monday to Friday (5 days), 6 days, 2 weeks (12 days), a weekday month (22 days) and a 24-day month. The six-day lengths are there for Saturday. The rate per meal does not change with the length. The numbers in `data/plans.ts` are confirmed. How to change them is in the [README](../README.md#plans-and-prices).

## How a meal is cooked

These rules are published because the kitchen has confirmed they hold for every meal. They live in `kitchenRules` in `data/site-config.ts`. Add a rule only when it is true for the whole menu.

- No potatoes, not as filler and not on the side.
- No maida. Rotis are millet or multigrain flour.
- No plain dal. Every dal is mixed pulses or multigrains.
- No preservatives and no mayo. Sauces and chutneys are made in the kitchen.
- No non-stick and no aluminium. Pots and pans are steel.
- Meals travel in eco-friendly containers.

## What stays unsaid until it is real

Leave the env var empty. The site hides the fact rather than printing a placeholder.

- Phone, WhatsApp and email.
- FSSAI licence number.
- The kitchen's neighbourhood.
- The cutoff for skipping a meal. Breakfast, lunch and dinner windows are printed only when their env vars are set.
- Social profiles.
- A founder story. `founderNote` stays null until there is a real one.

Also do not invent ratings, testimonials, calorie or protein numbers, a nutritionist, a weight-loss claim, or a medical plan. The menu on the homepage is a sample until the Google Sheet is connected. If that sheet cannot be loaded, the page says so. It does not put the sample or an older week in its place. Delivery and collection details that are still open are confirmed with the person before they start. Pause, change and cancellation terms are explained then, not published as if they were settled.
