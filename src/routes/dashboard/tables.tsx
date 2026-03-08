import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/tables')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(dashboard)/tables"!</div>
}
