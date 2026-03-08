import { createFileRoute } from '@tanstack/react-router'
import { UseReducerDemo } from '@/features/hooks/components/UseReducerDemo'

export const Route = createFileRoute('/dashboard/hooks/use-reducer')({
  component: UseReducerDemo,
})
