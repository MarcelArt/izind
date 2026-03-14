import type { Profile, ProfileInput } from "@/@types/profile";
import { execute } from "./surrealdb";
import { eq } from "surrealdb";
import { recordIdFromString } from "@/lib/record-id";
import { profiles } from "@/@types";

async function update(id: string, input: ProfileInput, token: string) {
    return await execute(async db => {
        return await db.update(recordIdFromString(id)).content(input);
    }, token);
}

async function getByUserId(userId: string, token: string): Promise<Profile> {
    return await execute(async db => {
        const profile = await db.select<Profile>(profiles).where(eq('user_id', recordIdFromString(userId))).limit(1);
        console.log('profile :>> ', profile);
        return profile[0];
    }, token);
}

const profileData = {
    update,
    getByUserId,
}
export default profileData;