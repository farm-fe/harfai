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
});
