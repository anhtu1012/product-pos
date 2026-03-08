import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function UseRefDemo() {
  const [renderCount, setRenderCount] = useState(0)

  // Ref để lưu trữ giá trị mà KHÔNG LÀM component rerender
  const countRef = useRef(0)

  // Ref để lấy đối tượng DOM trực tiếp
  const inputRef = useRef<HTMLInputElement>(null)

  const handleIncrementState = () => {
    setRenderCount((prev) => prev + 1)
    console.log(renderCount)
  }

  const handleIncrementRef = () => {
    countRef.current += 1
    // Xem log để thấy biến ref tăng dù giao diện React không đổi
    console.log(`countRef.current is now: ${countRef.current}`)
  }

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus()
      inputRef.current.style.borderColor = 'green'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">useRef Hook</h1>
        <p className="mt-1 text-muted-foreground">
          Dùng để lưu trữ một mutable value (mảng/số/chuỗi) không làm re-render,
          hoặc truy xuất trực tiếp vào DOM Element.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Case 1: Lưu trữ giá trị ẩn danh</CardTitle>
            <CardDescription>Khác biệt giữa State và Ref</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-sm">
            <p className="text-slate-700">
              Biến State khi thay đổi sẽ gọi React tiến hành Update và{' '}
              <b>Re-render giao diện</b>. Biến Ref khi thay đổi (gọi property{' '}
              <code>.current = ...</code>) sẽ bảo toàn qua các lần render nhưng{' '}
              <b>KHÔNG LÀM GIAO DIỆN CẬP NHẬT</b>.
            </p>

            <div className="flex items-center gap-4 rounded-md border p-4">
              <Button onClick={handleIncrementState}>Tăng State</Button>
              <span className="font-semibold text-primary">
                State: {renderCount}
              </span>
            </div>

            <div className="flex items-center gap-4 rounded-md border bg-slate-50 p-4">
              <Button onClick={handleIncrementRef} variant="secondary">
                Tăng Ref
              </Button>
              <span className="font-semibold text-primary">
                Ref (Chỉ đổi khi component rerender do State):{' '}
                {countRef.current}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Case 2: Truy xuất DOM Element</CardTitle>
            <CardDescription>
              Bypass Virtual DOM để lấy thẻ thật (Input, Div...)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Ô nhập liệu này sẽ được focus qua Ref:
              </label>
              <input
                ref={inputRef}
                type="text"
                className="flex h-10 w-full rounded-md border-2 border-slate-300 px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none"
                placeholder="Click nút Focus..."
              />
            </div>

            <Button onClick={handleFocus} className="w-full">
              Tự động Focus
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
