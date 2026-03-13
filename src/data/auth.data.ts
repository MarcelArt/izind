import type { LoginInput, RegisterInput } from '@/@types/user';
import type { Tokens } from 'surrealdb';
import { execute } from './surrealdb';

async function register(input: RegisterInput): Promise<Tokens> {
  const token = await execute(async (db) => {
    return await db.signup({
      access: 'users',
      variables: {
        nik: input.nik,
        password: input.password,
      },
    });
  });

  return token;
}

async function login(input: LoginInput): Promise<Tokens> {
  const token = await execute(async (db) => {
    return await db.signin({
      access: 'users',
      variables: input,
    });
  });

  return token;
}

const authData = {
  register,
  login,
};
export default authData;
