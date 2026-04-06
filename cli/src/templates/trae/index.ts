import type { ConfigTemplate } from '../index.js';

export const traeTemplate: ConfigTemplate = {
  outputPath: '.trae/config.yaml',
  content: `# Trae configuration for Harfai
# See AGENTS.md for full project conventions.

project:
  name: harfai
  type: full-stack
  packageManager: pnpm
  monorepo: true

packages:
  - name: frontend
    path: packages/frontend
    type: react
    port: 9000
    buildTool: farmfe
  - name: backend
    path: packages/backend
    type: node
    port: 3000
    buildTool: farmfe
  - name: shared
    path: packages/shared
    type: library
  - name: openapi
    path: packages/openapi
    type: spec
  - name: e2e
    path: packages/e2e
    type: test
  - name: cli
    path: cli
    type: cli

rules:
  - openapi_first: true
  - require_tests: true
  - strict_typescript: true
  - no_any: true
  - test_runner: vitest
  - e2e_runner: playwright

commands:
  dev: pnpm dev
  build: pnpm build
  test: pnpm test
  e2e: pnpm test:e2e
  lint: pnpm lint
`,
};
