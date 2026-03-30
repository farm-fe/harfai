import type { Context } from 'koa';
import { config } from '../../config.js';

export async function getHealth(ctx: Context): Promise<void> {
  ctx.body = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: config.VERSION,
  };
}
