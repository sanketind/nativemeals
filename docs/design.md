# Design

The site should feel like an urban tiffin service for a Pune office week: graphic, high-contrast, modern at the gate. Everyday food that is tasty, familiar and healthy. A complete meal, prepared carefully, and specific about the handover. It should not look like a gym brand, a diet clinic, a cuisine restaurant, or a soft meal-kit product site. The voice does not tell someone the food should not feel like a diet.

## Colour

Tokens are in `app/globals.css`. The palette is three colours, used by a 60-30-10 rule: two mood colours fill the page, and one accent marks what to click.

| Role | Token | CSS variable | Hex | Use |
| --- | --- | --- | --- | --- |
| 60 | Stone | `--color-stone` | `#F5F3EF` | Page background, most bands |
| 60 | Mist | `--color-mist` | `#EBE8E2` | A deeper stone for bands, notes, and photo placeholders |
| 30 | Ink | `--color-ink` | `#121A16` | Headings, strong text, the footer |
| 30 | Field | `--color-field` | `#1A2E24` | The hero, page headers, and dark bands |
| 10 | Accent | `--color-accent` | `#FF6A3D` | The start and submit buttons, the price mark |
| 10 | Accent deep | `--color-accent-deep` | `#E85A30` | Hover on accent buttons |
| | Muted | `--color-muted` | `#5C6660` | Body copy |
| | Error | `--color-error` | `#9B3A2F` | Form errors |

Accent (chili) stays scarce. It goes on the action you want taken and a price. It is not decoration: icons, dots and links stay stone or ink. Ink text on accent is readable. Accent text on stone is unreadable for small labels, so small labels on a light band are ink. Small labels inside a field band may be accent.

Three colours sit outside the brand palette. `--color-veg` and `--color-nonveg` are only the diet mark. `--color-whatsapp` is the WhatsApp brand green, only on the floating chat button.

The field bands, including every page header, may carry `bg-brand-pattern`, the tiffin mark repeated at low opacity. Focus rings are ink on light bands and accent inside field or ink bands. Text selection is accent with ink text.

## Type

One typeface, loaded in `app/layout.tsx`: **DM Sans** (`--font-sans`) for everything: brand, headlines, body, and UI.

Display, closing and title headlines are **mixed case**, bold, and tightly set. Clean, not all-caps poster shouting. Eyebrows and captions stay uppercase. Body copy is regular. Buttons stay semibold. Do not add a second typeface.

Sizes live in `app/globals.css` as `text-*` utilities. Use those, or the components in `components/ui`, instead of a one-off `clamp()` or `text-[…]`. The homepage hero leads with the tagline **Everyday food. Balanced better.** at poster size. The brand name lives in the wordmark (header and footer), not as the hero headline.

| Step | Utility | Use |
| --- | --- | --- |
| Eyebrow | `text-eyebrow` | Uppercase labels. Ink on stone, accent on field. |
| Eyebrow, compact | `text-eyebrow-compact` | Compact labels on small screens. |
| Poster | `text-poster` | The homepage hero tagline only. |
| Display | `text-display` | Page title that has the full width. |
| Closing | `text-closing` | The large headline on a field closing band. |
| Title | `text-title` | Section title. |
| Numeral | `text-numeral` | The large step numbers in `StepList`. |
| Label | `text-label` | The meal name across the bottom of a homepage photo, and each rule name in `RuleList`. |
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

## Shape

| Token | Utility | Use |
| --- | --- | --- |
| Control | `rounded-control` | Inputs, buttons, choice tiles, notes, photo badges. ~0.75rem. |
| Card | `rounded-card` | Cards, panels, the estimate. ~1rem. |
| Photo | `rounded-photo` | Food photographs. Sharper than before. |
| Section | `rounded-t-section` | The top of a band after another band. |

No floating pill header. No default `rounded-full` CTAs. Cards exist only where interaction needs a container (plan picker, form). Quiet panels keep `shadow-sm`. The header is a flat translucent bar.

An mist section band is `bg-mist`. An inset note is solid mist, or `bg-mist/70` when it sits inside a form.

## Voice

Say what the service does in plain words. Do not use em dashes (—) in public copy; prefer a full stop or a comma.

