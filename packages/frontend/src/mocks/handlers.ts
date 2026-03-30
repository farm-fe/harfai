import { http, HttpResponse } from 'msw';
import type { User } from '@harfai/shared';

const mockUsers: User[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Alice Smith',
    email: 'alice@example.com',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
];

export const handlers = [
  http.get('/api/v1/users', () =>
    HttpResponse.json({
      data: mockUsers,
      total: mockUsers.length,
      page: 1,
      limit: 20,
      totalPages: 1,
    }),
  ),
  http.get('/api/v1/users/:id', ({ params }) => {
    const user = mockUsers.find((u) => u.id === params['id']);
    if (!user) return HttpResponse.json({ title: 'Not Found', status: 404 }, { status: 404 });
    return HttpResponse.json(user);
  }),
  http.post('/api/v1/users', async ({ request }) => {
    const body = (await request.json()) as { name: string; email: string };
    const newUser: User = {
      id: '550e8400-e29b-41d4-a716-446655440099',
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return HttpResponse.json(newUser, { status: 201 });
  }),
  http.get('/api/v1/health', () =>
    HttpResponse.json({ status: 'ok', timestamp: new Date().toISOString(), version: '0.1.0' }),
  ),
];
