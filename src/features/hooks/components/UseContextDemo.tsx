import { createContext, useContext, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

// 1. Tạo Context
interface ThemeContextType {
  theme: 'light' | 'dark' | 'neon'
  setTheme: (theme: 'light' | 'dark' | 'neon') => void
}
const ThemeContext = createContext<ThemeContextType | null>(null)

export function UseContextDemo() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'neon'>('light')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">useContext Hook</h1>
        <p className="mt-1 text-muted-foreground">
          Lấy dữ liệu (Theme, Data User, Locale) từ xa bằng cách đọc trực tiếp
          từ context của component cha mà không cần truyền "props drilling" phức
          tập qua con cháu.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Giải thích Prop Drilling vs Context</CardTitle>
            <CardDescription>Nhu cầu của useContext</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-700">
            <p>
              Giả sử ta có cây Component:{' '}
              <b>App ➔ Layout ➔ Header ➔ UserProfile</b>. <br />
              Nếu thông tin User chỉ cần ở <b>UserProfile</b>, ta sẽ phải truyền{' '}
              <code>user=&#123;user&#125;</code> qua tất cả các lớp trung gian
              (Props drilling). Trông rất rối rắm nếu cả chục Component cần
              chung một file.
            </p>
            <p>
              Với <code>Context API</code>: <br />- Bọc thẻ ngoài cùng{' '}
              <code>&lt;XContext.Provider value=&#123;value&#125;&gt;</code>.{' '}
              <br />- Rút thẻ con dùng{' '}
              <code>let data = useContext(XContext)</code> ở tít bên trong mà
              chẳng cần thông qua ai cả.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Demo thực tế</CardTitle>
            <CardDescription>
              Sử dụng Provider để bao bọc mọi Component con phía dưới
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 2. Bọc Provider ở Component lớn (App) */}
            <ThemeContext.Provider value={{ theme, setTheme }}>
              <div className="relative flex min-h-[200px] flex-col items-center justify-center rounded-md border border-dashed bg-slate-100 p-4">
                <span className="absolute left-2 top-2 text-xs font-semibold uppercase text-slate-400">
                  Context Provider
                </span>
                <Sidebar />
                <MainContent />
              </div>
            </ThemeContext.Provider>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ----------------------------------------------------
// COMPONENTS CON (Bên trong không cần nhận Props)
// ----------------------------------------------------

function Sidebar() {
  // Lấy giá trị trực tiếp từ Context thay vì nhận props từ cha truyền qua hàm.
  const context = useContext(ThemeContext)
  if (!context) return null

  return (
    <div className="mb-4 w-full rounded-md border bg-white p-4 shadow-sm">
      <h3 className="mb-2 text-sm font-semibold">
        Component Trung Gian (Sidebar)
      </h3>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={context.theme === 'light' ? 'default' : 'outline'}
          onClick={() => context.setTheme('light')}
        >
          Theme sáng
        </Button>
        <Button
          size="sm"
          variant={context.theme === 'dark' ? 'default' : 'outline'}
          onClick={() => context.setTheme('dark')}
        >
          Theme tối
        </Button>
        <Button
          size="sm"
          variant={context.theme === 'neon' ? 'default' : 'outline'}
          onClick={() => context.setTheme('neon')}
        >
          Cyberpunk
        </Button>
      </div>
    </div>
  )
}

function MainContent() {
  // Cập nhật giao diện tự động lấy từ Context
  const context = useContext(ThemeContext)
  if (!context) return null

  const bgMap = {
    light: 'bg-white text-black',
    dark: 'bg-slate-900 text-white',
    neon: 'bg-purple-900 text-green-400 font-mono border-green-400 shadow-[0_0_15px_rgba(0,255,0,0.5)]',
  }

  return (
    <div
      className={`w-full flex-1 rounded-md border p-4 transition-all duration-300 ${bgMap[context.theme]}`}
    >
      <h3 className="mb-2 text-sm font-semibold">
        Component Sâu Bên Trong (Đích)
      </h3>
      <p className="text-sm">
        Nhờ <code>useContext</code> mà dù thẻ con này ở sâu bao nhiêu đi chăng
        nữa, nó luôn có thể nhận được thay đổi từ cha.
      </p>
    </div>
  )
}
