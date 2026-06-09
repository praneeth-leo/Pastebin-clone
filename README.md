# Pastebin Clone

A small Pastebin-like web application built with Next.js, Prisma, and Postgres.
Users can create text pastes, receive a shareable link, and optionally expire a
paste by time or by number of views.

## Features

- Create text pastes from the home page.
- Generate short shareable links at `/p/[id]`.
- View paste content by link.
- Optional time expiry: never, 10 minutes, 1 hour, 1 day, or 7 days.
- Optional view expiry with a maximum view count.
- JSON API endpoints for automated testing.

## Tech Stack

- Next.js App Router
- React
- Prisma
- Postgres
- Tailwind CSS

## Local Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file with a Postgres connection string:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
```

Generate Prisma client and run migrations:

```bash
npx prisma generate
npx prisma migrate deploy
```

Start the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## API

Create a paste:

```http
POST /api/pastes
Content-Type: application/json
```

```json
{
  "content": "hello world",
  "expiresIn": "1h",
  "maxViews": 5
}
```

`expiresIn` can be `never`, `10m`, `1h`, `1d`, or `7d`. `maxViews` is optional.

Response:

```json
{
  "id": "abc123",
  "url": "https://example.com/p/abc123",
  "expiresAt": "2026-06-09T10:00:00.000Z",
  "maxViews": 5
}
```

Read a paste:

```http
GET /api/pastes/[id]
```

Responses:

- `200` with paste content when available.
- `404` when the paste does not exist.
- `410` when the paste has expired.

Each successful web or API read increments the paste view count. Once `maxViews`
is reached, later reads return expired.

## Deployment

Recommended deployment:

1. Create a free Postgres database on Neon.
2. Add `DATABASE_URL` to the Vercel project environment variables.
3. Deploy this repository to Vercel.
4. Run `npx prisma migrate deploy` during deployment or from a trusted local
   machine against the production database.

The `postinstall` script runs `prisma generate`, so the Prisma client is created
automatically during Vercel installs.

## Design Notes

Paste IDs use `nanoid(10)` for short, hard-to-guess links. Expiration is enforced
at read time: the app checks time expiry and current view count before returning
content, deletes expired rows opportunistically, and increments the view count for
successful reads.
