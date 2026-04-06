# Superpower: Brainstorming Skill

## Overview

**Superpower** is the Harfai brainstorming workflow. Before committing to any
design or implementation, AI agents (and humans) use Superpower to freely
explore ideas, surface trade-offs, and choose a direction. The output feeds
directly into an [OpenSpec proposal](./openspec.md).

---

## When to Use Superpower

Use Superpower at the _beginning_ of any non-trivial work:

- New features or user-facing flows
- Significant refactors or architecture changes
- New API resources or OpenAPI additions
- Dependency upgrades with multiple viable options
- Anything where the right approach is unclear

> **Rule of thumb**: if a task takes more than ~30 minutes, start with
> Superpower.

---

## Brainstorm Document Format

Create a brainstorm file at `.openspec/brainstorms/<YYYY-MM-DD>-<slug>.md`
using the template below (or scaffold it with the CLI):

```bash
npx create-harfai init --workflow superpower
```

### Template

```markdown
# Brainstorm: <Topic>

**Date**: YYYY-MM-DD  
**Author**: <name or agent>  
**Goal**: _One sentence describing the problem or opportunity._

---

## Context

_Background, constraints, or prior art relevant to the problem._

---

## Ideas

### Idea 1: <Name>

**Description**: ...  
**Pros**: ...  
**Cons**: ...  
**Effort**: Low | Medium | High

---

### Idea 2: <Name>

**Description**: ...  
**Pros**: ...  
**Cons**: ...  
**Effort**: Low | Medium | High

---

## Selected Approach

_Which idea(s) move forward and why._

---

## Next Steps

→ Create OpenSpec proposal: `.openspec/proposals/<slug>.md`
```

---

## Brainstorming Rules

1. **No editing during brainstorm** — capture ideas as they come; refine later.
2. **At least two alternatives** — always compare at least two different
   approaches before selecting one.
3. **Document the "why not"** — rejected ideas and their reasons are valuable;
   keep them in the file.
4. **Time-box** — aim for 15–30 minutes of brainstorming before moving to
   OpenSpec.
5. **Output is a decision** — the brainstorm must end with a clearly selected
   approach and a link to (or intent to create) an OpenSpec proposal.

---

## Integration with OpenSpec

```
Superpower (brainstorm)  ──→  OpenSpec (proposal + tasks)  ──→  Implementation
```

Once the brainstorm is complete and a direction is chosen:

1. Create an OpenSpec proposal referencing the brainstorm file.
2. Break the selected approach into concrete, testable tasks.
3. Follow the [OpenSpec workflow](./openspec.md) from that point forward.
