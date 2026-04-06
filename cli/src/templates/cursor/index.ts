import type { ConfigTemplate } from '../index.js';

export const cursorTemplate: ConfigTemplate = {
  outputPath: '.cursorrules',
  content: `# Cursor Rules for Harfai

See AGENTS.md for full conventions. Key rules:

## Tech Stack (do not deviate)
- Build: FarmFE (not Vite/Webpack)
- Frontend: React 18, React Router v6, Zustand, TanStack Query, CSS Modules
- Backend: Koa 2, @koa/router, koa-body, pino
- Validation: Zod (shared between frontend and backend via @harfai/shared)
- Testing: Vitest + Playwright
- Package manager: pnpm

## Code Style
- TypeScript strict mode: no \`any\`
- Functional React components only
- One component per file, CSS Modules for styling
- TanStack Query for all data fetching (no direct useEffect fetch)
- Zod schemas defined in @harfai/shared, imported by both packages

## Workflow
- Add OpenAPI entry before implementing new endpoints
- Write tests for every new feature
- Run \`pnpm lint && pnpm test\` before finishing

## File Structure
- Frontend pages: packages/frontend/src/pages/<Page>/
- Frontend components: packages/frontend/src/components/<Component>/
- Backend routes: packages/backend/src/routes/<resource>/
- Shared schemas: packages/shared/src/schemas/
`,
};
