import { SignupForm } from '@/components/signup-form';
import { getCurrentUser } from '@/functions/auth.func';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { GalleryVerticalEnd } from 'lucide-react';

export const Route = createFileRoute('/register')({
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
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Izind
        </a>
        <SignupForm />
      </div>
    </div>
  );
}
