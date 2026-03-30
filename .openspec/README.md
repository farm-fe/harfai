# OpenSpec Directory

This directory stores brainstorm documents and structured proposals following
the Harfai **Superpower → OpenSpec** development workflow.

See the full guides:

- [docs/superpower.md](../docs/superpower.md) — brainstorming workflow
- [docs/openspec.md](../docs/openspec.md) — proposal & task workflow

## Structure

```
.openspec/
├── README.md                   ← you are here
├── brainstorms/                ← Superpower output; one file per brainstorm
│   └── YYYY-MM-DD-<slug>.md
└── proposals/                  ← OpenSpec proposals; one file per feature
    └── <slug>.md
```

## Quick Start

Scaffold a brainstorm or proposal with the CLI:

```bash
# scaffold both templates
npx create-harfai init --workflow superpower  # → .openspec/brainstorms/template.md
npx create-harfai init --workflow openspec    # → .openspec/proposals/template.md
```

## Rules

1. Every proposal must reference a brainstorm (`Brainstorm:` field).
2. Every task inside a proposal must have a `Test Command`.
3. A task moves to `done` **only** when its test command exits with code 0.
4. Do not delete or modify completed proposals — they serve as a change log.
