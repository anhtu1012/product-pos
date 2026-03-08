import { createFileRoute } from '@tanstack/react-router'
import { UseCallbackDemo } from '@/features/hooks/components/UseCallbackDemo'

export const Route = createFileRoute('/dashboard/hooks/use-callback')({
  component: UseCallbackDemo,
})
