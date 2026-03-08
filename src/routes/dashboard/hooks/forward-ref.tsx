import { createFileRoute } from '@tanstack/react-router'
import { ForwardRefDemo } from '@/features/hooks/components/ForwardRefDemo'

export const Route = createFileRoute('/dashboard/hooks/forward-ref')({
  component: ForwardRefDemo,
})
