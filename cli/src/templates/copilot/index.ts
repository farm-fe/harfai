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
- CSS Modules for component styling
- pino for backend logging

### Never use:
- \`axios\` (use fetch + TanStack Query)
- \`express\` or \`fastify\` (use Koa)
- \`moment\` (use Intl or date-fns)
- Inline styles in React (use CSS Modules)
- Class components (use functional components)

## Workflow
1. Check \`packages/openapi/spec.yaml\` before implementing new API endpoints.
2. All new features need Vitest tests.
3. All new user-facing flows need Playwright tests in \`packages/e2e/tests/\`.
4. Update \`AGENTS.md\` and \`docs/\` when making structural changes.
`,
};
