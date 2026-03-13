import { getCurrentUser } from '@/functions/auth.func';
import { type ParsedLocation, redirect } from '@tanstack/react-router';

export const redirectToLogin = async ({ location }: { location: ParsedLocation<{}> }) => {
  const user = await getCurrentUser();

  if (!user) {
    throw redirect({
      to: '/login',
      search: { redirect: location.href },
    });
  }

  return { user };
};

export const redirectToIndex = async ({ location }: { location: ParsedLocation<{}> }) => {
  const user = await getCurrentUser();

  if (user) {
    throw redirect({
      to: '/',
      search: { redirect: location.href },
    });
  }

  return { user };
};
