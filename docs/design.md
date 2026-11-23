# Design

The site should feel like a calm everyday meal service for an office week. Everyday food, balanced and healthy, and specific about the handover. It should not look like a gym brand, a diet clinic, or a cuisine restaurant. The voice does not tell someone the food should not feel like a diet.

## Colour

Tokens are in `app/globals.css`. The palette is three colours, used by a 60-30-10 rule: two mood colours fill the page, and one accent marks what to click.

| Role | Token | CSS variable | Hex | Use |
| --- | --- | --- | --- | --- |
| 60 | Cream | `--color-cream` | `#FBF3E0` | Page background, most bands |
| 60 | Oat | `--color-oat` | `#F3E7C9` | A deeper cream for bands, notes, and photo placeholders |
| 30 | Olive | `--color-olive` | `#0C3F25` | Headings, small labels, the hero, the dark bands |
| 30 | Olive deep | `--color-olive-deep` | `#082F1F` | The footer, and hover on olive buttons |
| 10 | Sunflower | `--color-sunflower` | `#F9D82B` | The start and submit buttons, the price pill, the sticker |
| 10 | Sunflower deep | `--color-sunflower-deep` | `#EBC814` | Hover on sunflower buttons |
| | Muted | `--color-muted` | `#526158` | Body copy |
| | Charcoal | `--color-charcoal` | `#292A26` | Stronger text |
| | Error | `--color-error` | `#9B3A2F` | Form errors |

Sunflower is the accent, so it stays scarce. It goes on the action you want taken, a price, and the sticker. It is not decoration: icons, dots and links stay cream or olive. Olive text on sunflower is about 8:1. Sunflower text on cream is unreadable, so small labels on a light band are olive. Small labels inside an olive band may be sunflower.

There is no leaf or sage green. Olive and olive deep are the only brand greens. Three colours sit outside the brand palette. `--color-veg` and `--color-nonveg` are only the diet mark. `--color-whatsapp` is the WhatsApp brand green, only on the floating chat button.

The olive bands, including every page header, carry `bg-brand-pattern`, the tiffin mark repeated at low opacity. Focus rings are olive on light bands and sunflower inside olive bands. Text selection is sunflower with olive text.

## Type

Outfit is the only typeface, loaded in `app/layout.tsx` at weights 400 through 800. Display, closing and title headlines are uppercase, extra bold, and tightly set, so they read like a poster. Card headings and everything smaller stay in sentence case. Body copy is regular. Buttons and the wordmark stay bold. Do not add a second display font.

Sizes live in `app/globals.css` as `text-*` utilities. Use those, or the components in `components/ui`, instead of a one-off `clamp()` or `text-[…]`. Page titles and section titles stay large on a laptop, not only on a wide monitor. Card headings are a full step above body copy.

| Step | Utility | Use |
| --- | --- | --- |
| Eyebrow | `text-eyebrow` | Uppercase labels. Olive on cream, sunflower on olive. |
| Eyebrow, compact | `text-eyebrow-compact` | The hero area pill on small screens. It becomes `text-eyebrow` from the `md` breakpoint. |
| Poster | `text-poster` | The homepage hero only. Each line of the headline spans the container on one line from `md`. |
| Display | `text-display` | Page title that has the full width. |
| Closing | `text-closing` | The large headline on an olive closing band. |
| Title | `text-title` | Section title. |
| Numeral | `text-numeral` | The large step numbers in `StepList`, on the homepage and the meal-plans page. |
| Label | `text-label` | The uppercase meal name across the bottom of a homepage photo, and each rule name in `RuleList`. |
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
| Control | `rounded-control` | Inputs, choice tiles, notes, photo badges. |
| Card | `rounded-card` | Cards, panels, the estimate. |
| Photo | `rounded-photo` | Food photographs. |
| Full | `rounded-full` | Buttons, chips, the header. |
| Section | `rounded-t-section` | The top of a band after another band. 2rem on a small screen, 3rem from `md`. The band overlaps the one above so the curve is visible. |

