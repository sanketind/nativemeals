# Product

The website explains the service and takes an enquiry. It does not take payment, start a subscription, or check an address on its own.

## Pages

| Route | What the visitor does |
| --- | --- |
| `/` | Reads the offer, this week's menu, the plans, how it works, the kitchen rules, and where the service runs. |
| `/meal-plans` | Builds a plan, sees an estimate, and sends details. |
| `/about` | Reads why the service exists. |
| `/faqs` | Reads the practical answers. |
| `/contact` | Sends a question. |
| `/privacy`, `/terms` | How an enquiry is stored, and how a plan starts. |

There is no separate food page. This week's menu is the block on the homepage, at `#this-week`. The header and footer link there. An old `/our-food` address redirects to that block.

The homepage order is: hero, breakfast lunch and dinner photos, plan cards, this week's menu, how it works, kitchen rules, service area, then a closing call to action.

The hero headline is Daily Healthy Meal Subscription. The pill is Hinjewadi, Wakad and Baner, Pune. Under the headline: breakfast, lunch and dinner, cooked the same morning and handed over at the office gate or the door. The photo shows a second plate in the corner. One badge says Cooked the same morning. Another shows lunch from the confirmed veg rate. Each plan card shows its own price. The words name the offer. Starting one is still an enquiry. The page does not take payment.

## Enquiry

The conversion is a form, not a checkout.

1. On Meal Plans, the visitor picks meals, a duration, and veg, non-veg, or either. The page shows an estimate from `data/plans.ts`.
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

Durations are one meal, 3 days, Monday to Friday (5 days), 6 days, 2 weeks (12 days), a weekday month (22 days) and a 24-day month. The plan cards show one meal, Monday to Friday, the weekday month and the 24-day month. The builder lists every length.

A comparison range for a typical food-app lunch sits next to the Native Meals price. It is an illustration, not a quote from any app. It lives in `foodAppLunchRange` in `data/plans.ts`.

## This week's menu

Visitors see the current Monday-to-Sunday week in India time. A day with nothing posted does not appear. Until `WEEKLY_MENU_CSV_URL` is set, the week is labelled as a sample. When the sheet is connected, that label goes away.

The kitchen edits a Google Sheet. The operating steps, the columns, and the publish bookmark are in the [README](../README.md#weekly-menu-for-the-kitchen-team).

If the sheet cannot be loaded, or the link is not a valid web address, the page says so and offers a way to ask. It does not show the sample, and it does not keep the previous week. A sheet that loads with nothing in the current week says the menu will be posted soon. The page does not invent the week's dishes.

## What is still open

Pause, skip, and cancellation rules are explained when someone enquires, unless a real cutoff has been set in `NEXT_PUBLIC_SKIP_CUTOFF`. Fixed clock times for breakfast, lunch and dinner appear only when those env vars are set. Privacy and terms describe that enquiry. Update them if how an enquiry is stored, or how a plan is paid for, changes. The full launch list is in the [README](../README.md#launch-checklist).
