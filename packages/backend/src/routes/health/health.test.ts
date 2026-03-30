import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../../app.js';

describe('GET /health', () => {
  it('returns 200 with status ok', async () => {
    const app = createApp();
    const res = await request(app.callback()).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ status: 'ok' });
    expect(res.body).toHaveProperty('timestamp');
    expect(res.body).toHaveProperty('version');
  });

  it('sets X-Request-ID header', async () => {
    const app = createApp();
    const res = await request(app.callback()).get('/health');
    expect(res.headers['x-request-id']).toBeDefined();
  });

  it('returns existing X-Request-ID if provided', async () => {
    const app = createApp();
    const res = await request(app.callback()).get('/health').set('X-Request-ID', 'my-trace-id');
    expect(res.headers['x-request-id']).toBe('my-trace-id');
  });
});
