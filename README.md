# Native Meals

The website for Native Meals: a daily healthy meal subscription for Hinjewadi, Wakad and Baner, Pune. Meals are cooked the same morning and handed over at the office gate, the security desk, or the door. Monday to Friday is the main pattern.

## Read the project

- [Business](docs/business.md) — who it is for, where it serves, and what must not be invented.
- [Design](docs/design.md) — colour, type, voice, and photos.
- [Product](docs/product.md) — pages, enquiry, plans, and this week's menu.
- [Development](docs/development.md) — where the code lives, and how the site stays honest.

## Run it

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

Copy `.env.example` to `.env.local` and fill in only the values you actually have. Empty values are fine. The site stays honest about anything that is missing.

## Where things live

Do not scatter business details through the components. Change them here:

| What | Where |
| --- | --- |
| Service area, phone, WhatsApp, email, social links | `data/site-config.ts` and `.env.local` |
| Meal and diet types | `data/menu.ts`. The sample dish list in that file is not shown on a page. |
| Plans and per-meal prices | `data/plans.ts` (`pricing`, then each plan) |
| FAQ answers | `data/faqs.ts` |
| Photos and alt text | `public/images/` and `data/images.ts` |
| This week's menu | A Google Sheet. See below. |
| Kitchen rules and a founder note | `data/site-config.ts`. The kitchen rules are published. The founder note stays hidden until there is a real story. |

Delivery times, pause rules and contact numbers stay blank until they are real. The pages say so, or hide the control. Do not type a guess into those fields.

