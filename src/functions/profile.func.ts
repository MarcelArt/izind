import { type ProfileInput } from "@/@types/profile";
import profileData from "@/data/profile.data";
import { useAppSession } from "@/hooks/useAppSession";
import { createServerFn } from "@tanstack/react-start";

export const getProfileByUserId = createServerFn({ method: 'GET' })
    .inputValidator((userId: string) => userId)
    .handler(async ({ data: userId }) => {
        const { data } = await useAppSession();
        const profile = await profileData.getByUserId(userId, data.at ?? '');
        return {
            ...profile,
            id: profile.id.toString(),
            user_id: profile.user_id.toString(),
            date_of_birth: String(profile.date_of_birth),
        };
    })

export const updateProfile = createServerFn({ method: 'POST' })
    .inputValidator((data: { id: string, input: ProfileInput }) => data)
    .handler(async ({ data: input }) => {
        const { data } = await useAppSession();
        await profileData.update(input.id, input.input, data.at ?? '');
    })