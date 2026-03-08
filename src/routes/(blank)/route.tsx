import { Outlet, createFileRoute } from '@tanstack/react-router'
import { BlankLayout } from '@/layouts/blank-layout'

export const Route = createFileRoute('/(blank)')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <BlankLayout>
      <Outlet />
    </BlankLayout>
  )
}
