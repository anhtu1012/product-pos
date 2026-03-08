import { Outlet, createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '@/layouts/dashboard-layout'

export const Route = createFileRoute('/dashboard')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  )
}
