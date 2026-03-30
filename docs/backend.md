# Backend Guide

## Stack

| Tool       | Version | Role                     |
| ---------- | ------- | ------------------------ |
| Koa        | ^2      | HTTP framework           |
| FarmFE     | ^1.0    | Build / watch            |
| TypeScript | ^5      | Language                 |
| koa-router | ^12     | Routing                  |
| koa-body   | ^6      | Body parsing             |
| koa-cors   | ^5      | CORS                     |
| Zod        | ^3      | Input validation         |
| pino       | ^9      | Structured logging       |
| Vitest     | ^2      | Unit testing             |
| supertest  | ^7      | HTTP integration testing |

## Directory Structure

```
packages/backend/
├── farm.config.ts          # FarmFE node build config
├── package.json
├── tsconfig.json
├── .env.example
└── src/
    ├── index.ts            # Server entry: create app + listen
    ├── app.ts              # Koa app factory (for testing)
    ├── config.ts           # Environment variable parsing + validation
    ├── logger.ts           # pino logger singleton
    ├── middlewares/
    │   ├── errorHandler.ts # Global error → RFC 7807
    │   ├── requestId.ts    # X-Request-ID injection
    │   └── notFound.ts     # 404 fallback
    ├── routes/
    │   ├── index.ts        # Route registration
    │   ├── health.ts       # GET /health
    │   └── <resource>/
    │       ├── index.ts    # Router registration
    │       ├── controller.ts
    │       ├── service.ts
    │       ├── schema.ts   # Zod request/response schemas
    │       └── *.test.ts   # Vitest tests
    └── types/
        └── koa.d.ts        # Koa context augmentation
```

## Commands

```bash
cd packages/backend
pnpm dev      # FarmFE watch + node (hot reload on :3000)
pnpm build    # Production build → dist/
pnpm lint     # ESLint
pnpm test     # Vitest unit + integration tests
```

## Middleware Order

The middleware stack is always applied in this order:

```
errorHandler → requestId → cors → logger → bodyParser → router → notFound
```

## Route Conventions

- All routes prefixed with `/api/v1/`.
- Resource paths are plural nouns: `/api/v1/users`, `/api/v1/posts`.
- IDs in path params: `/api/v1/users/:id`.
- Pagination via query: `?page=1&limit=20`.

### Controller Pattern

```ts
// src/routes/users/controller.ts
import type { Context } from 'koa';
import { getUserById } from './service';
import { getUserParamsSchema } from './schema';

export async function getUser(ctx: Context): Promise<void> {
  const params = getUserParamsSchema.parse(ctx.params);
  const user = await getUserById(params.id);
  ctx.body = user;
}
```

### Error Responses (RFC 7807)

All errors returned as:

```json
{
  "type": "https://harfai.dev/errors/not-found",
  "title": "Not Found",
  "status": 404,
  "detail": "User with id '123' not found",
  "instance": "/api/v1/users/123"
}
```

## Testing

```ts
// src/routes/health.test.ts
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../app';

describe('GET /health', () => {
  it('returns 200 with status ok', async () => {
    const app = createApp();
    const res = await request(app.callback()).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ status: 'ok' });
  });
});
```

## Environment Variables

Copy `.env.example` to `.env` before running locally:

```bash
cp .env.example .env
```

Never commit `.env`. All new variables must be added to `.env.example` with a descriptive comment.
