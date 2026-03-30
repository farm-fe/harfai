# Frontend Guide

## Stack

| Tool                  | Version | Role                              |
| --------------------- | ------- | --------------------------------- |
| React                 | ^18     | UI framework                      |
| FarmFE                | ^1.0    | Build tool / dev server           |
| TypeScript            | ^5      | Language                          |
| React Router          | ^6      | Client-side routing               |
| Zustand               | ^4      | Global state                      |
| TanStack Query        | ^5      | Server state / data fetching      |
| Tailwind CSS          | ^4      | Component styling (utility-first) |
| Zod                   | ^3      | Form validation                   |
| Vitest                | ^2      | Unit & component testing          |
| React Testing Library | ^16     | DOM testing utilities             |

## Directory Structure

```
packages/frontend/
├── farm.config.ts          # FarmFE build configuration
├── package.json
├── tsconfig.json
├── index.html
└── src/
    ├── main.tsx            # App entry point
    ├── App.tsx             # Root component + router
    ├── api/                # TanStack Query hooks + fetch clients
    │   ├── client.ts       # Base fetch wrapper
    │   └── hooks/          # Per-resource query hooks
    ├── components/         # Reusable UI components
    │   └── <Component>/
    │       ├── index.tsx
    │       ├── index.module.css
    │       └── index.test.tsx
    ├── pages/              # Route-level components
    │   └── <Page>/
    │       ├── index.tsx
    │       ├── index.module.css
    │       └── index.test.tsx
    ├── store/              # Zustand stores
    ├── hooks/              # Custom React hooks
    ├── types/              # Frontend-only TypeScript types
    └── utils/              # Pure utility functions
```

## Commands

```bash
cd packages/frontend
pnpm dev          # Start FarmFE dev server on :9000
pnpm build        # Production build → dist/
pnpm lint         # ESLint
pnpm test         # Vitest unit tests
pnpm test:watch   # Vitest in watch mode
```

## Coding Rules

### Components

- Always functional, never class-based.
- One component per file.
- Export as named export at the top of the module, default at the bottom.
- Style with **Tailwind CSS** utility classes directly in JSX. Only reach for CSS Modules when Tailwind cannot satisfy requirements (e.g. complex keyframe animations, `@apply` patterns for third-party overrides).

### Data Fetching

```tsx
// ✅ Correct: use TanStack Query
function UserProfile({ id }: { id: string }) {
  const { data, isPending, error } = useUser(id);
  // ...
}

// ❌ Wrong: direct useEffect fetch
function UserProfile({ id }: { id: string }) {
  const [data, setData] = useState(null);
  useEffect(() => { fetch(`/api/v1/users/${id}`).then(...) }, [id]);
}
```

### State Management

- **Local state**: `useState` / `useReducer` — always prefer local first.
- **Shared UI state** (modals, toasts, theme): Zustand store.
- **Server state**: TanStack Query — never duplicate in Zustand.

### Error Handling

- Wrap route-level components with `<ErrorBoundary>`.
- TanStack Query handles async errors; surface them with `error` states.
- Show user-friendly messages; log details to console in dev.

### Accessibility

- Every `<button>` must have an accessible name (text or `aria-label`).
- Images need `alt` text.
- Forms use `<label>` elements linked to inputs.
- Run `axe-core` checks in CI via the accessibility Vitest plugin.

## Testing

```tsx
// packages/frontend/src/components/Button/index.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from './index';

describe('Button', () => {
  it('renders with label', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });
});
```

Mock API calls using MSW handlers in `src/mocks/`:

```ts
// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
export const handlers = [
  http.get('/api/v1/users/:id', ({ params }) =>
    HttpResponse.json({ id: params.id, name: 'Test User' }),
  ),
];
```
