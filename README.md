# Harfai

> **Full-stack self-evolution framework** powered by [FarmFE](https://www.farmfe.org/) and Harness Engineering.

[![CI](https://github.com/farm-fe/harfai/actions/workflows/ci.yml/badge.svg)](https://github.com/farm-fe/harfai/actions/workflows/ci.yml)

---

## What is Harfai?

Harfai is a **production-ready, AI-agent-aware full-stack framework** that combines:

- ⚡ **FarmFE** for blazing-fast builds on both frontend and backend
- ⚛️ **React 18** with best-practice patterns (TanStack Query, Zustand, React Router)
- 🐨 **Koa 2** with OpenAPI-first REST API design
- 🧪 **Vitest** (unit/integration) + **Playwright** (E2E) testing with automatic mocking
- 📐 **Strict TypeScript** + ESLint + Prettier enforcement
- 🤖 **AI-agent first** — ships with configs for Claude Code, Cursor, Trae, and GitHub Copilot

---

## Project Structure

```
harfai/
├── AGENTS.md                   ← AI agent instructions & project conventions
├── docs/                       ← Detailed guides
│   ├── architecture.md
│   ├── frontend.md
│   ├── backend.md
│   ├── testing.md
│   ├── openapi.md
│   └── agent-integration.md
├── packages/
│   ├── frontend/               ← @harfai/frontend  (React + FarmFE, port 9000)
│   ├── backend/                ← @harfai/backend   (Koa + FarmFE, port 3000)
│   ├── shared/                 ← @harfai/shared    (Zod schemas + utils)
│   ├── openapi/                ← @harfai/openapi   (OpenAPI 3.1 spec)
│   └── e2e/                    ← @harfai/e2e       (Playwright tests)
└── cli/                        ← @harfai/cli       (create-harfai)
```

---

## Quick Start

### Prerequisites

- Node.js ≥ 18
- pnpm ≥ 9 (`npm install -g pnpm`)

### Setup

```bash
git clone https://github.com/farm-fe/harfai
cd harfai
pnpm install
pnpm dev          # Start frontend (:9000) and backend (:3000) concurrently
```

### Individual packages

```bash
pnpm --filter @harfai/backend dev     # Koa server with hot reload
pnpm --filter @harfai/frontend dev    # React dev server with HMR
```

---

## Commands

| Command                 | Description                      |
| ----------------------- | -------------------------------- |
| `pnpm dev`              | Start all services in dev mode   |
| `pnpm build`            | Build all packages               |
| `pnpm test`             | Run all unit & integration tests |
| `pnpm test:e2e`         | Run Playwright E2E tests         |
| `pnpm lint`             | ESLint across all packages       |
| `pnpm format`           | Prettier formatting              |
| `pnpm openapi:validate` | Validate OpenAPI spec            |
| `pnpm openapi:generate` | Generate types from spec         |

---

## Development Workflow

Harfai uses a two-stage AI-agent workflow for all non-trivial changes:

### 1. Superpower — Brainstorm first

Before any implementation, brainstorm freely to explore approaches and select the best one.

```bash
# Scaffold a brainstorm template
npx create-harfai init --workflow superpower
# Edit .openspec/brainstorms/template.md — rename to YYYY-MM-DD-<slug>.md
```

### 2. OpenSpec — Design testable tasks

Convert the chosen approach into a structured proposal where every task has a test command. A task is only `done` when its tests pass.

```bash
# Scaffold a proposal template
npx create-harfai init --workflow openspec
# Edit .openspec/proposals/template.md — rename to <slug>.md
```

See [docs/superpower.md](docs/superpower.md) and [docs/openspec.md](docs/openspec.md) for the full workflow guides.

---

## AI Agent Support

Initialize agent-specific config files using the CLI:

```bash
# Claude Code
npx create-harfai init --agent claude

# Cursor
npx create-harfai init --agent cursor

# Trae
npx create-harfai init --agent trae

# GitHub Copilot
npx create-harfai init --agent copilot

# All at once
npx create-harfai init --agent all
```

See [docs/agent-integration.md](docs/agent-integration.md) and [AGENTS.md](AGENTS.md) for full details.

---

## Tech Stack

| Layer      | Technology                                         |
| ---------- | -------------------------------------------------- |
| Build      | FarmFE ^1.0                                        |
| Frontend   | React 18, React Router v6, Zustand, TanStack Query |
| Styling    | CSS Modules                                        |
| Backend    | Koa 2, @koa/router, pino                           |
| Validation | Zod (shared)                                       |
| API spec   | OpenAPI 3.1                                        |
| Unit tests | Vitest                                             |
| E2E tests  | Playwright                                         |
| Linting    | ESLint + Prettier                                  |
| Packages   | pnpm workspaces                                    |

---

## Contributing

1. Read [AGENTS.md](AGENTS.md) — it applies to humans too!
2. Open an issue or draft PR describing the change.
3. All PRs must pass CI (lint + tests + E2E).
4. Update `docs/` in the same PR as any structural change.

---

## License

MIT © farm-fe