- Everyday food. Balanced better. That is the homepage hero headline.
- Everyday meals that are tasty, familiar and healthy, cooked fresh. Balanced means a complete meal: a full plate of protein, carbs, fats, vegetables and dal, with kitchen-supplied calories and macros on the menu, plus the kitchen rules. Soft truth about micronutrients in grains, dals and vegetables is fine; inventing vitamin or probiotic numbers is not. Cooked fresh does not name a time of day. Do not say the food should not feel like a diet.
- The purpose, when the page has room: traditional everyday plates used to be complete; the busy week made that hard; Native cooks the same familiar food carefully so the plate is balanced again. Hindi and Sanskrit names for that idea (*sampoorna anna*, *pushtik aahar*) live in `docs/business.md`. Public copy says complete meal, full plate, familiar food prepared carefully.
- Handed over at the office gate, the security desk, or the door.
- Breakfast, lunch and dinner, on a Monday to Friday plan.
- Veg or non-veg. Lunch and dinner cost more for non-veg. Breakfast is the same either way.

The kitchen rules appear on the homepage in How we make it, not as a card in the hero. Other homepage blocks do not repeat them.

Do not name a cuisine to explain the product. People already understand the food. Calories and macros belong on this week's menu when the kitchen has supplied them in the sheet. Do not invent figures, and do not put calorie numbers in the hero. Do not add a nutritionist, weight-loss results, testimonials, or star ratings. Kitchen rules are allowed only when they are true for every meal, and they already live in `data/site-config.ts`.

The name: Native is food you come back to. Meals is breakfast, lunch and dinner on a plan, not a one-off order. The brand name is in the wordmark; the hero headline is the tagline.

## Photos

Files in `public/images/` are credited stand-ins. Credits are in `public/images/CREDITS.md`. A dish name must describe the photo it sits on. Before launch, replace the files and the alt text, and mark the photo as no longer a placeholder in `data/images.ts`. Do not leave a name on a picture of a different dish.

## Components

Build new UI from `components/ui`. Class strings for type, surfaces, and controls live in `components/ui/styles.ts`.

| Component | Use |
| --- | --- |
| `Eyebrow`, `Heading`, `Text`, `Caption`, `Price`, `PriceMark` | Type. `Heading` sizes are `poster`, `display`, `closing`, `title`, `stat`, and `card`. |
| `Section`, `Container`, `SectionHeading` | Page bands, the content width, and a section title with an eyebrow. `SectionHeading` stacks eyebrow, title, support sentence, and optional action. Never a title-left / copy-right split. |
| `PageHeader` | The top of every page except the homepage. A field band that runs up under the header, with an accent eyebrow, a centred `display` title, a sentence, and optional `actions` and `facts`. |
| `StepList`, `RuleList` | Large stone step numbers over a thin rule, for a field band. The kitchen rules in two columns for a light band. |
| `Card`, `Panel` | A hairline card, or the white form column. Interaction containers only. |
| `Note` | A mist inset. |
| `PhotoFrame`, `PhotoBadge` | A food photograph and the label on it. |
| `Sticker` | Optional off-hero only. Round accent sticker with the tiffin mark. |
| `Chip` | An area or tech-park label. Squared-soft, not a pill cluster in the hero. |
| `Button`, `ButtonLink` | Actions. `accent` is chili, for starting a plan and sending a form. `primary` is ink, `secondary` is an ink outline, `inverse` is a stone outline inside a field band, and `ghost` is text only. `StartCTA` is `accent`. |
| `Field`, `TextInput`, `Choice` | Labels, text fields, and the choices in a form. |
| `DietBadge` | The veg or non-veg mark. |

The Open Graph image repeats the field, stone and accent hex values, and so do `bg-brand-pattern`, `public/logo.svg`, `public/logo-light.svg` and `app/icon.svg`. None of them can read the CSS theme. If a brand colour changes, update them with the theme.

The browser icon is a stone tiffin on a field rounded square. `app/favicon.ico` is a 16, 32 and 48 pixel copy of `app/icon.svg`. When the SVG changes, export the ICO again.

The mark is three colours: an ink tiffin with a stone lid and an accent band on light backgrounds, and a stone tiffin with a field lid on dark ones.

## Layout

The header is a floating translucent bar (inset from the edges), sticky at the top, with a chili start button. Over the dark hero it is glass-clear with stone type; after scroll it frosts to stone with ink type. The brand name sits in the wordmark there. The homepage hero is a full-bleed field band (or full-bleed food as the visual plane) that runs up under the header. First viewport composition: tagline, one support line, one CTA group, one dominant visual. No kitchen-rules card, no floating sticker, no locality pill decoration in the hero. Locality is a quiet text line. Kitchen rules live in How we make it only. Prices stay on the plan cards.

Below the hero, sections keep one job each, in this order: why Native exists, day-on-Native photos, who it is for, what balanced means, How we make it (kitchen practices only), plans, weekly menu, how-it-works numerals, service area, and a field closing band. The footer is ink. Motion is scarce: `animate-rise` on day photos, `animate-fade-up` on how-it-works and the closing CTA. All of it is gated with `motion-safe` / `prefers-reduced-motion`.
