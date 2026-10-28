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
| Sample dishes and photo keys | `data/menu.ts`, `data/images.ts`, `public/images/` |
| This week's menu, once connected | Google Sheet. See the README. |

`lib/pricing.ts` is the only place that turns a meal selection into a total. The Meal Plans page and `/api/enquiry` both use it.

## Enquiry

`components/forms/EnquiryForm.tsx` posts to `app/api/enquiry/route.ts`.

The route validates the body in `lib/validation.ts`, drops honeypot submissions, and builds the estimate in `lib/contact.ts`. Order of delivery:

1. POST JSON to `ENQUIRY_WEBHOOK_URL` when it is set.
2. Otherwise return a WhatsApp link, if `NEXT_PUBLIC_WHATSAPP_NUMBER` is set, plus a mailto link when email is set.
3. Otherwise respond that the form is unavailable.

The client uses the link. It does not open a window on its own.

## Weekly menu

`lib/weekly-menu.ts` loads the sheet. The result is cached with the tag `weekly-menu`: stale after 5 minutes, revalidated after 15, expired after a day. A failed fetch throws, so the last good cache can stay. With no sheet URL, the sample week from `data/weekly-menu.sample.ts` is shown and labelled.

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
