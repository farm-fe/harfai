import { test, expect } from '@playwright/test';

const API_URL = process.env['API_URL'] ?? 'http://localhost:3000';

test.describe('Users API', () => {
  test('GET /api/v1/users returns empty list initially', async ({ request }) => {
    const res = await request.get(`${API_URL}/api/v1/users`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('data');
    expect(body).toHaveProperty('total');
    expect(Array.isArray(body.data)).toBe(true);
  });

  test('POST /api/v1/users creates a user', async ({ request }) => {
    const res = await request.post(`${API_URL}/api/v1/users`, {
      data: { name: 'E2E User', email: 'e2e@example.com' },
    });
    expect(res.status()).toBe(201);
    const user = await res.json();
    expect(user.name).toBe('E2E User');
    expect(user.email).toBe('e2e@example.com');
    expect(user.id).toBeTruthy();
  });

  test('POST /api/v1/users returns 400 for invalid input', async ({ request }) => {
    const res = await request.post(`${API_URL}/api/v1/users`, {
      data: { name: '', email: 'bad-email' },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.title).toBe('Validation Error');
  });
});
