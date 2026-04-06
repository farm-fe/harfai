import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdirSync, rmSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { initCommand } from '../init.js';

const TEST_DIR = join(tmpdir(), 'harfai-cli-test-' + Date.now());

beforeEach(() => {
  mkdirSync(TEST_DIR, { recursive: true });
});

afterEach(() => {
  rmSync(TEST_DIR, { recursive: true, force: true });
});

describe('initCommand', () => {
  it('writes CLAUDE.md for claude agent', () => {
    initCommand({ agent: 'claude', cwd: TEST_DIR });
    expect(existsSync(join(TEST_DIR, 'CLAUDE.md'))).toBe(true);
    const content = readFileSync(join(TEST_DIR, 'CLAUDE.md'), 'utf-8');
    expect(content).toContain('CLAUDE.md');
    expect(content).toContain('pnpm');
  });

  it('writes .cursorrules for cursor agent', () => {
    initCommand({ agent: 'cursor', cwd: TEST_DIR });
    expect(existsSync(join(TEST_DIR, '.cursorrules'))).toBe(true);
  });

  it('writes .trae/config.yaml for trae agent', () => {
    initCommand({ agent: 'trae', cwd: TEST_DIR });
    expect(existsSync(join(TEST_DIR, '.trae/config.yaml'))).toBe(true);
  });

  it('writes copilot instructions for copilot agent', () => {
    initCommand({ agent: 'copilot', cwd: TEST_DIR });
    expect(existsSync(join(TEST_DIR, '.github/copilot-instructions.md'))).toBe(true);
  });

  it('writes all configs when agent=all', () => {
    initCommand({ agent: 'all', cwd: TEST_DIR });
    expect(existsSync(join(TEST_DIR, 'CLAUDE.md'))).toBe(true);
    expect(existsSync(join(TEST_DIR, '.cursorrules'))).toBe(true);
    expect(existsSync(join(TEST_DIR, '.trae/config.yaml'))).toBe(true);
    expect(existsSync(join(TEST_DIR, '.github/copilot-instructions.md'))).toBe(true);
  });

  it('does not throw for unknown agent', () => {
    expect(() => initCommand({ agent: 'unknown-agent', cwd: TEST_DIR })).not.toThrow();
  });

  describe('workflow flag', () => {
    it('writes superpower brainstorm template when workflow=superpower', () => {
      initCommand({ agent: 'generic', workflow: 'superpower', cwd: TEST_DIR });
      const outPath = join(TEST_DIR, '.openspec/brainstorms/template.md');
      expect(existsSync(outPath)).toBe(true);
      const content = readFileSync(outPath, 'utf-8');
      expect(content).toContain('Brainstorm:');
      expect(content).toContain('Selected Approach');
      expect(content).toContain('Next Steps');
    });

    it('writes openspec proposal template when workflow=openspec', () => {
      initCommand({ agent: 'generic', workflow: 'openspec', cwd: TEST_DIR });
      const outPath = join(TEST_DIR, '.openspec/proposals/template.md');
      expect(existsSync(outPath)).toBe(true);
      const content = readFileSync(outPath, 'utf-8');
      expect(content).toContain('OpenSpec:');
      expect(content).toContain('Test Command');
      expect(content).toContain('Done When');
      expect(content).toContain('Status');
    });

    it('writes both templates when workflow=all', () => {
      initCommand({ agent: 'generic', workflow: 'all', cwd: TEST_DIR });
      expect(existsSync(join(TEST_DIR, '.openspec/brainstorms/template.md'))).toBe(true);
      expect(existsSync(join(TEST_DIR, '.openspec/proposals/template.md'))).toBe(true);
    });

    it('does not throw for unknown workflow', () => {
      expect(() =>
        initCommand({ agent: 'generic', workflow: 'unknown-workflow', cwd: TEST_DIR }),
      ).not.toThrow();
    });

    it('workflow flag takes priority over agent flag', () => {
      initCommand({ agent: 'claude', workflow: 'superpower', cwd: TEST_DIR });
      // When workflow is set, only workflow output is written (not the agent file)
      expect(existsSync(join(TEST_DIR, '.openspec/brainstorms/template.md'))).toBe(true);
      expect(existsSync(join(TEST_DIR, 'CLAUDE.md'))).toBe(false);
    });
  });
});