`shadow-raise` is the header. `shadow-float` is a badge sitting on a photo. Quiet panels keep `shadow-sm`.

An oat section band is `bg-oat`. An inset note is solid oat, or `bg-oat/70` when it sits inside a form. Those are two surfaces.

## Voice

Say what the service does in plain words.

- Everyday food. Balanced better. That is the homepage headline.
- Everyday meals, balanced and healthy, cooked fresh. Balance means a full plate with kitchen-supplied calories and macros on the menu, plus the kitchen rules. Cooked fresh does not name a time of day. Do not say the food should not feel like a diet.
- Handed over at the office gate, the security desk, or the door.
- Breakfast, lunch and dinner, on a Monday to Friday plan.
- Veg or non-veg. Lunch and dinner cost more for non-veg. Breakfast is the same either way.

The pill and the sticker do not repeat "meal plans" or "subscription". The pill is Hinjewadi, Wakad and Baner, Pune, from `launchArea` in `data/site-config.ts`. The sticker says the meals are cooked fresh and handed over at the office gate or the door. It does not repeat the kitchen rules.

The kitchen rules appear on the homepage as four short facts in the hero, with a link down to How we make it, where each practice is explained once. Other homepage blocks do not repeat them.

Do not name a cuisine to explain the product. People already understand the food. Calories and macros belong on this week's menu when the kitchen has supplied them in the sheet. Do not invent figures, and do not put calorie numbers in the hero. Do not add a nutritionist, weight-loss results, testimonials, or star ratings. Kitchen rules are allowed only when they are true for every meal, and they already live in `data/site-config.ts`.

The name: Native is food you come back to. Meals is breakfast, lunch and dinner on a plan, not a one-off order.

## Photos

Files in `public/images/` are credited stand-ins. Credits are in `public/images/CREDITS.md`. A dish name must describe the photo it sits on. Before launch, replace the files and the alt text, and mark the photo as no longer a placeholder in `data/images.ts`. Do not leave a name on a picture of a different dish.

## Components

Build new UI from `components/ui`. Class strings for type, surfaces, and controls live in `components/ui/styles.ts`.

| Component | Use |
| --- | --- |
| `Eyebrow`, `Heading`, `Text`, `Caption`, `Price`, `PriceMark` | Type. `Heading` sizes are `poster`, `display`, `closing`, `title`, `stat`, and `card`. |
| `Section`, `Container`, `SectionHeading` | Page bands, the content width, and a section title with an eyebrow. `SectionHeading` with `split` puts the sentence and an optional `action` beside the title from `md`, so the right half of the band is not empty. Sections on the homepage, meal plans and about use `split`. A long article, such as the about story, keeps the stacked title. |
| `PageHeader` | The top of every page except the homepage. An olive band that runs up under the header, with a sunflower eyebrow, a centred `display` title, a sentence, and optional `actions` and `facts`. With `imageId`, a wide photo sits on the band's bottom edge and the next band's rounded top covers its lower corners. Without one, it is a plain olive band, as on privacy, terms and the 404 page. |
| `StepList`, `RuleList` | Large cream step numbers over a thin rule, for an olive band. The kitchen rules in two columns, each name in `text-label` under a heavy olive rule, for a light band. Used on the about page. On the homepage the same practices are told in How we make it. |
| `Card`, `Panel` | A hairline card, or the white form column. |
| `Note` | An oat inset. `solid` for a callout, `soft` inside a form. |
| `PhotoFrame`, `PhotoBadge` | A food photograph and the label on it. |
| `Sticker` | The round sunflower sticker with rotating text around the tiffin mark. One per screen, on the corner of a photo. It stops rotating when the visitor prefers reduced motion. |
| `Chip` | An area or tech-park pill. `area` plus `compact` is the hero locality pill. |
| `Button`, `ButtonLink` | Actions. `accent` is sunflower, for starting a plan and sending a form. `primary` is olive, `secondary` is an olive outline, `inverse` is a cream outline inside an olive band, and `ghost` is text only. `StartCTA` is `accent`. |
| `Field`, `TextInput`, `Choice` | Labels, text fields, and the pill or tile choices in a form. Selects and textareas use `controlClass`. |
| `DietBadge` | The veg or non-veg mark. |

