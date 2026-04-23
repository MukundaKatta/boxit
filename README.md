# Boxit

Receipt capture and categorisation for taxes. Email them, photograph them, forward them — Boxit files each one under the right category.

**Status:** v0 skeleton — landing page + receipt-upload preview route. Full OCR/AI not yet wired.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind v4 |
| Fonts | Inter via `next/font/google` |
| Hosting | Vercel (zero config) |
| Waitlist | https://waitlist-api-sigma.vercel.app |

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Deploy

Push to `main` — Vercel picks it up automatically. No environment variables required.

## Routes

| Route | Description |
|---|---|
| `/` | Landing page (original copy + design preserved) |
| `/try` | v0 receipt uploader — drop an image, see 3 mocked line items + category dropdowns |
| `/api/waitlist` | `POST { email }` → forwards to waitlist-api-sigma with `product: "boxit"` |

## What's next

- Wire real OCR (extract vendor, amount, date, tax from photo)
- Email receipt ingestion (forwarding address)
- Tax-ready CSV / TurboTax / QuickBooks export
- Auth + per-user receipt history
