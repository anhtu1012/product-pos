// src/features/products/types.ts

export interface Product {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  category: string
  status: 'active' | 'inactive' | 'out_of_stock'
  createdAt: string
}
