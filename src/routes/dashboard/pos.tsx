import { createFileRoute } from '@tanstack/react-router'
import POSFeature from '@/features/pos'

export const Route = createFileRoute('/dashboard/pos')({
  component: POSFeature,
})


