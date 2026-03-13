import { createFileRoute, redirect } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/functions/auth.func"

export const Route = createFileRoute("/")({ 
  component: App,
  beforeLoad: async ({ location }) => {
    const user = await getCurrentUser();

    if (!user) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }

    return { user };
  }
})

function App() {
  const { user } = Route.useRouteContext();
  console.log('user :>> ', user);

  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Welcome {user.nik} - {user.id}</h1>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component for you.</p>
          <Button className="mt-2">Logout</Button>
        </div>
      </div>
    </div>
  )
}
