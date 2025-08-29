# Berserk Tattoos – Studio Website

A modern, full‑stack tattoo studio website (React + Vite + Tailwind on the client, Express on the server). It includes artist pages, gallery, booking flow, Instagram + Facebook embeds, and SEO/accessibility upgrades.

<a href="https://render.com/deploy?repo=https://github.com/RipKDR/InkCanvass">
  <img alt="Deploy to Render" src="https://render.com/images/deploy-to-render-button.svg" height="32" />
</a>

## Features

- Artists, Gallery, Services, Booking, Contact pages
- Centralized studio data (address, hours, socials)
- Instagram feeds (shop + per‑artist) with graceful fallback
- Facebook Page embed on Home
- Gallery Quick‑View dialog with CTAs
- Mobile floating “Book Now” button
- SEO: titles, meta, Open Graph, LocalBusiness + Person JSON‑LD, sitemap/robots
- Accessibility: skip link, prefers‑reduced‑motion, keyboard‑friendly dialogs
- Optional Analytics (GA4/Plausible)

## Quick Start (dev)

```
cd InkCanvas
npm install
npm run dev
# http://localhost:5000
```

## Build & Run (production)

```
npm run build
npm start
# http://localhost:5000
```

## Environment Variables (optional)

Copy `env.example` → `.env` and set values as needed.

- Instagram (live media)
  - `INSTAGRAM_USER_ID`, `INSTAGRAM_ACCESS_TOKEN`, `INSTAGRAM_LIMIT`
  - `INSTAGRAM_AMZKELSO_USER_ID`, `INSTAGRAM_AMZKELSO_ACCESS_TOKEN`
  - `INSTAGRAM_BEN_WHITERAVEN_USER_ID`, `INSTAGRAM_BEN_WHITERAVEN_ACCESS_TOKEN`
  - `INSTAGRAM_MONIQUEMOORE666_USER_ID`, `INSTAGRAM_MONIQUEMOORE666_ACCESS_TOKEN`
- Admin ingest route: `ADMIN_SECRET`
- Analytics (client): `VITE_ANALYTICS_PROVIDER`, `VITE_GA_MEASUREMENT_ID`, `VITE_PLAUSIBLE_DOMAIN`

## Deploy (Render)

Click the Deploy button above or:

1. Create a new Blueprint on Render and connect this repo
2. Root directory: `InkCanvas`
3. Build: `npm install && npm run build`
4. Start: `npm start`
5. Add any `.env` values (see above)
6. Deploy and share the public URL

## Project Structure

```
InkCanvas/
  client/            # React app (Vite + Tailwind)
  server/            # Express server + routes
  shared/            # Shared types/schema
  dist/              # Production build output
  render.yaml        # Render blueprint
  Dockerfile         # Container build (optional)
  Procfile           # Proc manager (optional)
```

## Instagram Integrations

- Feed proxy endpoint: `GET /api/instagram?handle=<handle>&limit=8` (cached 10 minutes)
- UI components automatically pull handles from `studio.ts` socials
- If tokens are not set, the UI shows a “Follow on Instagram” CTA instead of media

Import latest IG posts into gallery (memory storage)

```
curl -X POST http://localhost:5000/api/admin/ingest-instagram \
  -H "Authorization: Bearer $ADMIN_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"handle":"amzkelso","limit":12}'
```

