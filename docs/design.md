# Design

The site should feel like a calm meal service for an office week. Healthy, clean, and specific about the handover. It should not look like a gym brand, a diet clinic, or a cuisine restaurant.

## Colour

Tokens are in `app/globals.css`.

| Token | CSS variable | Hex | Use |
| --- | --- | --- | --- |
| Cream | `--color-cream` | `#FFFDF4` | Page background |
| Olive | `--color-olive` | `#0C3F25` | Headings, primary buttons, the dark band |
| Olive deep | `--color-olive-deep` | `#082F1F` | Hover on primary buttons and navigation links |
| Sunflower | `--color-terracotta` | `#F9D82B` | Focus rings and small marks. Not for small text. |
| Leaf | `--color-terracotta-ink` | `#197241` | Small labels. Sunflower fails contrast on ivory. |
| Sage | `--color-sage` | `#E4F2E6` | Soft fills behind cards and photos |
| Muted | `--color-muted` | `#526158` | Body copy |
| Charcoal | `--color-charcoal` | `#292A26` | Stronger text and selection |
| Error | `--color-error` | `#9B3A2F` | Form errors |

The CSS names `terracotta` and `terracotta-ink` are the sunflower and leaf colours. Use the variables above. There is no `--color-sunflower`.

Two colours sit outside the brand palette. `--color-veg` and `--color-nonveg` are only the diet mark. `--color-whatsapp` is the WhatsApp brand green, only on the floating chat button. `--color-mark-dome` is the lighter leaf on the cream wordmark.

The hero has a soft sunflower glow in the corner, from `bg-page-glow`. The rest of the page stays ivory, white, and deep green. Focus rings and text selection use the theme colours.

## Type

Outfit is the only typeface, loaded in `app/layout.tsx` at weights 400 through 800. Headlines are heavy and tight. Body copy is regular. Buttons and the wordmark stay bold. Do not add a second display font.

Sizes live in `app/globals.css` as `text-*` utilities. Use those, or the components in `components/ui`, instead of a one-off `clamp()` or `text-[…]`.

| Step | Utility | Use |
| --- | --- | --- |
| Eyebrow | `text-eyebrow` | Uppercase labels. Leaf on ivory, sunflower on olive. |
| Eyebrow, compact | `text-eyebrow-compact` | The hero area pill on small screens. It becomes `text-eyebrow` from the `md` breakpoint. |
| Display | `text-display` | Page title. |
| Closing | `text-closing` | The large headline on an olive closing band. |
| Title | `text-title` | Section title. |
| Stat | `text-stat` | A short fact, such as a price line in a header. |
| Card | `text-card` | Card and legal headings. |
| Lede | `text-lede` | The sentence under a page title. |
| Lead | `text-lead` | The sentence under a section title, and legal body copy. |
| Body | `text-body` | Card and footer copy. |
| Price | `text-price` | A secondary price, or a phone number. |
| Price, large | `text-price-lg` | The main price on a card or estimate. |
| Caption | `text-caption` | Uppercase meta under a price. |
| Hint | `text-hint` | The "swipe for the week" line. |
| Wordmark | `text-wordmark` | The name in the header and footer. |
| Nav | `text-nav` | Desktop navigation links. |

Step numbers use `text-5xl` at the small breakpoint and `text-6xl` from `md`, with `tracking-step`. The homepage and the meal-plans page share that size.

## Shape

| Token | Utility | Use |
| --- | --- | --- |
| Control | `rounded-control` | Inputs, choice tiles, notes, photo badges. |
| Card | `rounded-card` | Cards, panels, the estimate. |
| Photo | `rounded-photo` | Food photographs. |
| Full | `rounded-full` | Buttons, chips, the header. |

`shadow-raise` is the header. `shadow-float` is a badge sitting on a photo. Quiet panels keep `shadow-sm`.

A sage section band is `bg-sage/50`. An inset note is solid sage, or `bg-sage/70` when it sits inside a form. Those are two surfaces.

## Voice

Say what the service does in plain words.

- Daily Healthy Meal Subscription. That is the homepage headline.
- Healthy meals, cooked the same morning.
- Handed over at the office gate, the security desk, or the door.
- Breakfast, lunch and dinner, on a Monday to Friday plan.
- Veg or non-veg. Lunch and dinner cost more for non-veg. Breakfast is the same either way.

The pill and the photo badge do not repeat "meal plans" or "subscription". The pill is Hinjewadi, Wakad and Baner, Pune, from `launchArea` in `data/site-config.ts`. The badge says the meals are cooked the same morning.

Do not name a cuisine to explain the product. People already understand the food. Do not add a nutritionist, calorie counts, protein grams, weight-loss results, testimonials, or star ratings. Kitchen rules are allowed only when they are true for every meal, and they already live in `data/site-config.ts`.

The name: Native is food you come back to. Meals is breakfast, lunch and dinner on a plan, not a one-off order.

## Photos

Files in `public/images/` are credited stand-ins. Credits are in `public/images/CREDITS.md`. A dish name must describe the photo it sits on. Before launch, replace the files and the alt text, and mark the photo as no longer a placeholder in `data/images.ts`. Do not leave a name on a picture of a different dish.

## Components

Build new UI from `components/ui`. Class strings for type, surfaces, and controls live in `components/ui/styles.ts`.

| Component | Use |
| --- | --- |
| `Eyebrow`, `Heading`, `Text`, `Caption`, `Price`, `PriceMark`, `StepIndex` | Type. `Heading` sizes are `display`, `closing`, `title`, `stat`, and `card`. |
| `Section`, `Container`, `SectionHeading`, `PageHeader` | Page bands, the content width, a section title with an eyebrow, and the top of an interior page. |
| `Card`, `Panel` | A hairline card, or the white form column. |
| `Note` | A sage inset. `solid` for a callout, `soft` inside a form. |
| `PhotoFrame`, `PhotoBadge` | A food photograph and the label on it. |
| `Chip` | An area or tech-park pill. `area` plus `compact` is the hero locality pill. |
| `Button`, `ButtonLink` | Actions. Variants are `primary`, `secondary`, `inverse`, and `ghost`. |
| `Field`, `TextInput`, `Choice` | Labels, text fields, and the pill or tile choices in a form. Selects and textareas use `controlClass`. |
| `DietBadge` | The veg or non-veg mark. |

The Open Graph image repeats the cream, olive, leaf, and muted hex values. `next/og` cannot read the CSS theme. If a brand colour changes, update that image with the theme.

## Layout

The header is a white pill, sticky at the top. The first screen is a short pill, a heavy headline, one sentence, two actions, and a quiet row of kitchen differentiators beside one rounded photo. The row says freshly cooked, no maida, no preservatives, and cooked in steel. Delivery windows stay in the delivery answer, not in this row. The pill is Hinjewadi, Wakad and Baner, Pune, from `launchArea` in `data/site-config.ts`. The headline is Daily Healthy Meal Subscription. The sentence is breakfast, lunch and dinner, cooked the same morning and handed over at the office gate or the door. Prices stay on the plan cards, not in the hero. The photo badge says Cooked the same morning. Later sections are full-width bands: white, ivory, or deep green. Cards are rounded. The weekly menu is a set of day cards on the homepage, not a separate food catalogue.
