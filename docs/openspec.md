# OpenSpec: Proposal & Task Workflow

## Overview

**OpenSpec** is the Harfai structured-proposal workflow. After a
[Superpower brainstorm](./superpower.md) produces a selected approach, OpenSpec
captures it as a machine-readable proposal with explicit, testable tasks. A
task can only be marked **done** when its associated tests pass.

---

## When to Use OpenSpec

Use OpenSpec to design and track every non-trivial change:

- After a Superpower brainstorm selects a direction
- When a new API endpoint, page, or component is needed
- For refactors that touch multiple files or packages
- For dependency upgrades that require code changes

---

## File Location

Proposals live at `.openspec/proposals/<slug>.md`. Slug should be lowercase,
hyphenated, and descriptive (e.g. `user-authentication.md`).

Scaffold a new proposal with the CLI:

```bash
npx create-harfai init --workflow openspec
```

---

## Proposal Format

```markdown
# OpenSpec: <Feature / Change Title>

**Status**: `draft` | `review` | `accepted` | `in-progress` | `done`  
**Date**: YYYY-MM-DD  
**Author**: <name or agent>  
**Brainstorm**: `.openspec/brainstorms/<slug>.md` _(link to source brainstorm)_

---

## Problem Statement

_What problem does this proposal solve? One paragraph._

---

## Proposed Solution

_High-level description of the approach chosen during brainstorm._

---

## Tasks

Each task follows the schema below. A task moves to `done` **only** when its
test command exits with code 0.

---

### Task 1: <Title>

**Status**: `pending` | `in-progress` | `done`

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

_(repeat pattern)_

---

## Out of Scope

_Explicitly list what this proposal does NOT cover._

---

## Open Questions

_Unresolved issues that need answers before or during implementation._
```

---

## Task Lifecycle Rules

| Rule                                | Detail                                                                                               |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Every task has a test**           | A task without a `Test Command` is not valid. If testing is non-trivial, write the test first (TDD). |
| **Tests gate completion**           | Set `Status: done` only after running the test command and confirming exit code 0.                   |
| **One task, one concern**           | Tasks must be small enough to be completed and tested independently.                                 |
| **Status progression**              | `pending` → `in-progress` → `done`. Never skip steps or revert to `pending` after starting.          |
| **Failed tests block the proposal** | If tests fail, fix the implementation or update acceptance criteria — never silently mark done.      |

---

## Proposal Lifecycle

```
draft  →  review  →  accepted  →  in-progress  →  done
```

| Status        | Meaning                                      |
| ------------- | -------------------------------------------- |
| `draft`       | Being written; not ready for review          |
| `review`      | Ready for feedback; no implementation yet    |
| `accepted`    | Approved; implementation may begin           |
| `in-progress` | At least one task is `in-progress` or `done` |
| `done`        | All tasks are `done` (all tests pass)        |

---

## Integration with Superpower

The full workflow is:

```
Superpower brainstorm  →  Select approach  →  OpenSpec proposal  →  Tasks  →  Tests pass  →  Done
```

1. **Brainstorm** (Superpower): explore ideas, pick direction, save to
   `.openspec/brainstorms/`.
2. **Propose** (OpenSpec): translate the chosen approach into a proposal with
   tasks, each with a test command.
3. **Implement**: work through tasks in order; run tests after each one.
4. **Done**: when every task's test command passes, mark the proposal `done`.
