import type { User } from "@/@types/user";
import { execute } from "./surrealdb";
import { eq } from "surrealdb";
import { users } from "@/@types";

async function getByNik(nik: string, token: string): Promise<User> {
    return execute(async db => {
        const user = await db.select<User>(users).fields('id', 'nik')
            .where(eq('nik', nik))
            .limit(1);

        return user[0];
    }, token)
}

const userData = {
    getByNik,
}
export default userData;