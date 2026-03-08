import { createFileRoute } from '@tanstack/react-router'
import { UseEffectDemo } from '@/features/hooks/components/UseEffectDemo'

export const Route = createFileRoute('/dashboard/hooks/use-effect')({
  component: UseEffectDemo,
})
