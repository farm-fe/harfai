import type { ConfigTemplate } from '../index.js';

export const genericTemplate: ConfigTemplate = {
  outputPath: 'AGENTS.md',
  content: `# AGENTS.md

This project uses the Harfai framework.

## Quick Reference

- Build: \`pnpm build\`
- Dev: \`pnpm dev\`
- Test: \`pnpm test && pnpm test:e2e\`
- Lint: \`pnpm lint\`
- Format: \`pnpm format\`

## Stack

- Frontend: React 18 + FarmFE
- Backend: Koa 2 + FarmFE
- Shared: @harfai/shared (Zod schemas + utils)
- Testing: Vitest + Playwright

## Development Workflow (Required)

Every non-trivial change **must** follow the **Superpower → OpenSpec** workflow:

1. **Brainstorm first** (Superpower): Create \`.openspec/brainstorms/<YYYY-MM-DD>-<slug>.md\` — explore at least two approaches, document trade-offs, select a direction.
2. **Propose** (OpenSpec): Create \`.openspec/proposals/<slug>.md\` — reference the brainstorm, break work into independently testable tasks with \`Test Command\` entries.
3. **Implement**: Work through tasks in order; a task is done only when its test command exits with code 0.

See [docs/superpower.md](./docs/superpower.md) and [docs/openspec.md](./docs/openspec.md) for full guides.
`,
};
