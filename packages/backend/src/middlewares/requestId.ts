import type { Context, Next } from 'koa';
import { v4 as uuidv4 } from 'uuid';

export async function requestId(ctx: Context, next: Next): Promise<void> {
  const id = (ctx.get('X-Request-ID') || uuidv4()) as string;
  ctx.requestId = id;
  ctx.set('X-Request-ID', id);
  await next();
}
