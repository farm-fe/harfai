import Koa from 'koa';
import cors from '@koa/cors';
import { koaBody } from 'koa-body';
import { errorHandler } from './middlewares/errorHandler.js';
import { requestId } from './middlewares/requestId.js';
import { notFound } from './middlewares/notFound.js';
import { apiRouter } from './routes/index.js';
import { config } from './config.js';

export function createApp(): Koa {
  const app = new Koa();

  app.env = config.NODE_ENV;

  // Middleware stack (order matters)
  app.use(errorHandler);
  app.use(requestId);
  app.use(
    cors({
      origin: config.CORS_ORIGIN,
      allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
      exposeHeaders: ['X-Request-ID'],
    }),
  );
  app.use(
    koaBody({
      jsonLimit: '1mb',
      formLimit: '1mb',
      textLimit: '1mb',
    }),
  );
  app.use(apiRouter.routes());
  app.use(apiRouter.allowedMethods());
  app.use(notFound);

  return app;
}
