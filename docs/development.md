# Development

A map of the codebase. How to run the site, connect the weekly sheet, confirm prices, and finish the launch list is in the [README](../README.md). Do not keep a second copy of those steps here.

## Stack

Next.js 16 App Router, React 19, Tailwind CSS 4, TypeScript, pnpm. Icons are `lucide-react` only. There is no animation library, form library, or component kit.

```bash
pnpm install
pnpm dev
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

Open http://localhost:3000. Copy `.env.example` to `.env.local`. Empty values are correct until the fact is real.

## Where facts live

Change a business fact in `data/`, not in a component.

| Fact | File |
| --- | --- |
| Name, areas, tech parks, promises, kitchen rules, handover copy | `data/site-config.ts` |
| Phone, WhatsApp, email, site URL, FSSAI, kitchen locality, breakfast, lunch and dinner times, skip cutoff | `.env.local` |
| Plans and per-meal prices | `data/plans.ts` |
| FAQ answers | `data/faqs.ts` |
| Meal and diet types | `data/menu.ts` |
| Photos and alt text | `data/images.ts`, `public/images/` |
| This week's menu, once connected | Google Sheet. See the README. |

`data/menu.ts` also holds a sample dish list, `menuItems`. No page renders it. The dishes visitors see come from the weekly menu.

`lib/pricing.ts` is the only place that turns a meal selection into a total. The Meal Plans page and `/api/enquiry` both use it.

## Enquiry

`components/forms/EnquiryForm.tsx` posts to `app/api/enquiry/route.ts`.

The route validates the body in `lib/validation.ts`, drops honeypot submissions, and builds the estimate in `lib/contact.ts`. A filled `company` field returns success and is not saved. When the visitor picked meals, the JSON includes an `estimate` object. The sheet script reads that object for duration, days, total and meals.

A plan enquiry needs a name, a 10-digit Indian mobile number (starting 6–9), and a locality. Contact needs a name, a phone number and a message. The service-area check needs a phone number and a locality. The name can be left blank there.

Order of delivery:

1. If `ENQUIRY_WEBHOOK_URL` is set, POST JSON there. A successful save returns `{ ok: true }` and the form says the message was received.
2. If the webhook is missing, or the POST fails, return a WhatsApp link when `NEXT_PUBLIC_WHATSAPP_NUMBER` is set, plus a mailto link when email is set.
3. If WhatsApp is not set either, respond that the form is unavailable.

When the reply includes a WhatsApp or email link, the form shows it. It does not open a window on its own.

## Weekly menu

`lib/weekly-menu.ts` loads the sheet inside a cached function (`"use cache"`, which needs `cacheComponents` in `next.config.ts`). The tag is `weekly-menu`: stale after 5 minutes, revalidated after 15, expired after a day. The current week is Monday to Sunday in India time (`Asia/Kolkata` in `lib/dates.ts`). A day with no row is left off. A row that cannot be read is skipped.

With no sheet URL, the sample week from `data/weekly-menu.sample.ts` is shown and labelled. A URL that is set but is not a valid http(s) address, or a fetch that fails, returns an error menu. That result is cached like any other result. The page does not throw, does not keep the previous week, and does not fall back to the sample. A sheet that loads with no rows in the current week says the menu will be posted soon.

`showSampleNotes` in `data/site-config.ts` hides only the sage sample callout. While the source is still the built-in week, the sentence under the heading still says it is a sample.

`app/api/revalidate/route.ts` checks `REVALIDATE_SECRET`, then revalidates the tag and the homepage. The bookmark and the sheet columns are in the [README](../README.md#weekly-menu-for-the-kitchen-team).

The homepage renders `components/food/WeeklyMenu.tsx` with the id `this-week`. `next.config.ts` sends `/our-food` there.

## Pages

| Path | Role |
| --- | --- |
| `app/page.tsx` | Homepage |
| `app/meal-plans/page.tsx` | Plan builder and cards |
| `app/about/page.tsx` | Story |
| `app/faqs/page.tsx` | All FAQ answers |
| `app/contact/page.tsx` | Contact form |
| `app/privacy/page.tsx`, `app/terms/page.tsx` | Draft legal pages, `noindex` |
| `app/sitemap.ts`, `app/robots.ts` | Search files. Legal pages stay out of the sitemap. |

Shared layout, header, and footer are under `components/layout/` and `app/layout.tsx`.

## Honesty in code

- Hide a contact, a licence number, or a clock time when the env var is empty.
- Do not hard-code a price, an area, or a phone number in a component.
- Do not add a founder note, a testimonial, a rating, or a calorie figure.
- Do not pair a dish name with a photo of different food.
- Mark draft prices until `pricing.status` is `"confirmed"`.

The launch checklist is in the [README](../README.md#launch-checklist).
