import { getProfileByUserId } from "@/functions/profile.func";
import { queryOptions } from "@tanstack/react-query";

export function getProfileByUserIdOption(userId: string) {
    return queryOptions({
        queryKey: ['profiles', userId],
        queryFn: () => getProfileByUserId({ data: userId }),
    });
}