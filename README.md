# next-express-monorepo

A pnpm monorepo with a Next.js frontend and an Express API. The client talks to the server over HTTP; there is no database.

## What’s in this project

- **`apps/client`** – Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, ESLint. The home page fetches `/api/hello` and `/api/health` from the API and shows the response.
- **`apps/server`** – Express API in TypeScript (tsx in dev). Uses cors, dotenv, morgan, and winston. No database or ORM.

## Tech stack

| Area   | Stack |
|--------|--------|
| Root   | pnpm 10+, workspace with `apps/*` |
| Client | Next.js 16, React 19, Tailwind CSS 4, TypeScript 5 |
| Server | Express, cors, morgan, winston, dotenv, TypeScript, tsx |

## Project structure

```text
.
├── apps/
│   ├── client/              # Next.js app
│   │   ├── src/
│   │   │   └── app/         # App Router (layout.tsx, page.tsx, globals.css)
│   │   ├── public/
│   │   ├── package.json     # @repo/client
│   │   └── ...
│   └── server/              # Express API
│       ├── src/
│       │   ├── index.ts     # App entry, routes, CORS, morgan
│       │   └── logger.ts    # Winston logger
│       ├── package.json     # @repo/server
│       └── .env.example
├── package.json             # Root scripts (dev, build, typecheck, start)
├── pnpm-workspace.yaml       # packages: ["apps/*"]
└── README.md
```

## Quick start

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Copy env files:

   ```bash
   cp apps/server/.env.example apps/server/.env
   cp apps/client/.env.local.example apps/client/.env.local
   ```

3. Run client and server:

   ```bash
   pnpm dev
   ```

- Client: **http://localhost:3000**
- API: **http://localhost:4000**

## Scripts

| Command | Description |
|--------|--------------|
| `pnpm dev` | Run client and server in parallel (concurrently) |
| `pnpm dev:client` | Run only Next.js client |
| `pnpm dev:server` | Run only Express server |
| `pnpm build` | Build client then server |
| `pnpm typecheck` | Type-check both workspaces |
| `pnpm start` | Run built client and server (after `pnpm build`) |

Workspace-specific:

- **Client:** `pnpm --filter @repo/client dev | build | start | lint | typecheck`
- **Server:** `pnpm --filter @repo/server dev | build | start | typecheck`

## Environment

- **Server** (`apps/server/.env` from `.env.example`): `PORT`, `CORS_ORIGIN`, `LOG_LEVEL`
- **Client** (`apps/client/.env.local` from `.env.local.example`): `NEXT_PUBLIC_API_URL` (default `http://localhost:4000`)

## API

- `GET /api/health` – Returns `{ status, service, timestamp }`
- `GET /api/hello` – Returns `{ message: "Hello from Express API" }`

The client home page calls both and displays the message plus health status and timestamp.
