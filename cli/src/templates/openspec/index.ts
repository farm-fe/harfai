import type { ConfigTemplate } from '../index.js';

export const openspecTemplate: ConfigTemplate = {
  outputPath: '.openspec/proposals/template.md',
  content: `# OpenSpec: <Feature / Change Title>

**Status**: \`draft\`
**Date**: YYYY-MM-DD
**Author**: <name or agent>
**Brainstorm**: \`.openspec/brainstorms/<slug>.md\`

---

## Problem Statement

_What problem does this proposal solve? One paragraph._

---

## Proposed Solution

_High-level description of the approach chosen during brainstorm._

---

## Tasks

### Task 1: <Title>

**Status**: \`pending\`

**Description**: _What needs to be built or changed._

**Acceptance Criteria**:

- [ ] ...
- [ ] ...

**Test Command**:

\`\`\`bash
pnpm --filter <package> test <test-file-pattern>
\`\`\`

**Done When**: All acceptance criteria above are satisfied AND the test command
exits with code 0.

---

### Task 2: <Title>

**Status**: \`pending\`

**Description**: ...

**Acceptance Criteria**:

- [ ] ...

**Test Command**:

\`\`\`bash
pnpm --filter <package> test <test-file-pattern>
\`\`\`

**Done When**: All acceptance criteria above are satisfied AND the test command
exits with code 0.

---

## Out of Scope

_Explicitly list what this proposal does NOT cover._

---

## Open Questions

_Unresolved issues that need answers before or during implementation._
`,
};
