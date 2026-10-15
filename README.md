# Paddock Imports — Blueprint WebStudio Concept

Independent, non-official redesign concept for https://www.paddockimports.com/ (Denver, CO).
Preview: https://pi.blueprintwebstudio.com (noindex; the demo code lives in the Neon `demos` table).

All business content is in `src/site.js`; colors and fonts are in `src/theme.css`. `src/App.jsx` is the shared layout.

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

- "Schedule Service" now opens an appointment request form; on the current site it goes to the contact page and asks you to call.
- Organized service pages by marque (BMW & MINI, Audi & Volkswagen, Mercedes-Benz) instead of scattered per-brand menus that link to #.
- Puts drop-off times and the 8 am / 9 am in-lobby waiting appointments in plain view.
- Removed the empty Twitter link, carousel javascript:void(0) links and mismatched image alt text; labeled the second phone number.
- Replaces 2015–2021 photos with a clean, image-light layout until fresh shop photos are taken.

## Before client presentation

- Confirm the Google rating and count. 4.8 / 1,182 is a fallback from a third-party listing checked 2026-10-14.
- Confirm what the second number (303) 825-3650 is for; the concept only shows the main line.
- Confirm whether Volvo is still serviced (it appears in the current site's meta description only) and the warranty terms.
- Confirm Doug's bio details ("nearly 30 years" on BMW and Audi; "over 30 years" in business).
- Confirm service@paddockimports.com is the right inbox for appointment requests.
- Replace the icon wordmark with the business's real logo, and add real photos with permission.
- Keep the independent-concept disclaimer visible; do not imply this is the company's official site.
- The countdown is display-only, not access control. The subdomain is public to anyone with the URL.
