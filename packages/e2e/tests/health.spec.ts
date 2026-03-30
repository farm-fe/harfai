import { test, expect } from '@playwright/test';

const API_URL = process.env['API_URL'] ?? 'http://localhost:3000';

test.describe('Health API', () => {
  test('GET /health returns 200 with status ok', async ({ request }) => {
    const res = await request.get(`${API_URL}/health`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.status).toBe('ok');
    expect(body).toHaveProperty('timestamp');
    expect(body).toHaveProperty('version');
  });
});
