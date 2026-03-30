# AGENTS.md

This project uses the Harfai framework.

## Quick Reference

- Build: `pnpm build`
- Dev: `pnpm dev`
- Test: `pnpm test && pnpm test:e2e`
- Lint: `pnpm lint`
- Format: `pnpm format`

## Stack

- Frontend: React 18 + FarmFE
- Backend: Koa 2 + FarmFE
- Shared: @harfai/shared (Zod schemas + utils)
- Testing: Vitest + Playwright

## Development Workflow (Required)

Every non-trivial change **must** follow the **Superpower → OpenSpec** workflow:

```
Superpower brainstorm → Select approach → OpenSpec proposal → Tasks → Tests pass → Done
```

### Step 1: Brainstorm with Superpower

Before writing any code, create a brainstorm at `.openspec/brainstorms/<YYYY-MM-DD>-<slug>.md`.

- Explore at least two alternative approaches
- Document trade-offs (pros, cons, effort)
- Select a direction with justification
- See [docs/superpower.md](./docs/superpower.md) for the full guide

### Step 2: Propose with OpenSpec

Translate the selected approach into a proposal at `.openspec/proposals/<slug>.md`.

- Reference the brainstorm file in the `Brainstorm:` field
- Break work into independently testable tasks
- Each task **must** have a `Test Command` that exits 0 when done
- See [docs/openspec.md](./docs/openspec.md) for the full guide

### Step 3: Implement tasks

- Work through tasks in order
- Run the task's test command after each one
- A task is `done` only when its test command exits with code 0

### Rules

1. Every proposal must reference a brainstorm.
2. Every task must have a test command.
3. Tasks must be small enough to implement and test independently.
4. Never mark a task done without passing tests.
5. Do not delete completed proposals — they serve as a change log.