Meal prices live in `data/plans.ts`. The plan cards and the builder read from it. `pricing.status` is `"confirmed"`. See [Plans and prices](#plans-and-prices).

### Contact details

Set these in `.env.local`:

- `NEXT_PUBLIC_PHONE` — shown as a tap-to-call link.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — country code plus number, for example `9198XXXXXXX`. Turns on WhatsApp buttons.
- `NEXT_PUBLIC_EMAIL` — shown on the contact page, and offered if a form cannot be delivered.
- `NEXT_PUBLIC_SITE_URL` — the real domain, used for the sitemap and link previews.

### Enquiry forms

Forms on Meal Plans, Contact and the service-area check post to `/api/enquiry`.

1. If `ENQUIRY_WEBHOOK_URL` is set, the site sends a JSON body to that address. Point it at a private Google Sheet (below), Zapier, Make, or anything that accepts a POST.
2. If it is not set, or the request fails, the visitor gets a link that opens WhatsApp with the same details filled in. Nothing is sent until they tap it.
3. If WhatsApp is not configured either, the form says so. It does not pretend the message was received.

To store enquiries in a Google Sheet, use a **new** spreadsheet. Do not use the weekly menu file. That file is shared so the site can read it, and enquiry rows contain names and phone numbers.

1. Create a spreadsheet, for example `Native Meals enquiries`.
2. Extensions, then Apps Script. Replace the sample with `scripts/enquiry-to-sheet.gs`. Save.
3. Deploy, then New deployment, then Web app. Execute as yourself. Who has access: Anyone. Deploy and copy the web app URL.
4. Put that URL in `ENQUIRY_WEBHOOK_URL` and restart the site.

The first successful enquiry creates an `Enquiries` tab. After that, Start Monday saves the row and tells the visitor the message was received.

The body looks like this:

```json
{
  "source": "nativemeals-website",
  "receivedAt": "2026-10-27T12:00:00.000Z",
  "type": "plan",
  "name": "Asha Rao",
  "phone": "9876543210",
  "plan": "Lunch Plan",
  "diet": "veg",
  "locality": "Wakad",
  "message": "",
  "estimate": {
    "pricingStatus": "confirmed",
    "plan": "Lunch Plan",
    "duration": "Mon–Fri",
    "days": 5,
    "meals": [{ "meal": "Lunch", "perMeal": 229 }],
    "perDay": 229,
    "total": 1145,
    "note": ""
  }
}
```

`type` is `plan`, `contact` or `serviceability`. The server writes `estimate` from the current rates in `data/plans.ts`. The figures above only show the shape of one Monday to Friday veg lunch. A hidden field traps simple bots and those submissions are ignored.

The service-area box does not check a postcode. It only records the locality so someone can reply.

## Weekly menu, for the kitchen team

You do not need a developer to change the menu. You edit a Google Sheet. The website reads it.

### Once

1. Create a Google Sheet and paste in the rows from `docs/weekly-menu-template.csv`, or copy that file in with File, then Import.
2. Share it with the people who plan the week.
3. In the sheet: File, then Share, then Publish to web. Choose the menu tab and Comma-separated values (.csv). Publish.
4. Copy the link. It looks like `https://docs.google.com/spreadsheets/d/.../pub?output=csv`.
5. Give that link to whoever looks after the website, to put in `WEEKLY_MENU_CSV_URL`.
6. Choose a password, put it in `REVALIDATE_SECRET`, and bookmark this address (use your real domain and password):

   `https://your-domain.com/api/revalidate?secret=YOUR_SECRET`

### Each week

Add one row per meal option.

| Column | What to type |
| --- | --- |
| date | `2026-11-02`, or `02/11/2026` |
| meal | Breakfast, Lunch or Dinner |
| diet | Veg or Non-veg |
| dishes | The plate, in your own words. Example: `Dal tadka, jeera rice, bhindi, 2 phulka` |
| note | Optional. A short extra, or leave it blank. |
| image | Optional. Leave it blank. A photo key from the site can go here later. |
| show | `TRUE` to publish the row. `FALSE` to keep next week drafted. |

Two options for the same meal, for example veg and non-veg lunch, are two rows.

The site shows the current Monday-to-Sunday week, in India time. Days you have not filled in simply do not appear. A mistyped row is skipped. It will not break the page.

Changes show up within about 15 minutes. To see them immediately, open the publish bookmark from step 6 and wait for the line that says the refresh was requested. Then reload the site.

If the sheet cannot be reached, or the link is not a valid web address, the page says the menu could not be loaded and offers a way to ask. It does not keep the previous week, and it does not show the sample. If nothing is posted for this week, visitors see that the menu will be posted soon, with a way to ask.

Until the sheet link is added, the site shows a sample week with a clear sample label. That sample disappears as soon as the sheet is connected.

There is an optional line under the menu, `weeklyMenu.footnote` in `data/site-config.ts`. Leave it empty unless it is true. Do not write "Sunday is a day off" until that is the real arrangement.

## Plans and prices

All prices live in the `pricing` object in `data/plans.ts`. The plan cards and the builder read from it. Do not type prices anywhere else.

- `status` — `"draft"` shows `pricing.note` (“We confirm the total before you start.”). Set `status` to `"confirmed"` once the numbers are real, and that note disappears. It is already `"confirmed"`.
- `perMeal` — the veg rate, in rupees, for breakfast, lunch and dinner. It is the same at every duration. Non-veg lunch and dinner use `nonVegPerMeal`. Breakfast is the same either way.
- `durations[].days` — how many meals of each kind are in that plan. Monday to Friday is 1 meal, then 5 days, then 22 weekdays in a month. The six-day options stay for Saturday: 6 days, 12 days, and 24 days. A 3-day length sits between the single meal and the Monday to Friday week.

The builder multiplies the selected meals by those days and shows an estimate. The enquiry API calculates the same total again, so the browser cannot submit a different price.

Lunch is lunch only. Dinner is dinner only. Any other mix, including breakfast on its own, is the All-day Plan. Its card shows the per-day cost of all three meals.

`frequency`, `includes` and `deliveryTerms` are set on each plan in `data/plans.ts`. The cards read those fields.

## Photographs

Stock photos in `public/images/` are stand-ins. Credits are in `public/images/CREDITS.md`. Before launch, replace the files (keep the same names, or change `src` in `data/images.ts`) and rewrite the alt text so it describes the real photo. Set `placeholder` to `false` when a photo is yours.

The photos on the site are the hero, the plan cards and the About page. `data/menu.ts` has a sample dish list that no page renders. The dishes visitors read are the weekly menu. An optional `image` cell in the sheet can use a key from `data/images.ts`. Do not leave a dish name sitting on a photo of something else.

## Launch checklist

Confirm all of these before publishing:

- Final menu and dish descriptions
- Prices in `data/plans.ts` are confirmed. If a number changes, change it there and keep `pricing.status` at `"confirmed"`
- Serviceable locations, if the list grows beyond Hinjewadi, Wakad and Baner
- Delivery and collection arrangements
- Business phone and WhatsApp number
- Contact email and social links
- Actual food photography
- Cancellation, pause and refund policies
- Privacy policy and terms. They describe the enquiry. Update them if storage or payment changes
- Any food-business registration and compliance details that must be shown
- `NEXT_PUBLIC_SITE_URL` set to the real domain
- Weekly menu sheet connected, and the sample label gone
- Enquiry webhook connected, and a test enquiry received
