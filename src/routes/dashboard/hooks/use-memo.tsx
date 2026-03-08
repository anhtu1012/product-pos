import { createFileRoute } from '@tanstack/react-router'
import { UseMemoDemo } from '@/features/hooks/components/UseMemoDemo'

export const Route = createFileRoute('/dashboard/hooks/use-memo')({
  component: UseMemoDemo,
})
