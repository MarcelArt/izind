import type { ProfileInput } from "@/@types/profile";
import { getProfileByUserId, updateProfile } from "@/functions/profile.func";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import type { MutationCallbacks } from ".";

export function getProfileByUserIdOption(userId: string) {
    return queryOptions({
        queryKey: ['profiles', userId],
        queryFn: () => getProfileByUserId({ data: userId }),
    });
}

export function updateProfileOption({ onSuccess, onError }: MutationCallbacks<void>) {
    return mutationOptions({
        mutationFn: (data: { id: string, input: ProfileInput }) => updateProfile({ data }),
        onSuccess,
        onError,
    });
}