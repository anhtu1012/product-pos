import { Clock, RefreshCw } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function UseEffectDemo() {
  const [time, setTime] = useState(new Date())
  const [isRunning, setIsRunning] = useState(true)
  const [count, setCount] = useState(0)

  // 1. Tác vụ phụ: Đồng hồ (Interval)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning) {
      console.log('Clock interval started')
      interval = setInterval(() => {
        setTime(new Date())
      }, 1000)
    }

    // CLEANUP FUNCTION: Dọn dẹp khi dependency đổi hoặc component unmount
    return () => {
      if (interval) {
        console.log('Clock interval cleared (Cleanup)')
        clearInterval(interval)
      }
    }
  }, [isRunning]) // Chạy lại khi isRunning thay đổi

  // 2. Theo dõi state thay đổi
  useEffect(() => {
    if (count > 0) {
      console.log(`Count changed to: ${count}`)
      document.title = `Hooks Demo (${count})`
    }

    return () => {
      document.title = 'product-pos'
    }
  }, [count])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">useEffect Hook</h1>
        <p className="mt-1 text-muted-foreground">
          Dùng để thực hiện các side-effects (tác vụ phụ) như call API, đăng ký
          sự kiện, hay đồng bộ hóa với hệ thống bên ngoài.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Clock Service</CardTitle>
                <CardDescription>Demo setInterval & Cleanup</CardDescription>
              </div>
              <Clock
                className={`h-5 w-5 ${isRunning ? 'text-primary animate-pulse' : 'text-slate-300'}`}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-lg border-2 border-dashed">
              <span className="text-4xl font-mono font-bold tracking-widest text-primary">
                {time.toLocaleTimeString()}
              </span>
              <Badge
                variant={isRunning ? 'default' : 'secondary'}
                className="mt-4"
              >
                {isRunning ? 'Running' : 'Paused'}
              </Badge>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setIsRunning(!isRunning)}
                variant={isRunning ? 'destructive' : 'default'}
                className="flex-1"
              >
                {isRunning ? 'Dừng đồng hồ' : 'Chạy đồng hồ'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Document Title Sync</CardTitle>
            <CardDescription>
              Cập nhật tiêu đề trang web qua State
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-sm">
            <p className="text-slate-600 leading-relaxed">
              Nhấn nút để tăng số lượng. Bạn sẽ thấy tiêu đề của tab trình duyệt
              (Document Title) thay đổi theo state <code>count</code>.
            </p>

            <div className="flex items-center gap-4 p-4 border rounded-md">
              <Button
                onClick={() => setCount((c) => c + 1)}
                className="flex gap-2"
              >
                <RefreshCw className="h-4 w-4" /> Tăng count
              </Button>
              <div className="text-lg font-bold">
                Giá trị: <span className="text-primary">{count}</span>
              </div>
            </div>

            <div className="bg-amber-50 p-4 border border-amber-200 rounded-md text-amber-800 text-xs">
              <p className="font-bold mb-1 italic">
                📌 Dependency Array Rules:
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  <code>[]</code>: Chỉ chạy 1 lần duy nhất sau render đầu tiên.
                </li>
                <li>
                  <code>[prop, state]</code>: Chạy lại mỗi khi các giá trị này
                  thay đổi.
                </li>
                <li>
                  Không có mảng: Chạy lại sau <b>mọi</b> lần render (tốn hiệu
                  năng).
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
