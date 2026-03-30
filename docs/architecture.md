# Architecture

## Overview

Harfai is a **pnpm monorepo** with a clean separation between frontend, backend, and shared concerns. Both frontend and backend are bundled by **FarmFE** — a Rust-powered build tool that provides fast HMR and production builds.

```
Browser ──► React SPA (FarmFE) ──► Koa API (FarmFE Node) ──► Services / DB
              @harfai/frontend        @harfai/backend
                    │                       │
                    └─────── @harfai/shared ─┘
                             (Zod schemas, types)
```

## Package Responsibilities

### `@harfai/frontend`

- Single-page React 18 application
- Served from the same origin as the API in production (Koa serves static assets)
- FarmFE dev server with HMR during development
- Communicates with backend exclusively through `/api/v1/` REST endpoints
- Type-safe API clients generated from the OpenAPI spec

### `@harfai/backend`

- Koa 2 HTTP server, compiled to Node CJS by FarmFE
- REST API under `/api/v1/`
- Serves compiled frontend assets in production
- Validates all input with Zod
- Structured JSON logging via pino

### `@harfai/shared`

- Pure TypeScript — no framework dependencies
- Zod validation schemas that work in both browser and Node
- TypeScript interfaces and enums

### `@harfai/openapi`

- Single source of truth: `spec.yaml` (OpenAPI 3.1)
- Validates spec on CI
- Generates TypeScript types for frontend client usage

### `@harfai/e2e`

- Playwright test suite
- Runs against a real (or containerized) backend
- Mocks external third-party services at the network level with Playwright's `route` API

### `@harfai/cli`

- `create-harfai` CLI binary
- Scaffolds new Harfai projects or injects agent config into existing projects

## Data Flow

```
User Action
  │
  ▼
React Component (UI)
  │ TanStack Query hook
  ▼
API Client (fetch + generated types)
  │ HTTP /api/v1/...
  ▼
Koa Router → Controller → Service
  │
  ▼
Database / External Service
```

## Development Ports

| Service  | Dev Port | Description                           |
| -------- | -------- | ------------------------------------- |
| Frontend | 9000     | FarmFE dev server with HMR            |
| Backend  | 3000     | Koa server (nodemon via FarmFE watch) |

In production, Koa listens on `PORT` (default 3000) and serves both API and static assets.

## Environment Variables

| Variable       | Required   | Default                 | Description                |
| -------------- | ---------- | ----------------------- | -------------------------- |
| `PORT`         | No         | `3000`                  | Backend HTTP port          |
| `NODE_ENV`     | No         | `development`           | Node environment           |
| `DATABASE_URL` | Yes (prod) | —                       | Database connection string |
| `CORS_ORIGIN`  | No         | `http://localhost:9000` | Allowed CORS origin        |
| `LOG_LEVEL`    | No         | `info`                  | Pino log level             |

See `.env.example` for a full template.
