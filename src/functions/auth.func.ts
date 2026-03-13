import type { LoginInput, RegisterInput } from '@/@types/user';
import authData from '@/data/auth.data';
import userData from '@/data/user.data';
import { serializeForApi } from '@/utils/serialize';
import { useAppSession } from '@/hooks/useAppSession';
import { createServerFn } from '@tanstack/react-start';

export const registerUser = createServerFn({ method: 'POST' })
  .inputValidator((data: RegisterInput) => data)
  .handler(async ({ data }) => await authData.register(data));

export const loginUser = createServerFn({ method: 'POST' })
  .inputValidator((data: LoginInput) => data)
  .handler(async ({ data }) => {
    const token = await authData.login(data);

    const session = await useAppSession();
    await session.update({
      at: token.access,
      nik: data.nik,
    });

    return token;
  });

export const logoutUser = createServerFn({ method: 'POST' })
  .handler(async () => {
    const session = await useAppSession();
    await session.clear();
  })

export const getCurrentUser = createServerFn({ method: 'GET' })
  .handler(async () => {
    try {
      const session = await useAppSession();
      const { at, nik } = session.data;
  
      if (!at || !nik) return null;
  
      const user = await userData.getByNik(nik, at);
      return user ? serializeForApi(user) : null;
    }
    catch(e) {
      console.log('e :>> ', e);
      return null;
    }
  })