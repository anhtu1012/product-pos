import { Outlet, createFileRoute } from '@tanstack/react-router'
import { PublicLayout } from '@/layouts/public-layout'

export const Route = createFileRoute('/(public)')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  )
}
