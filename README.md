# Upstash QStash Example

Minimal, production-style example of using Upstash QStash with an Express worker.

## What is QStash?

QStash is an HTTP-based message queue and scheduler. You publish a message to QStash, and QStash delivers it to your API endpoint now or later (`notBefore`).

In this project, QStash is used to:
- send one message immediately
- send one message 5 minutes later
- call back `POST /api/send-email` for both jobs

## How it works in this repo

1. `POST /api/schedule` receives an email.
2. The server publishes two QStash messages (`apps/server/src/controller/schedule.controller.ts`).
3. QStash calls `POST /api/send-email`.
4. The worker verifies `upstash-signature` using QStash signing keys (`apps/server/src/controller/email.controller.ts`).
5. If valid, payload is processed (currently logged as demo output).

## Setup

### 1) Environment variables

Create `apps/server/.env`:

```env
PORT=4000
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=http
BASE_URL=https://your-public-url.example.com

QSTASH_TOKEN=...
QSTASH_CURRENT_SIGNING_KEY=...
QSTASH_NEXT_SIGNING_KEY=...
```

`BASE_URL` must be publicly reachable so QStash can call your endpoint. For local development, use a tunnel (for example ngrok or Cloudflare Tunnel).

### 2) Install and run

```bash
pnpm install
pnpm dev:server
```

- Server runs at `http://localhost:4000`

## Using QStash in this app

Trigger scheduling:

```bash
curl -X POST http://localhost:4000/api/schedule \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com"}'
```

Expected behavior:
- immediate callback to `/api/send-email`
- delayed callback ~5 minutes later

## Main endpoints

- `GET /api/health` - service health check
- `POST /api/schedule` - publish immediate + delayed QStash jobs
- `POST /api/send-email` - QStash callback target with signature verification
