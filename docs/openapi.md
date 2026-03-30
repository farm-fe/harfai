# OpenAPI Guide

## Overview

All REST API contracts are defined in `packages/openapi/spec.yaml` using the **OpenAPI 3.1** standard. This is the single source of truth for:

- Endpoint paths, methods, and parameters
- Request/response body schemas
- Error response shapes
- Authentication requirements

## File Location

```
packages/openapi/
├── package.json
├── spec.yaml           ← Edit this file to add/modify endpoints
└── scripts/
    └── validate.ts     ← Validates spec against OpenAPI 3.1 schema
```

## Workflow: Adding a New Endpoint

1. **Design the endpoint** in `spec.yaml` first — no code yet.
2. Run `pnpm openapi:validate` to confirm the spec is valid.
3. Run `pnpm openapi:generate` to regenerate TypeScript types.
4. Implement the Koa route in `packages/backend/src/routes/`.
5. Implement the React Query hook in `packages/frontend/src/api/hooks/`.

## Spec Conventions

### Path Naming

```yaml
paths:
  /api/v1/users: # plural resource noun
    get: ... # list
    post: ... # create
  /api/v1/users/{id}:
    get: ... # read one
    put: ... # full replace
    patch: ... # partial update
    delete: ... # remove
```

### Response Schemas

Every successful response **must** have an inline or `$ref` schema:

```yaml
responses:
  '200':
    description: User found
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/User'
```

### Error Responses (RFC 7807)

Use the shared `ProblemDetails` component for all 4xx/5xx:

```yaml
responses:
  '404':
    description: Not found
    content:
      application/problem+json:
        schema:
          $ref: '#/components/schemas/ProblemDetails'
```

### Authentication

Routes requiring authentication use the `bearerAuth` security scheme:

```yaml
security:
  - bearerAuth: []
```

## Validation

```bash
pnpm openapi:validate
```

This runs `@readme/openapi-parser` to validate the spec. Fix all warnings before merging.

## Code Generation

```bash
pnpm openapi:generate
```

Generates TypeScript types from the spec into `packages/openapi/dist/types.ts`. These types are imported by both `@harfai/frontend` and `@harfai/backend`.

## Example Spec Entry

```yaml
paths:
  /api/v1/health:
    get:
      operationId: getHealth
      summary: Health check
      tags: [system]
      responses:
        '200':
          description: Service is healthy
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HealthResponse'
```
