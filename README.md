# Berserk Tattoos – Studio Website

A modern, full‑stack tattoo studio website (React + Vite + Tailwind on the client, Express on the server). It includes artist pages, gallery, booking flow, Instagram + Facebook embeds, and SEO/accessibility upgrades.

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

## Tech Stack

- React 18, Vite, TypeScript, Tailwind
- Express server (Node 18+)
- Wouter (routing), TanStack React Query
- Radix UI for dialogs/UX primitives

## Quick Start

Prerequisites
- Node.js v18+
- npm

Install & Run (dev)
```
cd InkCanvas
npm install
npm run dev
# http://localhost:5000
```

Build & Run (production)
```
npm run build
npm start
# http://localhost:5000
```

Share a quick preview URL (choose one)
- LocalTunnel: `npx localtunnel --port 5000`
- Ngrok: `ngrok http 5000`
- Cloudflare: `npx cloudflared tunnel --url http://localhost:5000`

## Environment Variables

Copy `env.example` to `.env` and fill in as needed.

Minimum
```
PORT=5000
NODE_ENV=development
```

Instagram (optional, enables live media)
```
# Global fallback tokens (Instagram Basic Display API)
INSTAGRAM_USER_ID=
INSTAGRAM_ACCESS_TOKEN=
INSTAGRAM_LIMIT=8

# Per‑artist overrides (recommended)
INSTAGRAM_AMZKELSO_USER_ID=
INSTAGRAM_AMZKELSO_ACCESS_TOKEN=
INSTAGRAM_BEN_WHITERAVEN_USER_ID=
INSTAGRAM_BEN_WHITERAVEN_ACCESS_TOKEN=
INSTAGRAM_MONIQUEMOORE666_USER_ID=
INSTAGRAM_MONIQUEMOORE666_ACCESS_TOKEN=
```

Admin route (optional; import IG posts into gallery)
```
ADMIN_SECRET=
```

Analytics (optional)
```
VITE_ANALYTICS_PROVIDER=none   # ga4 | plausible | none
VITE_GA_MEASUREMENT_ID=
VITE_PLAUSIBLE_DOMAIN=
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

## Scripts

- `npm run dev` – start dev server (client + API at port 5000)
- `npm run build` – build client + server
- `npm start` – run production server (dist)
- `npm run check` – typecheck with TypeScript
- `npm run db:push` – (if using a real DB) push schema

## Deploy (Render/Railway)

1. Push the repo to GitHub
2. Create a Web Service
3. Root directory: `InkCanvas`
4. Build command: `npm install && npm run build`
5. Start command: `npm start`
6. Node version: 18+
7. Add any `.env` values (Instagram tokens, analytics, etc.)

## Project Structure

```
InkCanvas/
  client/            # React app (Vite + Tailwind)
  server/            # Express server + routes
  shared/            # Shared types/schema
  dist/              # Production build output
  env.example        # Example environment variables
  README.md          # This file
```

## Notes

- Some demo content uses Unsplash placeholders; real feeds and avatars come from Instagram.
- `.env` should never be committed.
- If you need to pre‑seed gallery items from IG, use the admin ingest route above.

