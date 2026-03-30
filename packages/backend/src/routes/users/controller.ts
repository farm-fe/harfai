import type { Context } from 'koa';
import { HttpError } from '../../middlewares/errorHandler.js';
import {
  CreateUserSchema,
  UpdateUserSchema,
  UserParamsSchema,
  PaginationQuerySchema,
} from './schema.js';
import { findAllUsers, findUserById, createUser, updateUser, deleteUser } from './service.js';

export async function listUsers(ctx: Context): Promise<void> {
  const { page, limit } = PaginationQuerySchema.parse(ctx.query);
  const { data, total } = await findAllUsers(page, limit);
  ctx.body = {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getUser(ctx: Context): Promise<void> {
  const { id } = UserParamsSchema.parse(ctx.params);
  const user = await findUserById(id);
  if (!user) {
    throw new HttpError(404, 'Not Found', `User with id '${id}' not found`);
  }
  ctx.body = user;
}

export async function postUser(ctx: Context): Promise<void> {
  const input = CreateUserSchema.parse(ctx.request.body);
  const user = await createUser(input);
  ctx.status = 201;
  ctx.body = user;
}

export async function patchUser(ctx: Context): Promise<void> {
  const { id } = UserParamsSchema.parse(ctx.params);
  const input = UpdateUserSchema.parse(ctx.request.body);
  const user = await updateUser(id, input);
  if (!user) {
    throw new HttpError(404, 'Not Found', `User with id '${id}' not found`);
  }
  ctx.body = user;
}

export async function removeUser(ctx: Context): Promise<void> {
  const { id } = UserParamsSchema.parse(ctx.params);
  const deleted = await deleteUser(id);
  if (!deleted) {
    throw new HttpError(404, 'Not Found', `User with id '${id}' not found`);
  }
  ctx.status = 204;
}
