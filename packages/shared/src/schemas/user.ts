import { z } from 'zod';

// ── User Schemas ──────────────────────────────────────────────────────────────

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type User = z.infer<typeof UserSchema>;

export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = CreateUserSchema.partial();

export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;

export const UserParamsSchema = z.object({
  id: z.string().uuid(),
});

export type UserParams = z.infer<typeof UserParamsSchema>;
