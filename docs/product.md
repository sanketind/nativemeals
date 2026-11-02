# Product

The website explains the service and takes an enquiry. It does not take payment, start a subscription, or check an address on its own.

## Pages

| Route | What the visitor does |
| --- | --- |
| `/` | Reads the offer, what the service provides, this week's menu, the plans, how it works, the kitchen rules, and where the service runs. |
| `/meal-plans` | Builds a plan, sees an estimate, and sends details. |
| `/about` | Reads why the service exists, what the kitchen holds to, the week a plan covers, and where it serves. |
| `/faqs` | Reads the practical answers. |
| `/contact` | Sends a question. |
| `/privacy`, `/terms` | How an enquiry is stored, and how a plan starts. |

There is no separate food page. This week's menu is the block on the homepage, at `#this-week`. The header and footer link there. An old `/our-food` address redirects to that block.

The story page is prose, then the kitchen rules from `siteConfig.kitchenRules`, then the three plans at their confirmed rates, then the neighbourhoods and tech parks. It sounds balanced and healthy. It does not comment on whether the food feels like a diet. It does not invent a founder story. `founderNote` stays hidden until it is real. Cooked fresh does not name a time of day.

The homepage order is: hero, breakfast lunch and dinner photos, what we provide, plan cards, this week's menu, how it works, kitchen rules, service area, then a closing call to action.

What we provide sits after the photos and before the plans. The four cards answer what a person weighs before they start: healthy ingredients (no potatoes, no maida, no preservatives, millet or multigrain rotis), a menu that changes, office days and home days, and that breakfast, lunch and dinner are cooked fresh, each for its own meal. The kitchen-rules section still explains each rule, including no non-stick.

The hero headline is Everyday food. Balanced better. The pill is Hinjewadi, Wakad and Baner, Pune. Under the headline: breakfast, lunch and dinner you can eat every day. Balanced and healthy, cooked fresh, and handed over at the office gate or the door. The four facts under the actions name the kitchen rules: no potatoes, no maida, no preservatives, and no non-stick. The photo shows a second plate in the corner. One badge says Cooked fresh. Another shows lunch from the confirmed veg rate. Each plan card shows its own price. The words name the offer. Starting one is still an enquiry. The page does not take payment.

## Enquiry

The conversion is a form, not a checkout.

1. On Meal Plans, the visitor picks meals, Monday to Friday or Monday to Saturday, a length, and veg, non-veg, or either. Lunch and dinner can use different days. The page shows an estimate from `data/plans.ts`.
2. They send a name, a 10-digit mobile number, a locality, office or home, the address, and the day they want the first tiffin. A hidden company field catches simple bots and those submissions are ignored.
3. The form posts to `/api/enquiry`. The server calculates the estimate again. A total typed in the browser is not trusted.
4. If `ENQUIRY_WEBHOOK_URL` is set, the site POSTs JSON there.
5. If it is not set, or the request fails, the visitor gets a WhatsApp link with the same details, and an email link when an address exists. Nothing is sent until they tap it.
6. If WhatsApp is not configured either, the form says it cannot take the message.

Contact and the service-area check use the same route, with a different `type`: `plan`, `contact`, or `serviceability`. A plan enquiry needs a name, a 10-digit Indian mobile number, a locality, office, home, or both, the address, and a start date. That date can be today or any day in the next six months. When they want both places, the form asks for the office and the home. Contact needs a name, a phone number and a message, and the locality can be left blank. The service-area check needs a phone number and a locality, and the name can be left blank.

Nothing is charged on the page. Price, address, and start date are confirmed before the first meal.

## Plans

Three cards: Lunch Plan, Dinner Plan, and All-day Plan. The builder can mix meals. A single meal is priced as one plate. The rate per meal is the same at every length. Lunch and dinner cost more for non-veg. Breakfast is one rate.

The prices live in `data/plans.ts` with `pricing.status` set to `"confirmed"`. Do not copy the price table into this document. The code is the source. How to change a number is in the [README](../README.md#plans-and-prices).

Choosing either is priced at the veg rate. When lunch or dinner is in the selection, the estimate notes the higher non-veg price. Breakfast stays one rate.

The builder asks which meals, then the days, then a length. Days are Monday to Friday, or Monday to Saturday. One control covers the selection, unless both lunch and dinner are on. Then each has its own days. Breakfast follows lunch, or dinner when lunch is off. Lengths are 3 days, 2 weeks, or 4 weeks. Three days is 3 of each selected meal. Two weeks is 10 of that meal on Monday to Friday, or 12 with Saturday. Four weeks is 20, or 24 with Saturday. Sunday stays off. A 28-day run of every calendar day is not a length. The plan cards show those three lengths with both counts. The total is each meal's rate times its own count.

## This week's menu

Visitors see the current Monday-to-Sunday week in India time. A day with nothing posted does not appear. Until `WEEKLY_MENU_CSV_URL` is set, the week is labelled as a sample. When the sheet is connected, that label goes away.

The kitchen edits a Google Sheet. The operating steps, the columns, and the publish bookmark are in the [README](../README.md#weekly-menu-for-the-kitchen-team).

If the sheet cannot be loaded, or the link is not a valid web address, the page says so and offers a way to ask. It does not show the sample, and it does not keep the previous week. A sheet that loads with nothing in the current week says the menu will be posted soon. The page does not invent the week's dishes.

## What is still open

A meal skipped before the cutoff is carried to the end of the plan. That sentence is published only when `NEXT_PUBLIC_SKIP_CUTOFF` is set. Pause and cancellation are still explained when someone enquires. Fixed clock times for breakfast, lunch and dinner appear only when those env vars are set. Privacy and terms describe that enquiry. Update them if how an enquiry is stored, or how a plan is paid for, changes. The full launch list is in the [README](../README.md#launch-checklist).
