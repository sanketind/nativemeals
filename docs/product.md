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
| `/privacy`, `/terms` | Draft legal pages. They are `noindex`. |

There is no separate food page. This week's menu is the block on the homepage, at `#this-week`. The header and footer link there. An old `/our-food` address redirects to that block.

The homepage order is: hero, promises, plan cards, this week's menu, how it works, kitchen rules, service area, then a closing call to action.

The hero headline is Daily Healthy Meal Subscription. The pill is Monday to Friday · Pune. Under the headline: breakfast, lunch and dinner, cooked the same morning and handed over at the office gate or the door. The photo badge says Cooked the same morning. The price line is one lunch, then the Monday to Friday month rate. The words name the offer. Starting one is still an enquiry. The page does not take payment.

## Enquiry

The conversion is a form, not a checkout.

1. On Meal Plans, the visitor picks meals, a duration, and veg, non-veg, or either. The page shows an estimate from `data/plans.ts`.
2. They send a name, a 10-digit mobile number, and a locality. A hidden company field catches simple bots and those submissions are ignored.
3. The form posts to `/api/enquiry`. The server calculates the estimate again. A total typed in the browser is not trusted.
4. If `ENQUIRY_WEBHOOK_URL` is set, the site POSTs JSON there.
5. If it is not set, or the request fails, the visitor gets a WhatsApp link with the same details, and an email link when an address exists. Nothing is sent until they tap it.
6. If WhatsApp is not configured either, the form says it cannot take the message.

Contact and the service-area check use the same route, with a different `type`: `plan`, `contact`, or `serviceability`.

Nothing is charged on the page. Price, address, and start date are confirmed before the first meal.

## Plans

Three cards: Lunch Plan, Dinner Plan, and All-day Plan. The builder can mix meals. A single meal is priced as one plate. The rate per meal is the same at every length. Lunch and dinner cost more for non-veg. Breakfast is one rate.

The prices live in `data/plans.ts` with `pricing.status` set to `"confirmed"`. Do not copy the price table into this document. The code is the source. How to change a number is in the [README](../README.md#plans-and-prices).

A comparison range for a typical food-app lunch sits next to the Native Meals price. It is an illustration, not a quote from any app.

## This week's menu

Visitors see the current Monday-to-Sunday week in India time. A day with nothing posted does not appear. Until `WEEKLY_MENU_CSV_URL` is set, the week is labelled as a sample. When the sheet is connected, that label goes away.

The kitchen edits a Google Sheet. The operating steps, the columns, and the publish bookmark are in the [README](../README.md#weekly-menu-for-the-kitchen-team).

If the sheet cannot be loaded, the page says so and offers a way to ask. It does not invent the week's dishes.

## What is still open

Pause, skip, and cancellation rules are explained when someone enquires, unless a real cutoff has been set in `NEXT_PUBLIC_SKIP_CUTOFF`. Fixed clock times for lunch and dinner appear only when those env vars are set. The legal pages are drafts and must be reviewed before launch. The full launch list is in the [README](../README.md#launch-checklist).
