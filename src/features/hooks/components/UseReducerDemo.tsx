import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import { useReducer, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

// 1. Định nghĩa State & Action types
interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface CartState {
  items: Array<CartItem> | []
  total: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { name: string; price: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; amount: number } }
  | { type: 'CLEAR_CART' }

// 2. Reducer function xử lý logic tập trung
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const newItem: CartItem = {
        id: Math.random().toString(36).substr(2, 9),
        name: action.payload.name,
        price: action.payload.price,
        quantity: 1,
      }
      const newItems = [...state.items, newItem]
      return {
        ...state,
        items: newItems,
        total: state.total + action.payload.price,
      }
    }
    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find((i) => i.id === action.payload)
      if (!itemToRemove) return state
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
        total: state.total - itemToRemove.price * itemToRemove.quantity,
      }
    }
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map((item) => {
        if (item.id === action.payload.id) {
          const newQuantity = Math.max(1, item.quantity + action.payload.amount)
          return { ...item, quantity: newQuantity }
        }
        return item
      })

      const newTotal = updatedItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      )
      return { ...state, items: updatedItems, total: newTotal }
    }
    case 'CLEAR_CART':
      return { items: [], total: 0 }
    default:
      return state
  }
}

export function UseReducerDemo() {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 })
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('100')
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!productName || !productPrice) return

    dispatch({
      type: 'ADD_ITEM',
      payload: { name: productName, price: Number(productPrice) },
    })
    setProductName('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">useReducer Hook</h1>
        <p className="mt-1 text-muted-foreground">
          Dùng để quản lý các state phức tạp, có nhiều transition hoặc logic phụ
          thuộc nhau. Tương tự Redux nhưng ở quy mô component.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Thêm sản phẩm</CardTitle>
            <CardDescription>
              Dispatch action để cập nhật giỏ hàng
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddItem} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tên món hàng</label>
                <Input
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Ví dụ: Cà phê sữa"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Giá (VNĐ)</label>
                <Input
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Thêm vào giỏ
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Giỏ hàng</CardTitle>
              <CardDescription>State được quản lý bởi Reducer</CardDescription>
            </div>
            <ShoppingCart className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex-1">
            {state.items.length === 0 ? (
              <div className="flex h-32 items-center justify-center text-sm text-muted-foreground border-2 border-dashed rounded-md mt-4">
                Giỏ hàng trống
              </div>
            ) : (
              <div className="space-y-4 mt-4">
                <div className="max-h-[300px] overflow-y-auto space-y-3 pr-2 shadow-inner p-2 rounded-md bg-slate-50/50">
                  {state.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-sm p-2 bg-white rounded border shadow-sm"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {item.price.toLocaleString()}đ
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border rounded-md px-1">
                          <button
                            onClick={() =>
                              dispatch({
                                type: 'UPDATE_QUANTITY',
                                payload: { id: item.id, amount: -1 },
                              })
                            }
                            className="p-1 hover:text-primary transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              dispatch({
                                type: 'UPDATE_QUANTITY',
                                payload: { id: item.id, amount: 1 },
                              })
                            }
                            className="p-1 hover:text-primary transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:bg-destructive/10"
                          onClick={() =>
                            dispatch({ type: 'REMOVE_ITEM', payload: item.id })
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t flex items-center justify-between">
                  <span className="font-bold">Tổng cộng:</span>
                  <span className="text-xl font-bold text-primary">
                    {state.total.toLocaleString()}đ
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="w-full text-xs"
                  onClick={() => dispatch({ type: 'CLEAR_CART' })}
                >
                  Xóa tất cả
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
