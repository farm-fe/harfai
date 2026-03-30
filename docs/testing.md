# Testing Guide

## Philosophy

- **Test behaviour, not implementation.** Tests should describe _what_ the code does, not _how_.
- **Mock at boundaries.** External I/O (database, HTTP, file system) is always mocked.
- **Colocation.** Unit tests live next to the source file they test.
- **Coverage target.** ≥80% statement coverage for new code.

## Test Types

| Type              | Tool               | Location                       | Runs in |
| ----------------- | ------------------ | ------------------------------ | ------- |
| Unit (logic)      | Vitest             | `src/**/*.test.ts`             | Node    |
| Component         | Vitest + RTL       | `src/**/*.test.tsx`            | jsdom   |
| Integration (API) | Vitest + supertest | `src/routes/**/*.test.ts`      | Node    |
| E2E               | Playwright         | `packages/e2e/tests/*.spec.ts` | Browser |

## Running Tests

```bash
# All unit tests (all packages)
pnpm test

# Watch mode for a single package
cd packages/frontend && pnpm test:watch

# E2E (requires running backend)
pnpm test:e2e

# With coverage report
cd packages/backend && pnpm test:coverage
```

## Unit Tests (Vitest)

### Setup

Each package has a `vitest.config.ts`:

```ts
// packages/frontend/vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
    coverage: {
      provider: 'v8',
      thresholds: { statements: 80, branches: 80, functions: 80, lines: 80 },
    },
  },
});
```

### Mocking

```ts
// Mocking a module
vi.mock('../service', () => ({
  getUserById: vi.fn().mockResolvedValue({ id: '1', name: 'Alice' }),
}));

// Mocking fetch (frontend)
import { setupServer } from 'msw/node';
import { handlers } from '../mocks/handlers';
const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Database Mocking

Services that touch a database receive a repository interface. Tests inject a mock repository:

```ts
// service.ts
interface UserRepo {
  findById(id: string): Promise<User | null>;
}
export function createUserService(repo: UserRepo) {
  return {
    async getUser(id: string) {
      return repo.findById(id);
    },
  };
}

// service.test.ts
const mockRepo: UserRepo = { findById: vi.fn() };
const service = createUserService(mockRepo);
```

## E2E Tests (Playwright)

### Setup

```bash
cd packages/e2e
cp .env.example .env.test   # set BASE_URL, API_URL
pnpm exec playwright install --with-deps
```

### Running

```bash
pnpm test:e2e                      # headless
pnpm test:e2e --headed             # with browser UI
pnpm test:e2e --debug              # Playwright inspector
```

### Writing Tests

```ts
// packages/e2e/tests/health.spec.ts
import { test, expect } from '@playwright/test';

test('health endpoint returns ok', async ({ request }) => {
  const res = await request.get('/health');
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.status).toBe('ok');
});
```

### Page Object Model

Reusable page abstractions live in `packages/e2e/pages/`:

```ts
// packages/e2e/pages/home.page.ts
import type { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }
  get heading() {
    return this.page.getByRole('heading', { level: 1 });
  }
}
```

## CI Integration

All test commands run in GitHub Actions (see `.github/workflows/ci.yml`):

```
pnpm lint → pnpm test → pnpm build → pnpm test:e2e
```

E2E tests run against the production build to catch integration issues.
