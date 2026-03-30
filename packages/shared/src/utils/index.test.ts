import { describe, it, expect } from 'vitest';
import { clamp, omit, pick, formatDate } from '../utils/index.js';

describe('clamp', () => {
  it('returns value when within range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });
  it('clamps to min', () => {
    expect(clamp(-1, 0, 10)).toBe(0);
  });
  it('clamps to max', () => {
    expect(clamp(11, 0, 10)).toBe(10);
  });
});

describe('omit', () => {
  it('omits specified keys', () => {
    const result = omit({ a: 1, b: 2, c: 3 }, ['a', 'c']);
    expect(result).toEqual({ b: 2 });
  });
  it('does not mutate the original object', () => {
    const original = { a: 1, b: 2 };
    omit(original, ['a']);
    expect(original).toEqual({ a: 1, b: 2 });
  });
});

describe('pick', () => {
  it('picks specified keys', () => {
    const result = pick({ a: 1, b: 2, c: 3 }, ['a', 'c']);
    expect(result).toEqual({ a: 1, c: 3 });
  });
});

describe('formatDate', () => {
  it('formats a date string', () => {
    const result = formatDate('2024-01-15T00:00:00.000Z', 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    });
    expect(result).toContain('2024');
    expect(result).toContain('January');
    expect(result).toContain('15');
  });
});
