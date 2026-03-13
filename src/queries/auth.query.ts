import type { LoginInput, RegisterInput } from '@/@types/user';
import type { MutationCallbacks } from '@/functions';
import { loginUser, registerUser } from '@/functions/auth.func';
import { mutationOptions } from '@tanstack/react-query';
import type { Tokens } from 'surrealdb';

export function registerMutation({ onSuccess, onError }: MutationCallbacks<Tokens>) {
  return mutationOptions({
    mutationFn: (input: RegisterInput) => registerUser({ data: input }),
    onSuccess,
    onError,
  });
}

export function loginMutation({ onSuccess, onError }: MutationCallbacks<Tokens>) {
  return mutationOptions({
    mutationFn: (input: LoginInput) => loginUser({ data: input }),
    onSuccess,
    onError,
  });
}