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

### Superpower: Brainstorming Workflow

Before committing to any design or implementation, use **Superpower** to freely
explore ideas, surface trade-offs, and pick a direction.

- **When**: any non-trivial feature, refactor, or API addition.
- **Output**: a brainstorm file at `.openspec/brainstorms/<YYYY-MM-DD>-<slug>.md`.
- **Rules**:
  1. Always document at least two alternative approaches.
  2. Record rejected ideas and _why_ they were rejected.
  3. End the brainstorm with a clearly selected approach.
  4. Transition immediately to an OpenSpec proposal when done.
- **Scaffold**: `npx create-harfai init --workflow superpower`
- **Full guide**: [docs/superpower.md](docs/superpower.md)

### OpenSpec: Proposal & Task Workflow

After Superpower selects a direction, use **OpenSpec** to design a structured
proposal with explicit, testable tasks.

- **When**: always follow a Superpower brainstorm.
- **Output**: a proposal file at `.openspec/proposals/<slug>.md`.
- **Rules**:
  1. Every task **must** include a `Test Command` (shell command that exits 0 when passing).
  2. A task is only `done` when the test command exits with code 0 — never mark it done otherwise.
  3. Tasks must be small enough to be completed and tested independently.
  4. Proposals follow the lifecycle: `draft → review → accepted → in-progress → done`.
- **Scaffold**: `npx create-harfai init --workflow openspec`
- **Full guide**: [docs/openspec.md](docs/openspec.md)

### Combined Workflow

```
Superpower (brainstorm)  →  Select approach  →  OpenSpec (proposal + tasks)  →  Tests pass  →  Done
```

### React Best Practices

- Functional components only; no class components.
- State management: **Zustand** for global state, `useState`/`useReducer` for local state.
- Data fetching: **TanStack Query** (React Query) — never fetch in `useEffect` directly.
- Routing: **React Router v6** with file-based route organization under `src/pages/`.
- Styling: **Tailwind CSS v4** — use utility classes directly in JSX. Only use CSS Modules for cases that Tailwind cannot satisfy (e.g. complex keyframe animations, third-party component overrides).
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

| Layer              | Technology     | Version | Notes                                                        |
| ------------------ | -------------- | ------- | ------------------------------------------------------------ |
| Build (frontend)   | FarmFE         | `^1.0`  | `farm.config.ts` in each package                             |
| Build (backend)    | FarmFE         | `^1.0`  | Node output format                                           |
| Frontend framework | React          | `^18`   | With TypeScript                                              |
| Routing            | React Router   | `^6`    |                                                              |
| State              | Zustand        | `^4`    |                                                              |
| Data fetching      | TanStack Query | `^5`    |                                                              |
| Styling            | Tailwind CSS   | `^4`    | Utility-first; CSS Modules only when Tailwind cannot satisfy |
| Backend framework  | Koa            | `^2`    |                                                              |
| HTTP routing       | koa-router     | `^12`   |                                                              |
| Body parsing       | koa-body       | `^6`    |                                                              |
| Validation         | Zod            | `^3`    | Shared between frontend & backend                            |
| Logging            | pino           | `^9`    | Backend only                                                 |
| API spec           | OpenAPI        | `3.1`   | `packages/openapi/spec.yaml`                                 |
| Unit testing       | Vitest         | `^2`    |                                                              |
| E2E testing        | Playwright     | `^1.45` |                                                              |
| Linting            | ESLint         | `^9`    | Flat config                                                  |
| Formatting         | Prettier       | `^3`    |                                                              |
| Package manager    | pnpm           | `^9`    | Workspaces                                                   |
| Node               | ≥18            |         | LTS line                                                     |

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
├── .openspec/                  ← Superpower brainstorms & OpenSpec proposals
│   ├── README.md
│   ├── brainstorms/            ← .../YYYY-MM-DD-<slug>.md
│   └── proposals/              ← .../<slug>.md
├── docs/
│   ├── architecture.md
│   ├── frontend.md
│   ├── backend.md
│   ├── testing.md
│   ├── openapi.md
│   ├── superpower.md           ← Brainstorming workflow guide
│   ├── openspec.md             ← Proposal & task workflow guide
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

### Starting Any Non-Trivial Task

1. **Brainstorm** with Superpower — create `.openspec/brainstorms/<date>-<slug>.md`.
2. **Propose** with OpenSpec — create `.openspec/proposals/<slug>.md` with testable tasks.
3. Work through tasks; run each task's `Test Command` before marking it `done`.

### Adding a New API Endpoint

1. Brainstorm and propose with Superpower → OpenSpec (see above).
2. Add the endpoint to `packages/openapi/spec.yaml` (OpenAPI 3.1).
3. Run `pnpm openapi:generate` to regenerate client types.
4. Implement the Koa route in `packages/backend/src/routes/`.
5. Add input validation with Zod.
6. Write unit tests in `packages/backend/src/routes/*.test.ts`.
7. Add a Playwright test in `packages/e2e/tests/` if it's user-facing.
8. Update `docs/backend.md` if the route adds a new resource.

### Adding a New Frontend Feature

1. Brainstorm and propose with Superpower → OpenSpec (see above).
2. Create the page/component in `packages/frontend/src/pages/` or `components/`.
3. Use TanStack Query hooks from `packages/frontend/src/api/`.
4. Write unit/component tests with Vitest + React Testing Library.
5. Run `pnpm lint` and fix any issues.
6. Add an E2E scenario if the feature is user-facing.
7. Update `docs/frontend.md`.

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

## Branch Protection Policy

The `main` branch enforces the following merge requirements:

| Rule                       | Value                                              |
| -------------------------- | -------------------------------------------------- |
| Required status checks     | **Lint, Build & Test** and **E2E Tests** must pass |
| Up-to-date branch required | Yes — PR must be rebased/updated before merge      |
| Linear commit history      | Yes — squash or rebase only (no merge commits)     |
| Force-pushes               | Disabled                                           |
| Branch deletion            | Disabled                                           |
| Conversation resolution    | All PR threads must be resolved                    |
| Applies to admins          | Yes                                                |

Branch protection is applied by the workflow at
`.github/workflows/protect-main.yml` (triggered on push to `main` or via
`workflow_dispatch`). See `docs/branch-protection.md` for full details and
the manual curl command.

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

### Workflow Templates

The CLI also scaffolds workflow templates for the Superpower and OpenSpec skills:

| Workflow   | Command                                    | Output                              |
| ---------- | ------------------------------------------ | ----------------------------------- |
| Superpower | `create-harfai init --workflow superpower` | `.openspec/brainstorms/template.md` |
| OpenSpec   | `create-harfai init --workflow openspec`   | `.openspec/proposals/template.md`   |
| Both       | `create-harfai init --workflow all`        | both files above                    |

---

_Last updated automatically. Do not edit manually._
