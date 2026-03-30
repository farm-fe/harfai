import type { ConfigTemplate } from '../index.js';

export const copilotTemplate: ConfigTemplate = {
  outputPath: '.github/copilot-instructions.md',
  content: `# GitHub Copilot Instructions for Harfai

See [AGENTS.md](../AGENTS.md) for the full agent guide.

## Project: Harfai Full-Stack Framework

**Stack**: React 18 + FarmFE (frontend) | Koa 2 + FarmFE (backend) | pnpm monorepo

## Suggestions Guidelines

### Always use:
- \`@harfai/shared\` Zod schemas for validation (both frontend and backend)
- TanStack Query hooks for data fetching in React components
- \`@koa/router\` for Koa routes with \`/api/v1/\` prefix
- Tailwind CSS v4 utility classes directly in JSX for styling
- pino for backend logging

### Never use:
- \`axios\` (use fetch + TanStack Query)
- \`express\` or \`fastify\` (use Koa)
- \`moment\` (use Intl or date-fns)
- Inline styles in React (use Tailwind CSS utility classes)
- Class components (use functional components)

## Workflow
1. Check \`packages/openapi/spec.yaml\` before implementing new API endpoints.
2. All new features need Vitest tests.
3. All new user-facing flows need Playwright tests in \`packages/e2e/tests/\`.
4. Update \`AGENTS.md\` and \`docs/\` when making structural changes.

## Required: Superpower → OpenSpec Development Process

Every non-trivial change **must** follow this workflow:

1. **Brainstorm first** (Superpower): Create \`.openspec/brainstorms/<YYYY-MM-DD>-<slug>.md\` — explore at least two approaches, document trade-offs, select a direction.
2. **Propose** (OpenSpec): Create \`.openspec/proposals/<slug>.md\` — reference the brainstorm, break work into independently testable tasks with \`Test Command\` entries.
3. **Implement**: Work through tasks in order; a task is done only when its test command exits with code 0.

See [docs/superpower.md](../docs/superpower.md) and [docs/openspec.md](../docs/openspec.md) for full guides.
`,
};
