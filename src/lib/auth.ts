import { getCurrentUser } from '@/functions/auth.func';
import { type ParsedLocation, redirect } from '@tanstack/react-router';

export const requireAuth = async ({ location }: { location: ParsedLocation<{}> }) => {
  const user = await getCurrentUser();

  if (!user) {
    throw redirect({
      to: '/login',
      search: { redirect: location.href },
    });
  }

  return { user };
};

export const authenticated = async ({ location }: { location: ParsedLocation<{}> }) => {
  const user = await getCurrentUser();

  if (user) {
    throw redirect({
      to: '/me/profile',
      search: { redirect: location.href },
    });
  }

  return { user };
};
