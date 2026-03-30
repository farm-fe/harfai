import type { Context, Next } from 'koa';
import { ZodError } from 'zod';
import { logger } from '../logger.js';

interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
}

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly title: string,
    public readonly detail?: string,
  ) {
    super(title);
    this.name = 'HttpError';
  }
}

export async function errorHandler(ctx: Context, next: Next): Promise<void> {
  try {
    await next();
  } catch (err: unknown) {
    let problem: ProblemDetails;

    if (err instanceof HttpError) {
      problem = {
        type: `https://harfai.dev/errors/${err.title.toLowerCase().replace(/\s+/g, '-')}`,
        title: err.title,
        status: err.status,
        detail: err.detail,
        instance: ctx.path,
      };
    } else if (err instanceof ZodError) {
      problem = {
        type: 'https://harfai.dev/errors/validation-error',
        title: 'Validation Error',
        status: 400,
        detail: err.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join('; '),
        instance: ctx.path,
      };
    } else {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      logger.error({ err, path: ctx.path, method: ctx.method }, 'Unhandled error');
      problem = {
        type: 'https://harfai.dev/errors/internal-server-error',
        title: 'Internal Server Error',
        status: 500,
        detail: ctx.app.env === 'development' ? message : undefined,
        instance: ctx.path,
      };
    }

    ctx.status = problem.status;
    ctx.body = problem;
    ctx.set('Content-Type', 'application/problem+json; charset=utf-8');
  }
}
