# Design

The site should feel like a calm meal service for an office week. Healthy, clean, and specific about the handover. It should not look like a gym brand, a diet clinic, or a cuisine restaurant.

## Colour

Tokens are in `app/globals.css`.

| Token | Hex | Use |
| --- | --- | --- |
| Cream | `#FFFDF4` | Page background |
| Olive | `#0C3F25` | Headings, primary buttons, the dark band |
| Olive deep | `#082F1F` | Hover on primary buttons and navigation links |
| Sunflower | `#F9D82B` | Focus rings and small marks. Not for small text. |
| Leaf | `#197241` | Small labels. Sunflower fails contrast on ivory. |
| Sage | `#E4F2E6` | Soft fills behind cards and photos |
| Muted | `#526158` | Body copy |
| Charcoal | `#292A26` | Stronger text and selection |
| Error | `#9B3A2F` | Form errors |

The hero has a soft sunflower glow in the corner. The rest of the page stays ivory, white, and deep green.

## Type

Outfit is the only typeface, loaded in `app/layout.tsx` at weights 400 through 800. Headlines are heavy and tight. Body copy is regular. Buttons and the wordmark stay bold. Do not add a second display font.

## Voice

Say what the service does in plain words.

- Healthy meals, cooked the same morning.
- Handed over at the office gate, the security desk, or the door.
- Breakfast, lunch and dinner, on a Monday to Friday plan.
- Veg and non-veg, same price.

Do not name a cuisine to explain the product. People already understand the food. Do not add a nutritionist, calorie counts, protein grams, weight-loss results, testimonials, or star ratings. Kitchen rules are allowed only when they are true for every meal, and they already live in `data/site-config.ts`.

The name: Native is food you come back to. Meals is breakfast, lunch and dinner on a plan, not a one-off order.

## Photos

Files in `public/images/` are credited stand-ins. Credits are in `public/images/CREDITS.md`. A dish name must describe the photo it sits on. Before launch, replace the files and the alt text, and mark the photo as no longer a placeholder in `data/images.ts`. Do not leave a name on a picture of a different dish.

## Layout

The first screen is a short pill, a heavy headline, one sentence, a price line, two actions, and a quiet row of facts beside one rounded photo. Later sections are full-width bands: white, ivory, or deep green. Cards are rounded. The weekly menu is a set of day cards on the homepage, not a separate food catalogue.
