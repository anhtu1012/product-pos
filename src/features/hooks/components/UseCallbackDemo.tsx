import { memo, useCallback, useEffect, useRef, useState } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

// Child component that uses React.memo
const ChildComponent = memo(
  ({ onAction, name }: { onAction?: () => void; name: string }) => {
    const renderCount = useRef(0)
    renderCount.current++

    return (
      <div className="p-4 border rounded-md bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="font-medium text-slate-800">
            Child Component ({name})
          </span>
          <span className="text-[10px] text-orange-600 font-bold uppercase tracking-wider">
            Số lần render: {renderCount.current}
          </span>
        </div>
        {/* <Button onClick={onAction} variant="outline" size="sm">
          Nhấn để gọi hàm
        </Button> */}
      </div>
    )
  },
)
ChildComponent.displayName = 'ChildComponent'

export function UseCallbackDemo() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')

  // Hàm này bị tạo lại mỗi khi component render (ví dụ khi biến text thay đổi)
  const handleWithoutCallback = () => {
    console.log('Action triggered without callback')
  }

  // Hàm này được "cache" lại, chỉ khi dependency (trong array) đổi thì mới tạo hàm mới
  const handleWithCallback = useCallback(() => {
    console.log('Action triggered with callback')
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">useCallback Hook</h1>
        <p className="text-muted-foreground mt-1">
          Dùng để lưu trữ (cache) một định nghĩa hàm giữa các lần render, giúp
          tối ưu hóa hiệu năng render component con.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Giải thích</CardTitle>
            <CardDescription>Nguyên lý hoạt động</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-700 leading-relaxed">
            <p>
              Mặc định, React sẽ tạo mới toàn bộ các hàm (function) bên trong
              component mỗi khi component đó re-render. Nếu bạn truyền hàm đó
              xuống một component con được đóng gói bằng <code>React.memo</code>
              , component con đó vẫn sẽ bị re-render vì hàm nhận được là một hàm
              mới (khác tham chiếu bộ nhớ).
            </p>
            <p>
              <strong>Giải pháp:</strong> Bọc hàm trong <code>useCallback</code>
              , React sẽ trả về đúng tham chiếu cũ của hàm đó miễn là các biến
              trong mảng dependency chưa thay đổi.
            </p>

            <Accordion type="single" collapsible className="mt-4 border-t pt-2">
              <AccordionItem value="memo-question" className="border-none">
                <AccordionTrigger className="py-2 hover:no-underline text-primary font-semibold italic">
                  ❓ Không dùng memo ở ChildComponent thì có sao không?
                </AccordionTrigger>
                <AccordionContent className="space-y-4 text-slate-600">
                  <p>
                    <strong>
                      Câu trả lời: Nếu không dùng <code>memo</code>, thì{' '}
                      <code>useCallback</code> gần như trở nên "vô nghĩa".
                    </strong>
                  </p>
                  <div className="space-y-2 pl-2 border-l-2 border-slate-200">
                    <p>
                      <strong>1. Cơ chế mặc định:</strong> Khi Cha re-render,
                      tất cả Con sẽ re-render theo, bất kể Props có đổi hay
                      không.
                    </p>
                    <p>
                      <strong>2. Vai trò của React.memo:</strong> Là "chốt chặn"
                      kiểm tra Props."Props mới có khác props cũ không? Nếu
                      giống hệt thì đừng render lại tôi cho tốn sức".
                    </p>
                    <p>
                      <strong>3. Tại sao cần cả hai:</strong> Trong JS, 2 hàm
                      tạo mới sẽ có tham chiếu khác nhau. Nếu chỉ có{' '}
                      <code>memo</code> mà không có <code>useCallback</code>,{' '}
                      <code>memo</code> sẽ thấyProps (hàm) bị đổi ➔ Vẫn render.
                    </p>
                  </div>
                  <p className="bg-slate-50 p-3 rounded-md italic">
                    💡 <strong>Ví dụ:</strong> <code>useCallback</code> là giữ
                    chiếc chìa khóa cũ. <code>memo</code> là cánh cửa có ổ khóa.
                    Nếu không có cánh cửa (memo), ai cũng có thể vào (render) dù
                    bạn cầm chìa cũ hay mới.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Demo thực tế</CardTitle>
            <CardDescription>
              Mở console log (F12) để xem ChildComponent nào bị re-render
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Button onClick={() => setCount((c) => c + 1)}>
                Tăng biến đếm: {count}
              </Button>

              <Button onClick={handleWithCallback}>
                Tăng biến đếm: {count}
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Việc gõ phím làm thay đổi State và khiến Component cha
                re-render:
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="Gõ gì đó..."
              />
            </div>

            <div className="space-y-4 mt-6">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                Components con nhận hàm qua Props
              </h3>

              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">
                  - Hàm bị tạo mới liên tục ➔ ChildComponent mất tác dụng của
                  React.memo, luôn bị re-render theo cha.
                </p>
                <ChildComponent
                  name="Không dùng useCallback"
                  onAction={handleWithoutCallback}
                />
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-xs text-muted-foreground">
                  + Hàm được cache lại qua useCallback ➔ ChildComponent không bị
                  re-render nhờ nhận đúng tham chiếu hàm cũ.
                </p>
                <ChildComponent
                  name="Dùng useCallback"
                  onAction={handleWithCallback}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
