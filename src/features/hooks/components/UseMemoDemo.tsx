import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

// Một function giả lập tính toán nặng (VD: for loop 1 tỷ vòng)
function slowFunction(num: number, label: string) {
  console.log(`[${label}] Đang tính toán...`)
  const startTime = performance.now()
  for (let i = 0; i <= 800000000; i++) {}
  const endTime = performance.now()
  console.log(`[${label}] Xong! (${(endTime - startTime).toFixed(0)}ms)`)
  return num * 2
}

export function UseMemoDemo() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">useMemo Hook</h1>
        <p className="text-muted-foreground mt-1">
          Dùng để lưu bộ nhớ đệm (cache) KẾT QUẢ của một phép tính tốn tài
          nguyên hoặc đối tượng phức tạp giữa các lần render.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <SlowCard />
        <FastCard />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Kết luận</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-slate-600 space-y-2 leading-relaxed">
          <p>Khi tách ra 2 component riêng biệt, bạn sẽ thấy:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Bên Trái (Slow):</strong> Mỗi lần render là một lần "cày"
              lại function nặng, gây đơ giao diện.
            </li>
            <li>
              <strong>Bên Phải (Fast):</strong> Chỉ "cày" khi số Input thay đổi.
              Các lần render khác (đổi theme, click nút) sẽ lấy kết quả từ bộ
              nhớ đệm ngay lập tức.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

// ---------------------------------------------------------
// 1. COMPONENT CHẬM (KHÔNG DÙNG useMemo)
// ---------------------------------------------------------
function SlowCard() {
  const [count, setCount] = useState(0)
  const [number, setNumber] = useState(10)

  // Gọi trực tiếp => Chạy lại bất kể state nào trong này thay đổi
  const result = slowFunction(number, 'SLOW')

  return (
    <Card className="border-red-200 border-2 shadow-sm">
      <CardHeader className="bg-red-50/50">
        <CardTitle className="text-red-700">
          🔴 Case 1: Không dùng useMemo
        </CardTitle>
        <CardDescription>Mọi thay đổi đều gây tính toán lại.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">
              1. Thay đổi số (Input):
            </label>
            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(parseInt(e.target.value) || 0)}
              className="w-full h-10 rounded-md border border-slate-300 px-3 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">
              2. Render không liên quan:
            </label>
            <Button
              onClick={() => setCount((c) => c + 1)}
              variant="outline"
              className="w-full border-red-300 text-red-700 hover:bg-red-50"
            >
              Click để Re-render (Máy sẽ đơ 1s)
            </Button>
            <p className="text-[10px] text-center text-slate-400 italic">
              Số lần bấm: {count}
            </p>
          </div>
        </div>

        <div className="p-4 border border-red-200 rounded-lg bg-white flex flex-col items-center">
          <span className="text-[10px] font-bold text-red-500 mb-1">
            KẾT QUẢ (LUÔN TÍNH LẠI):
          </span>
          <span className="text-3xl font-black text-slate-800">{result}</span>
        </div>
      </CardContent>
    </Card>
  )
}

// ---------------------------------------------------------
// 2. COMPONENT NHANH (CÓ DÙNG useMemo)
// ---------------------------------------------------------
function FastCard() {
  const [count, setCount] = useState(0)
  const [number, setNumber] = useState(10)

  // Chỉ chạy lại khi 'number' thay đổi
  const result = useMemo(() => {
    return slowFunction(number, 'FAST')
  }, [number])

  return (
    <Card className="border-green-200 border-2 shadow-md">
      <CardHeader className="bg-green-50/50">
        <CardTitle className="text-green-700">
          🟢 Case 2: Có dùng useMemo
        </CardTitle>
        <CardDescription>Chỉ tính lại khi Input thay đổi.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">
              1. Thay đổi số (Input):
            </label>
            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(parseInt(e.target.value) || 0)}
              className="w-full h-10 rounded-md border border-slate-300 px-3 text-sm focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">
              2. Render không liên quan:
            </label>
            <Button
              onClick={() => setCount((c) => c + 1)}
              variant="outline"
              className="w-full border-green-300 text-green-700 hover:bg-green-50"
            >
              Click để Re-render (Mượt cực kỳ)
            </Button>
            <p className="text-[10px] text-center text-slate-400 italic">
              Số lần bấm: {count}
            </p>
          </div>
        </div>

        <div className="p-4 border border-green-200 rounded-lg bg-white flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-1 right-1">
            <span className="text-[8px] bg-green-500 text-white px-1 rounded font-bold">
              CACHED
            </span>
          </div>
          <span className="text-[10px] font-bold text-green-500 mb-1">
            KẾT QUẢ (DÙNG CACHE):
          </span>
          <span className="text-3xl font-black text-slate-800">{result}</span>
        </div>
      </CardContent>
    </Card>
  )
}
