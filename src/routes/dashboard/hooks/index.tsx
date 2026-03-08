import { Link, createFileRoute } from '@tanstack/react-router'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const Route = createFileRoute('/dashboard/hooks/')({
  component: RouteComponent,
})

const HOOK_DEMOS = [
  {
    path: '/dashboard/hooks/use-callback',
    label: 'useCallback',
    description: 'Cache function definitions between renders.',
  },
  {
    path: '/dashboard/hooks/use-memo',
    label: 'useMemo',
    description: 'Cache calculated values for heavy computations.',
  },
  {
    path: '/dashboard/hooks/use-ref',
    label: 'useRef',
    description: 'Store mutable values and access DOM elements.',
  },
  {
    path: '/dashboard/hooks/use-context',
    label: 'useContext',
    description: 'Access global state without prop drilling.',
  },
  {
    path: '/dashboard/hooks/forward-ref',
    label: 'forwardRef',
    description: 'Pass refs and expose methods from child components.',
  },
  {
    path: '/dashboard/hooks/use-reducer',
    label: 'useReducer',
    description: 'Manage complex state with action-based updates.',
  },
  {
    path: '/dashboard/hooks/use-effect',
    label: 'useEffect',
    description: 'Handle side effects and lifecycle events.',
  },
  {
    path: '/dashboard/hooks/use-layout-effect',
    label: 'useLayoutEffect',
    description: 'Perform layout measurements before painting.',
  },
]

function RouteComponent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">React Hooks Demo</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Khám phá và học cách sử dụng các React Hook phổ biến thông qua các ví
          dụ thực tế.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {HOOK_DEMOS.map((demo) => (
          <Link key={demo.path} to={demo.path}>
            <Card className="h-full hover:border-primary transition-colors cursor-pointer group">
              <CardHeader>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {demo.label}
                </CardTitle>
                <CardDescription>{demo.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
