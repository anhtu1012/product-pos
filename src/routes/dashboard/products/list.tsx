import { createFileRoute } from '@tanstack/react-router'
import { ProductList } from '@/features/products/_components/ProductList'

export const Route = createFileRoute('/dashboard/products/list')({
  component: ProductList,
})
