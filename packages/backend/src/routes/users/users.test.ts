import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../../app.js';
import { _resetStore } from './service.js';

beforeEach(() => {
  _resetStore();
});

describe('Users API', () => {
  describe('GET /api/v1/users', () => {
    it('returns empty list initially', async () => {
      const app = createApp();
      const res = await request(app.callback()).get('/api/v1/users');
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([]);
      expect(res.body.total).toBe(0);
    });
  });

  describe('POST /api/v1/users', () => {
    it('creates a user', async () => {
      const app = createApp();
      const res = await request(app.callback())
        .post('/api/v1/users')
        .send({ name: 'Alice', email: 'alice@example.com' });
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Alice');
      expect(res.body.email).toBe('alice@example.com');
      expect(res.body.id).toBeDefined();
    });

    it('returns 400 for invalid email', async () => {
      const app = createApp();
      const res = await request(app.callback())
        .post('/api/v1/users')
        .send({ name: 'Bob', email: 'not-an-email' });
      expect(res.status).toBe(400);
      expect(res.headers['content-type']).toContain('application/problem+json');
    });
  });

  describe('GET /api/v1/users/:id', () => {
    it('returns 404 for unknown id', async () => {
      const app = createApp();
      const res = await request(app.callback()).get(
        '/api/v1/users/550e8400-e29b-41d4-a716-446655440000',
      );
      expect(res.status).toBe(404);
    });

    it('returns user after creation', async () => {
      const app = createApp();
      const createRes = await request(app.callback())
        .post('/api/v1/users')
        .send({ name: 'Carol', email: 'carol@example.com' });
      const id: string = createRes.body.id;

      const getRes = await request(app.callback()).get(`/api/v1/users/${id}`);
      expect(getRes.status).toBe(200);
      expect(getRes.body.name).toBe('Carol');
    });
  });

  describe('PATCH /api/v1/users/:id', () => {
    it('updates a user', async () => {
      const app = createApp();
      const createRes = await request(app.callback())
        .post('/api/v1/users')
        .send({ name: 'Dave', email: 'dave@example.com' });
      const id: string = createRes.body.id;

      const patchRes = await request(app.callback())
        .patch(`/api/v1/users/${id}`)
        .send({ name: 'David' });
      expect(patchRes.status).toBe(200);
      expect(patchRes.body.name).toBe('David');
    });
  });

  describe('DELETE /api/v1/users/:id', () => {
    it('deletes a user', async () => {
      const app = createApp();
      const createRes = await request(app.callback())
        .post('/api/v1/users')
        .send({ name: 'Eve', email: 'eve@example.com' });
      const id: string = createRes.body.id;

      const deleteRes = await request(app.callback()).delete(`/api/v1/users/${id}`);
      expect(deleteRes.status).toBe(204);
    });

    it('returns 404 for unknown id', async () => {
      const app = createApp();
      const res = await request(app.callback()).delete(
        '/api/v1/users/550e8400-e29b-41d4-a716-446655440000',
      );
      expect(res.status).toBe(404);
    });
  });
});
