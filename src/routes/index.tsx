import { createFileRoute } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { redirectToLogin } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";
import { logoutMutation } from "@/queries/auth.query";

export const Route = createFileRoute("/")({ 
  component: App,
  beforeLoad: redirectToLogin,
})

function App() {
  const { user } = Route.useRouteContext();
  const navigate = Route.useNavigate();
  const { mutate } = useMutation(logoutMutation({
    onSuccess: () => navigate({ to: '/login' }),
  }));

  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Welcome {user.nik} - {user.id}</h1>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component for you.</p>
          <Button onClick={() => mutate()} className="mt-2">Logout</Button>
        </div>
      </div>
    </div>
  )
}
