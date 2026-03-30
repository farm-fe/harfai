import { describe, it, expect } from 'vitest';
import { UserSchema, CreateUserSchema } from '../schemas/user.js';

describe('UserSchema', () => {
  it('validates a valid user', () => {
    const user = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Alice',
      email: 'alice@example.com',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    };
    expect(UserSchema.safeParse(user).success).toBe(true);
  });

  it('rejects invalid email', () => {
    const user = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Alice',
      email: 'not-an-email',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    };
    expect(UserSchema.safeParse(user).success).toBe(false);
  });

  it('rejects invalid UUID', () => {
    const user = {
      id: 'not-a-uuid',
      name: 'Alice',
      email: 'alice@example.com',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    };
    expect(UserSchema.safeParse(user).success).toBe(false);
  });
});

describe('CreateUserSchema', () => {
  it('does not require id or timestamps', () => {
    const input = { name: 'Bob', email: 'bob@example.com' };
    expect(CreateUserSchema.safeParse(input).success).toBe(true);
  });

  it('rejects empty name', () => {
    const input = { name: '', email: 'bob@example.com' };
    expect(CreateUserSchema.safeParse(input).success).toBe(false);
  });
});
