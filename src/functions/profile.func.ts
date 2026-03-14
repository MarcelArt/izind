import profileData from "@/data/profile.data";
import { useAppSession } from "@/hooks/useAppSession";
import { serializeForApi } from "@/utils/serialize";
import { createServerFn } from "@tanstack/react-start";

export const getProfileByUserId = createServerFn({ method: 'GET' })
    .inputValidator((userId: string) => userId)
    .handler(async ({ data: userId }) => {
        const { data } = await useAppSession();
        const profile = await profileData.getByUserId(userId, data.at ?? '');
        return serializeForApi(profile);
    })