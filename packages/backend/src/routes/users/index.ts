import Router from '@koa/router';
import { listUsers, getUser, postUser, patchUser, removeUser } from './controller.js';

const router = new Router({ prefix: '/api/v1' });

router.get('/users', listUsers);
router.get('/users/:id', getUser);
router.post('/users', postUser);
router.patch('/users/:id', patchUser);
router.delete('/users/:id', removeUser);

export { router as usersRouter };
