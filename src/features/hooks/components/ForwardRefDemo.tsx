import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

// Child Component using forwardRef
interface CustomInputProps {
  label: string
  placeholder?: string
}

export interface CustomInputHandle {
  focus: () => void
  clear: () => void
  getValue: () => string
}

const CustomInput = forwardRef<CustomInputHandle, CustomInputProps>(
  (props, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [value, setValue] = useState('')

    // Expose specific methods to parent via useImperativeHandle
    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus()
      },
      clear: () => {
        setValue('')
      },
      getValue: () => value,
    }))

    return (
      <div className="space-y-2">
        <label className="text-sm font-medium">{props.label}</label>
        <Input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={props.placeholder}
          className="w-full"
        />
      </div>
    )
  },
)
CustomInput.displayName = 'CustomInput'

export function ForwardRefDemo() {
  const customInputRef = useRef<CustomInputHandle>(null)

  const handleFocus = () => {
    customInputRef.current?.focus()
  }

  const handleClear = () => {
    customInputRef.current?.clear()
  }

  const handleShowValue = () => {
    const val = customInputRef.current?.getValue()
    alert(`Current value: "${val}"`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          forwardRef & useImperativeHandle
        </h1>
        <p className="mt-1 text-muted-foreground">
          <code>forwardRef</code> cho phép component con nhận ref từ cha, và{' '}
          <code>useImperativeHandle</code> giúp tùy biến các hàm/giá trị mà ref
          đó cung cấp ra ngoài.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Demo Component Con</CardTitle>
            <CardDescription>
              Component tùy chỉnh được bọc bởi forwardRef
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CustomInput
              ref={customInputRef}
              label="Nhập thông tin tại đây"
              placeholder="Gõ nội dung..."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Điều khiển từ Component Cha</CardTitle>
            <CardDescription>
              Sử dụng Ref để gọi các phương thức của con
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <Button onClick={handleFocus} variant="outline">
                Gọi .focus() từ Cha
              </Button>
              <Button onClick={handleClear} variant="outline">
                Gọi .clear() từ Cha
              </Button>
              <Button onClick={handleShowValue} variant="default">
                Gọi .getValue() từ Cha
              </Button>
            </div>

            <div className="rounded-md bg-slate-50 p-4 mt-4 text-xs text-slate-600 leading-relaxed">
              <p className="font-semibold mb-2">
                Lưu ý về Performance & Pattern:
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  Nên hạn chế dùng ref để thay đổi UI, hãy ưu tiên dùng
                  State/Props.
                </li>
                <li>
                  Hữu ích khi cần giao tiếp trực tiếp với DOM (focus, scroll)
                  hoặc tích hợp thư viện bên thứ 3.
                </li>
                <li>
                  <code>useImperativeHandle</code> giúp chúng ta không phơi bày
                  toàn bộ DOM element của con ra ngoài mà chỉ cung cấp những hàm
                  cần thiết.
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
