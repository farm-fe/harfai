# Agent Integration Guide

## Overview

Harfai ships with first-class support for AI coding agents. The `create-harfai` CLI scaffolds configuration files for the most popular agents so they understand the project's conventions out of the box.

## Supported Agents

| Agent          | Config File                       | CLI Flag          |
| -------------- | --------------------------------- | ----------------- |
| Claude Code    | `CLAUDE.md`                       | `--agent claude`  |
| Cursor         | `.cursorrules`                    | `--agent cursor`  |
| Trae           | `.trae/config.yaml`               | `--agent trae`    |
| GitHub Copilot | `.github/copilot-instructions.md` | `--agent copilot` |
| Generic        | `AGENTS.md` (already present)     | `--agent generic` |

## CLI Usage

### Initialize a New Harfai Project

```bash
npx create-harfai my-app
cd my-app
```

### Add Agent Config to an Existing Project

```bash
npx create-harfai init --agent claude
npx create-harfai init --agent cursor
npx create-harfai init --agent trae
npx create-harfai init --agent copilot
```

### Add All Agent Configs

```bash
npx create-harfai init --agent all
```

## What Each Config Does

### Claude Code (`CLAUDE.md`)

Tells Claude about the project structure, tech stack constraints, and workflow. Points to `AGENTS.md` for full details. Enables Claude's auto-update behaviour.

### Cursor (`.cursorrules`)

Provides Cursor with inline rules for code generation. Enforces the tech stack (FarmFE, React, Koa) and code style. References `docs/` for detailed guidance.

### Trae (`.trae/config.yaml`)

YAML-structured config that maps Harfai's project structure to Trae's workspace model.

### GitHub Copilot (`.github/copilot-instructions.md`)

Markdown instructions injected into Copilot's context for this repository. Covers coding conventions, test requirements, and OpenAPI-first workflow.

## Agent Responsibilities

All agents working in this repo **must**:

1. Read `AGENTS.md` before making changes.
2. Update `AGENTS.md` and the relevant `docs/*.md` file in the same commit as code changes.
3. Run `pnpm lint` and `pnpm test` before considering a change complete.
4. Follow the OpenAPI-first workflow for API changes.
5. Write tests for every new behaviour.

## Keeping Configs In Sync

Agent config files are generated from templates in `cli/src/templates/`. When the project evolves:

1. Update the template in `cli/src/templates/<agent>/`.
2. Re-run `npx create-harfai init --agent <agent>` to refresh the config.
3. Commit both the template and the generated config.

The CI pipeline checks that generated configs are up to date with their templates.
