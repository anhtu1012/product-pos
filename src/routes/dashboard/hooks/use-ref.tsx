import { createFileRoute } from '@tanstack/react-router'
import { UseRefDemo } from '@/features/hooks/components/UseRefDemo'

export const Route = createFileRoute('/dashboard/hooks/use-ref')({
  component: UseRefDemo,
})
