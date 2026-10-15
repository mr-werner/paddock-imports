# Paddock Imports — Blueprint WebStudio Concept

Independent, non-official redesign concept for https://www.paddockimports.com/ (Denver, CO).
Preview: https://pi.blueprintwebstudio.com (noindex; the demo code lives in the Neon `demos` table).

All business content is in `src/site.js`; colors and fonts are in `src/theme.css`. `src/App.jsx` is the layout (customized for this shop).

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

Vercel project `paddock-imports` (framework: Vite). Connect the repo under Vercel → Settings → Git so pushes to `main` deploy automatically.
Domain `pi.blueprintwebstudio.com` is a CNAME at Porkbun pointing to the target Vercel shows for this project.

Environment variables (all optional):

| Variable | Purpose |
|---|---|
| `VITE_CONCEPT_END_DATE` | Countdown end date in the concept widget (defaults to 2026-11-20) |
| `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID` | Live Google rating and review excerpts (`api/google-reviews.js`) |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Request-form emails (`api/contact.js`). Without them the form shows a demo message |

The "I'm Interested" form posts to `api/demo-interest.js`, which proxies to the main studio site.

## What changed from the current site

- Uses the real Paddock logo (cut out of the navy plate in `new-logo1.jpg`) in the header and footer; favicon made from its "P".
- Palette from their brand: logo navy #221D3B, nav blue #19458C, button orange #F7941D, plus a brighter racing blue (#3A7BE0) for dark backgrounds.
- New layout: full-bleed shop photo hero with racing stripes, a "timing board" of stats, P1–P9 service cards with their own blue-toned shop photos, a four-turn "lap" for the process, and a crew section built around Doug's portrait.
- The review badges from the homepage (Yelp, BBB, Angie's List) and the BimmerTech installer mark sit next to the Google rating, with the same outbound links.
- Pulls the most useful FAQ answers (labor rate, free first half hour of diagnosis, oil change, tire, alignment, battery and key prices) into one price board.
- "Schedule Service" opens an appointment request form; drop-off times and the 8 am / 9 am lobby slots are in plain view.
- Fixed contradictions: the contact page says "cars, trucks and SUVs" but the FAQ says no trucks or diesels (the concept says cars and SUVs only); mixed "nearly 30" / "over 30" years now read "30+ years in business" and "nearly 30 years" for Doug personally.
- Added the towing partner (New Age Towing) and the text-us link from the contact page; removed the empty Twitter link, dead per-brand "#" menus and javascript:void(0) carousel links.
- No customer testimonials appear on the current site, so none are quoted; the section links out to Google, Yelp, BBB and Angi.

## Before client presentation

- Confirm the Google rating and count. 4.8 / 1,182 is a fallback from a third-party listing checked 2026-10-14.
- Confirm every price on the price board (taken from the current FAQ page) is still current, or remove the section.
- Confirm Porsche and Range Rover are serviced (FAQ only) and that trucks/diesels are not.
- Confirm the portrait is Doug Paddock (it is the about photo on the current site) and the "8 full-time techs / 100 years combined" figures.
- Confirm what the second number (303) 825-3650 and the (720) 893-8038 number on some service pages are for; the concept only shows the main line.
- Confirm the logo file: the current logo reads "IMPORT'S" with an apostrophe; a corrected vector logo would look sharper (the only source is a 250 px JPG).
- Confirm service@paddockimports.com is the right inbox for appointment requests, and that New Age Towing is still the recommended tow.
- Photos are the shop's own (2017–2022) from the current site; get permission and ideally a fresh shoot.
- Keep the independent-concept disclaimer visible; do not imply this is the company's official site.
- The countdown is display-only, not access control. The subdomain is public to anyone with the URL.
