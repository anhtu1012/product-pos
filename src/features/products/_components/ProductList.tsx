// src/features/products/components/ProductList.tsx

import { Link } from '@tanstack/react-router'
import type { Product } from '../_types/types'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

const mockProducts: Array<Product> = [
  {
    id: 'PRD-001',
    name: 'Iced Latte',
    sku: 'BV-IL-01',
    price: 45000,
    stock: 120,
    category: 'Coffee',
    status: 'active',
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'PRD-002',
    name: 'Tiramisu Cake',
    sku: 'DK-TC-02',
    price: 65000,
    stock: 15,
    category: 'Dessert',
    status: 'active',
    createdAt: '2026-03-02T11:30:00Z',
  },
  {
    id: 'PRD-003',
    name: 'Matcha Frappuccino',
    sku: 'BV-MF-03',
    price: 55000,
    stock: 0,
    category: 'Frappe',
    status: 'out_of_stock',
    createdAt: '2026-03-03T14:15:00Z',
  },
]

export function ProductList() {
  const getStatusBadge = (status: Product['status']) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-green-500 hover:bg-green-600">Đang bán</Badge>
        )
      case 'inactive':
        return <Badge variant="secondary">Ngừng bán</Badge>
      case 'out_of_stock':
        return <Badge variant="destructive">Hết hàng</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header action */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Danh sách sản phẩm
          </h1>
          <p className="text-muted-foreground mt-1">
            Quản lý các sản phẩm trong cửa hàng của bạn.
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/products/create">Thêm sản phẩm mới</Link>
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="w-[100px]">Mã SP</TableHead>
              <TableHead>Tên sản phẩm</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead className="text-right">Giá bán</TableHead>
              <TableHead className="text-right">Tồn kho</TableHead>
              <TableHead className="text-center">Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.sku}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(product.price)}
                </TableCell>
                <TableCell className="text-right">{product.stock}</TableCell>
                <TableCell className="text-center">
                  {getStatusBadge(product.status)}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-primary"
                    asChild
                  >
                    <Link
                      to="/dashboard/products/$id"
                      params={{ id: product.id }}
                    >
                      Sửa
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
