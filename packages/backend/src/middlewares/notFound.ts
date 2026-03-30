import type { Context, Next } from 'koa';

export async function notFound(ctx: Context, next: Next): Promise<void> {
  await next();
  if (ctx.status === 404 && !ctx.body) {
    ctx.body = {
      type: 'https://harfai.dev/errors/not-found',
      title: 'Not Found',
      status: 404,
      detail: `Route ${ctx.method} ${ctx.path} not found`,
      instance: ctx.path,
    };
    ctx.set('Content-Type', 'application/problem+json; charset=utf-8');
  }
}
