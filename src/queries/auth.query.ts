import type { RegisterInput } from '@/@types/user';
import { registerUser } from '@/functions/auth.func';
import { mutationOptions } from '@tanstack/react-query';
import type { Tokens } from 'surrealdb';

export function registerMutation({ onSuccess, onError }: { onSuccess?: (data: Tokens) => void; onError?: (error: Error) => void }) {
  return mutationOptions({
    mutationFn: (input: RegisterInput) => registerUser({ data: input }),
    onSuccess,
    onError,
  });
}
