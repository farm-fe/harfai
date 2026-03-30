import type { User, CreateUserInput, UpdateUserInput } from '@harfai/shared';

const API_BASE = '/api/v1';

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    ...init,
  });

  if (!res.ok) {
    const problem = await res.json().catch(() => ({ title: res.statusText, status: res.status }));
    throw new Error(problem.detail ?? problem.title ?? `HTTP ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  users: {
    list: (page = 1, limit = 20) =>
      apiFetch<{ data: User[]; total: number; page: number; limit: number; totalPages: number }>(
        `/users?page=${page}&limit=${limit}`,
      ),
    get: (id: string) => apiFetch<User>(`/users/${id}`),
    create: (input: CreateUserInput) =>
      apiFetch<User>('/users', { method: 'POST', body: JSON.stringify(input) }),
    update: (id: string, input: UpdateUserInput) =>
      apiFetch<User>(`/users/${id}`, { method: 'PATCH', body: JSON.stringify(input) }),
    delete: (id: string) => apiFetch<void>(`/users/${id}`, { method: 'DELETE' }),
  },
  health: {
    get: () => apiFetch<{ status: string; timestamp: string; version: string }>('/health'),
  },
};
