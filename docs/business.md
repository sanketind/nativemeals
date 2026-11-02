# Business

Native Meals is an everyday meal service for people working and living in Hinjewadi, Wakad and Baner, Pune. The line it leads with is Everyday food. Balanced better. It sells breakfast, lunch and dinner on a plan: everyday food, balanced and healthy. The meals are cooked fresh, and handed over at an office gate, a security desk, or a door. Cooked fresh does not name a time of day. The site does not say that every meal is cooked in the morning, and it does not say that dinner is cooked in the morning for the night. Monday to Friday is the pattern the site leads with. A six-day week is there for people who also want Saturday. The site takes an enquiry. It does not start or charge the subscription itself.

This note records what the site is allowed to say. If a fact is not here, and it is not in `data/site-config.ts`, do not add it to a page.

## Who it is for

People who already have a job, and do not want planning, shopping and cooking on top of it. Lunch is for the office. Dinner is for the PG or the flat after work. The full day is for someone who wants both, or breakfast as well.

The food is everyday food, balanced and healthy. A person should be able to eat it every day. The balance and the health come from the kitchen rules, not from calorie counts, protein targets, or a diet plan.

The site speaks to offices in Hinjewadi, Wakad and Baner, including people who work from home some days and need the meal at the door instead of the gate.

## Where it serves

The full list lives in `data/site-config.ts`.

Neighbourhoods: Hinjewadi, Wakad and Baner.

Tech parks named on the site: Rajiv Gandhi Infotech Park, Embassy Tech Zone, Quadron Business Park and Blue Ridge.

Headlines use the same three: Hinjewadi, Wakad and Baner. A visitor still has to share a locality. The site does not check an address by itself. Someone confirms it before the first meal.

## What is sold

Three plans, all enquiry, none paid for on the website:

- Lunch Plan. Everyday lunch at the office gate, Monday to Friday.
- Dinner Plan. Dinner at the PG or the flat.
- All-day Plan. Breakfast, lunch and dinner, or any mix of the three.

Veg and non-veg lunch and dinner are different prices. Breakfast is one rate. The visitor chooses veg, non-veg, or either. Either is priced at the veg rate until they choose non-veg.

Days are Monday to Friday, or Monday to Saturday. Lengths are 3 days, 2 weeks, or 4 weeks. Three days is 3 tiffins. Two weeks is 10 tiffins on Monday to Friday, or 12 with Saturday. Four weeks is 20, or 24 with Saturday. The rate per meal does not change with the length. The numbers in `data/plans.ts` are confirmed. How to change them is in the [README](../README.md#plans-and-prices).

## How a meal is cooked

These rules are published because the kitchen has confirmed they hold for every meal. They live in `kitchenRules` in `data/site-config.ts`. The homepage shows each rule as a title and one sentence. Add a rule only when it is true for the whole menu.

- No potatoes. Not as filler and not on the side. No dish on the menu uses them.
- No maida. Rotis are millet or multigrain flour, never refined flour.
- No preservatives. No mayo. Sauces and chutneys are made in our own kitchen.
- No non-stick. No aluminium. Every pot and pan is steel.

Meals travel to the gate or the door in an eco-friendly box. That sentence sits on the How it works step, not in the kitchen rules.

## What stays unsaid until it is real

Leave the env var empty. The site hides the fact rather than printing a placeholder.

- Phone, WhatsApp and email.
- FSSAI licence number.
- The kitchen's neighbourhood.
- The cutoff for skipping a meal. A meal skipped before that cutoff is carried to the end of the plan. The site prints that sentence only when the cutoff env var is set. Breakfast, lunch and dinner windows are printed only when their env vars are set.
- Social profiles.
- A founder story. `founderNote` stays null until there is a real one.

Also do not invent ratings, testimonials, calorie or protein numbers, a nutritionist, a weight-loss claim, or a medical plan. Do not tell the customer the food should not feel like a diet. Sound balanced and healthy. The tagline stays Everyday food. Balanced better. The menu on the homepage is a sample until the Google Sheet is connected. If that sheet cannot be loaded, the page says so. It does not put the sample or an older week in its place. Delivery and collection details that are still open are confirmed with the person before they start. A skipped meal is carried to the end of the plan once the cutoff is published. Pause and cancellation are still explained with the person before the first meal, not published as if they were settled.
