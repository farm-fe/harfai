import { v4 as uuidv4 } from 'uuid';
import type { User, CreateUserInput, UpdateUserInput } from './schema.js';

// In-memory store (replace with a real DB in production)
const users = new Map<string, User>();

export async function findAllUsers(
  page: number,
  limit: number,
): Promise<{ data: User[]; total: number }> {
  const all = Array.from(users.values());
  const start = (page - 1) * limit;
  return {
    data: all.slice(start, start + limit),
    total: all.length,
  };
}

export async function findUserById(id: string): Promise<User | undefined> {
  return users.get(id);
}

export async function createUser(input: CreateUserInput): Promise<User> {
  const now = new Date().toISOString();
  const user: User = {
    id: uuidv4(),
    ...input,
    createdAt: now,
    updatedAt: now,
  };
  users.set(user.id, user);
  return user;
}

export async function updateUser(id: string, input: UpdateUserInput): Promise<User | undefined> {
  const existing = users.get(id);
  if (!existing) return undefined;
  const updated: User = {
    ...existing,
    ...input,
    updatedAt: new Date().toISOString(),
  };
  users.set(id, updated);
  return updated;
}

export async function deleteUser(id: string): Promise<boolean> {
  return users.delete(id);
}

/** Reset the in-memory store (for testing). */
export function _resetStore(): void {
  users.clear();
}
