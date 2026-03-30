# AGENTS.md — Harfai Self-Evolution Framework

> **Auto-maintained by AI agents.** Every structural, dependency, or architectural change must be reflected here and in the relevant `docs/` files.

---

## Overview

**Harfai** is a full-stack self-evolution framework built on [FarmFE](https://www.farmfe.org/) (for both frontend and backend bundling) and the React + Koa stack. It ships with strict lint rules, a well-defined tech stack, auto-generated E2E/unit tests, and an OpenAPI-first API layer.

The repo is a **pnpm monorepo** with the following packages:

| Package            | Path                | Purpose                               |
| ------------------ | ------------------- | ------------------------------------- |
| `@harfai/frontend` | `packages/frontend` | React 18 SPA built with FarmFE        |
| `@harfai/backend`  | `packages/backend`  | Koa HTTP server built with FarmFE     |
| `@harfai/shared`   | `packages/shared`   | Shared TypeScript types and utilities |
| `@harfai/openapi`  | `packages/openapi`  | OpenAPI 3.1 spec + codegen            |
| `@harfai/e2e`      | `packages/e2e`      | Playwright E2E test suite             |
| `@harfai/cli`      | `cli`               | `create-harfai` scaffolding CLI       |

---

## Agent Ground Rules

1. **Never skip lint or tests.** Every PR must pass `pnpm lint` and `pnpm test` (unit + E2E) before merge.
2. **Keep docs in sync.** When you change architecture, APIs, config, or dependencies, update the relevant `docs/*.md` file _in the same commit_.
3. **Update this file** when packages are added/removed, major dependencies change, or agent skills are added.
4. **OpenAPI first.** All new HTTP endpoints must have an OpenAPI 3.1 entry in `packages/openapi/spec.yaml` **before** implementation.
5. **Test every change.** New features require unit tests (Vitest). New user-facing flows require Playwright E2E tests. All tests mock external I/O (DB, network, file system).
6. **Strict TypeScript.** `strict: true` in every `tsconfig.json`. No `any` unless explicitly justified with a comment.
7. **No secret sprawl.** All secrets go in `.env` (gitignored). Provide `.env.example` for every new variable.

---

## Internal Skills

### React Best Practices

- Functional components only; no class components.
- State management: **Zustand** for global state, `useState`/`useReducer` for local state.
- Data fetching: **TanStack Query** (React Query) — never fetch in `useEffect` directly.
- Routing: **React Router v6** with file-based route organization under `src/pages/`.
- Styling: **CSS Modules** — one `*.module.css` per component; no inline styles except dynamic values.
- Performance: `React.memo`, `useMemo`, `useCallback` only when profiling shows benefit.
- Error boundaries: wrap every route-level component.
- Accessibility: all interactive elements must have accessible labels; run `axe-core` in CI.

### Full-Stack Best Practices

- **Monorepo** with pnpm workspaces; shared types live in `@harfai/shared`.
- **12-factor app**: config from environment, stateless processes, explicit dependencies.
- **API versioning**: all routes prefixed with `/api/v1/`.
- **Input validation**: Zod schemas on both frontend (form validation) and backend (request parsing).
- **Error responses**: follow RFC 7807 Problem Details JSON format.
- **Structured logging**: `pino` on the backend; correlate with a `X-Request-ID` header.
- **Database**: abstract behind a repository interface; use environment variables for connection strings.
- **CORS**: configured explicitly — no wildcard `*` in production.

### Koa Best Practices

- Middleware order: `errorHandler → requestId → cors → logger → bodyParser → router`.
- All route handlers are thin controllers that delegate to service functions.
- Use `koa-router` for routing; group by resource under `src/routes/`.
- Async/await throughout; never mix callbacks.
- Use `koa-body` for body parsing with explicit size limits.

### Testing Best Practices

- Unit tests colocated with source (`*.test.ts` / `*.test.tsx`).
- E2E tests in `packages/e2e/tests/`.
- Mock external services with `vi.mock` (Vitest) or MSW (network-level).
- Test file naming: `<feature>.test.ts` for unit, `<feature>.spec.ts` for E2E.
- Aim for ≥80% statement coverage on new code (measured by Vitest's V8 provider).

---

## Tech Stack Constraints

| Layer              | Technology     | Version | Notes                             |
| ------------------ | -------------- | ------- | --------------------------------- |
| Build (frontend)   | FarmFE         | `^1.0`  | `farm.config.ts` in each package  |
| Build (backend)    | FarmFE         | `^1.0`  | Node output format                |
| Frontend framework | React          | `^18`   | With TypeScript                   |
| Routing            | React Router   | `^6`    |                                   |
| State              | Zustand        | `^4`    |                                   |
| Data fetching      | TanStack Query | `^5`    |                                   |
| Styling            | CSS Modules    | native  |                                   |
| Backend framework  | Koa            | `^2`    |                                   |
| HTTP routing       | koa-router     | `^12`   |                                   |
| Body parsing       | koa-body       | `^6`    |                                   |
| Validation         | Zod            | `^3`    | Shared between frontend & backend |
| Logging            | pino           | `^9`    | Backend only                      |
| API spec           | OpenAPI        | `3.1`   | `packages/openapi/spec.yaml`      |
| Unit testing       | Vitest         | `^2`    |                                   |
| E2E testing        | Playwright     | `^1.45` |                                   |
| Linting            | ESLint         | `^9`    | Flat config                       |
| Formatting         | Prettier       | `^3`    |                                   |
| Package manager    | pnpm           | `^9`    | Workspaces                        |
| Node               | ≥18            |         | LTS line                          |

**Prohibited:**

- `webpack`, `vite`, `esbuild` as primary bundlers (use FarmFE)
- `axios` (use `fetch` + TanStack Query)
- `moment.js` (use `date-fns` or native `Intl`)
- `lodash` for trivial utilities (write or import specific functions)
- `express` or `fastify` (use Koa)

---

## Directory Structure

```
harfai/
├── AGENTS.md                   ← You are here
├── README.md
├── package.json                ← Root pnpm monorepo
├── pnpm-workspace.yaml
├── .prettierrc.yaml
├── .eslintrc-base.js           ← Shared ESLint base config
├── docs/
│   ├── architecture.md
│   ├── frontend.md
│   ├── backend.md
│   ├── testing.md
│   ├── openapi.md
│   └── agent-integration.md
├── packages/
│   ├── frontend/               ← @harfai/frontend
│   ├── backend/                ← @harfai/backend
│   ├── shared/                 ← @harfai/shared
│   ├── openapi/                ← @harfai/openapi
│   └── e2e/                    ← @harfai/e2e
└── cli/                        ← @harfai/cli (create-harfai)
```

---

## How Agents Should Work

### Adding a New API Endpoint

1. Add the endpoint to `packages/openapi/spec.yaml` (OpenAPI 3.1).
2. Run `pnpm openapi:generate` to regenerate client types.
3. Implement the Koa route in `packages/backend/src/routes/`.
4. Add input validation with Zod.
5. Write unit tests in `packages/backend/src/routes/*.test.ts`.
6. Add a Playwright test in `packages/e2e/tests/` if it's user-facing.
7. Update `docs/backend.md` if the route adds a new resource.

### Adding a New Frontend Feature

1. Create the page/component in `packages/frontend/src/pages/` or `components/`.
2. Use TanStack Query hooks from `packages/frontend/src/api/`.
3. Write unit/component tests with Vitest + React Testing Library.
4. Run `pnpm lint` and fix any issues.
5. Add an E2E scenario if the feature is user-facing.
6. Update `docs/frontend.md`.

### Updating Dependencies

1. Check for security advisories before upgrading.
2. Update only the packages that need it — avoid mass upgrades.
3. Run `pnpm test` and `pnpm lint` after upgrading.
4. Update the Tech Stack table in this file if a major version changes.

---

## CI Checks (must all pass)

- `pnpm lint` — ESLint across all packages
- `pnpm format:check` — Prettier formatting
- `pnpm build` — build all packages
- `pnpm test` — Vitest unit tests
- `pnpm test:e2e` — Playwright E2E tests
- `pnpm openapi:validate` — OpenAPI spec validity

---

## AI Agent Template Support

The `create-harfai` CLI (`cli/`) can scaffold agent config files for:

| Agent          | Command                              |
| -------------- | ------------------------------------ |
| Claude Code    | `create-harfai init --agent claude`  |
| Cursor         | `create-harfai init --agent cursor`  |
| Trae           | `create-harfai init --agent trae`    |
| GitHub Copilot | `create-harfai init --agent copilot` |
| Generic        | `create-harfai init --agent generic` |

Each template writes the appropriate config file (`.claude/settings.json`, `.cursorrules`, `.trae/config.yaml`, `.github/copilot-instructions.md`) and links back to this `AGENTS.md`.

---

_Last updated automatically. Do not edit manually._
