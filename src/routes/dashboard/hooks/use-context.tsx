import { createFileRoute } from '@tanstack/react-router'
import { UseContextDemo } from '@/features/hooks/components/UseContextDemo'

export const Route = createFileRoute('/dashboard/hooks/use-context')({
  component: UseContextDemo,
})
