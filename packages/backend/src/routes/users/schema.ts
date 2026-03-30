import { z } from 'zod';
import {
  UserSchema,
  CreateUserSchema,
  UpdateUserSchema,
  UserParamsSchema,
  PaginationQuerySchema,
} from '@harfai/shared';

export { UserSchema, CreateUserSchema, UpdateUserSchema, UserParamsSchema, PaginationQuerySchema };

// Re-export for convenience
export type User = z.infer<typeof UserSchema>;
export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