The Open Graph image repeats the olive, cream and sunflower hex values, and so do `bg-brand-pattern`, `public/logo.svg`, `public/logo-light.svg` and `app/icon.svg`. None of them can read the CSS theme. If a brand colour changes, update them with the theme.

The browser icon is a cream tiffin on an olive rounded square, so it shows on light and dark tab bars. An olive mark on a transparent background disappears on a dark tab. `app/favicon.ico` is a 16, 32 and 48 pixel copy of `app/icon.svg`. When the SVG changes, export the ICO again.

The mark is three colours: an olive tiffin with a cream lid and a sunflower band on light backgrounds, and a cream tiffin with an olive lid on dark ones.

## Layout

The header is a cream pill, sticky at the top, with a sunflower start button. The homepage hero is a full-bleed olive band that runs up under the header and carries the brand pattern. It is laid out like a poster. From the `lg` breakpoint it fills the first screen, and its container is wider than the rest of the page (`max-w-[91rem]`) so the headline can grow on large monitors. The area pill and a two-line uppercase headline are centred across the full width. Below are three columns. The middle one holds the steel thali as a cut-out with no background. The plate fills whatever height is left, overlaps the bottom of the headline's second line, and runs down to the hero's bottom edge, where the next band's rounded top covers its flat edge. The sticker sits on the plate's top right. The left column has one sentence and two actions (a sunflower start and a cream outline). The right column has a card titled Our kitchen rules with four facts and a link down to How we make it. The hero carries no price; prices live on the plan cards. On tablets the two side columns sit side by side and the plate goes below them. On phones everything stacks and the plate comes last, edge to edge. The facts name the kitchen rules: no potatoes, no maida, no preservatives, and no non-stick. How we make it explains each one. Delivery windows stay in the delivery answer. Days, veg or non-veg, the rate, and the 3-day start stay on the plan cards. The pill is Hinjewadi, Wakad and Baner, Pune, from `launchArea` in `data/site-config.ts`. The headline is Everyday food. Balanced better. The sentence is breakfast, lunch and dinner you can eat every day. Balanced and healthy, cooked fresh, and handed over at the office gate or the door. Prices stay on the plan cards, not in the hero. The sticker reads Cooked fresh, Office gate or your door. Below the hero, the sections carry the same poster style. Each title has its sentence beside it. The first cream band is a day on Native: breakfast, lunch and dinner photos, each with the meal name in large uppercase cream type and one handover line over an olive fade. The how-it-works band has no cards: each step is a large cream number over a thin rule. After the photos, an oat band is How we make it (`#balanced-better`). Its eyebrow is Everyday food. Balanced better. The sentence defines the full plate and the kitchen rules. Four cards are the kitchen practices in plain words: millet and multigrain rotis, sabzi without potato bulk, chutneys cooked here, and cooked fresh in steel. That is the only full explanation on the homepage; there is no second kitchen-rules band. A quiet line under a heavy olive rule points to this week's menu for calories and macros, with a sunflower start button. The About page still lists the rules, after a short why-it-exists prose band and a week-on-the-plan band. Meal Plans adds a short oat meaning band before the builder. Later homepage sections are full-width bands in this order: cream day-on-Native photos, oat how-we-make-it, cream plans, white menu, olive how-it-works, oat service area, and an olive closing band with a sunflower button. The footer is olive deep, so it reads apart from the closing band. Cards are rounded. The weekly menu is a set of day cards on the homepage, not a separate food catalogue. Motion is scarce and intentional: `animate-rise` on the day photos, `animate-fade-up` on how-it-works steps and the closing CTA, plus the sticker spin. All of it is gated with `motion-safe` / `prefers-reduced-motion`.
