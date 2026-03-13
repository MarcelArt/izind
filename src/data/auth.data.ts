import type { RegisterInput } from "@/@types/user";
import type { Tokens } from "surrealdb";
import { getDb } from "./surrealdb";

async function register(input: RegisterInput): Promise<Tokens> {
    const db = await getDb();
    const token = await db.signup({
        access: 'users',
        variables: {
            nik: input.nik,
            password: input.password,
        }
    });

    return token;
}

const authData = {
    register,
}
export default authData;