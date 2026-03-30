import type { AgentTemplate } from '../index.js';

export const genericTemplate: AgentTemplate = {
  outputPath: 'AGENTS.md',
  content: `# AGENTS.md

This project uses the Harfai framework.
See the full [AGENTS.md](./AGENTS.md) for complete conventions and agent ground rules.

## Quick Reference

- Build: \`pnpm build\`
- Dev: \`pnpm dev\`
- Test: \`pnpm test && pnpm test:e2e\`
- Lint: \`pnpm lint\`

## Stack
- Frontend: React 18 + FarmFE
- Backend: Koa 2 + FarmFE
- Shared: @harfai/shared (Zod schemas + utils)
- Testing: Vitest + Playwright
`,
};
