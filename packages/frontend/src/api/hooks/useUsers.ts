import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateUserInput, UpdateUserInput } from '@harfai/shared';
import { api } from '../client';

export const USER_KEYS = {
  all: ['users'] as const,
  list: (page: number, limit: number) => ['users', 'list', { page, limit }] as const,
  detail: (id: string) => ['users', 'detail', id] as const,
};

export function useUsers(page = 1, limit = 20) {
  return useQuery({
    queryKey: USER_KEYS.list(page, limit),
    queryFn: () => api.users.list(page, limit),
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: USER_KEYS.detail(id),
    queryFn: () => api.users.get(id),
    enabled: Boolean(id),
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateUserInput) => api.users.create(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: USER_KEYS.all });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateUserInput }) =>
      api.users.update(id, input),
    onSuccess: (_data, { id }) => {
      void queryClient.invalidateQueries({ queryKey: USER_KEYS.detail(id) });
      void queryClient.invalidateQueries({ queryKey: USER_KEYS.all });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.users.delete(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: USER_KEYS.all });
    },
  });
}
