import type { LoginInput, RegisterInput } from '@/@types/user';
import authData from '@/data/auth.data';
import { createServerFn } from '@tanstack/react-start';

export const registerUser = createServerFn({ method: 'POST' })
  .inputValidator((data: RegisterInput) => data)
  .handler(async ({ data }) => await authData.register(data));

export const loginUser = createServerFn({ method: 'POST' })
  .inputValidator((data: LoginInput) => data)
  .handler(async ({ data }) => {
    const token = await authData.login(data);

    

    return token;
  });
