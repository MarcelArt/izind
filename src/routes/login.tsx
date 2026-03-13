import { LoginForm } from '@/components/login-form';
import { getCurrentUser } from '@/functions/auth.func';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    const user = await getCurrentUser();

    if (user) {
      throw redirect({
        to: '/',
        search: { redirect: location.href },
      });
    }

    return { user };
  },
});

function RouteComponent() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
