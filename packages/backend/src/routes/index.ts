import Router from '@koa/router';
import { healthRouter } from './health/index.js';
import { usersRouter } from './users/index.js';

const apiRouter = new Router();

apiRouter.use(healthRouter.routes(), healthRouter.allowedMethods());
apiRouter.use(usersRouter.routes(), usersRouter.allowedMethods());

export { apiRouter };
