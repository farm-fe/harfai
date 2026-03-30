import type { AgentTemplate } from '../index.js';

export const claudeTemplate: AgentTemplate = {
  outputPath: 'CLAUDE.md',
  content: `# CLAUDE.md

This file configures Claude Code for the Harfai framework.
See [AGENTS.md](./AGENTS.md) for full project conventions and agent ground rules.

## Quick Reference

- **Build**: \`pnpm build\`
- **Dev**: \`pnpm dev\`
- **Test**: \`pnpm test\`
- **Lint**: \`pnpm lint\`
- **E2E**: \`pnpm test:e2e\`
- **OpenAPI validate**: \`pnpm openapi:validate\`

## Stack

- Frontend: React 18 + FarmFE (port 9000)
- Backend: Koa 2 + FarmFE (port 3000)
- Shared types: @harfai/shared (Zod schemas)
- Testing: Vitest (unit) + Playwright (E2E)

## Key Rules

1. OpenAPI-first: update \`packages/openapi/spec.yaml\` before adding endpoints.
2. All code changes require tests (Vitest unit + Playwright E2E for user-facing flows).
3. Update \`AGENTS.md\` and \`docs/\` in the same commit as structural changes.
4. Run \`pnpm lint\` and \`pnpm test\` before finishing any task.
5. No \`any\` in TypeScript unless commented with justification.
`,
};
