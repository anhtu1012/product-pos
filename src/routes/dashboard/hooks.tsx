import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/hooks')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
