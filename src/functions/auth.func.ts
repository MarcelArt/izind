import type { RegisterInput } from "@/@types/user";
import authData from "@/data/auth.data";
import { createServerFn } from "@tanstack/react-start";

export const registerUser = createServerFn({ method: 'POST' })
    .inputValidator((data: RegisterInput) => data)
    .handler(async ({ data }) => await authData.register(data));