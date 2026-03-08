/**
 * ============================================================
 *  ROUTE CONFIG — product-pos
 * ============================================================
 *  File quản lý tập trung toàn bộ thông tin route của ứng dụng.
 *  Dùng để render menu, breadcrumb, guard permission, v.v.
 * ============================================================
 */

// ─── Kiểu dữ liệu ────────────────────────────────────────────

export type RouteLayout = 'header-footer' | 'header-sidebar' | 'blank'

export interface AppRoute {
  /** Đường dẫn URL, khớp với file-based route của TanStack Router */
  path: string
  /** Tên hiển thị (dùng cho menu, breadcrumb) */
  label: string
  /** Icon name (lucide-react hoặc chuỗi tuỳ ý) */
  icon?: string
  /** Layout bọc trang */
  layout: RouteLayout
  /** Ẩn khỏi menu nếu true */
  hideInMenu?: boolean
  /** Các route con (dùng khi cần nested menu) */
  children?: Array<AppRoute>
}

// ─── Định nghĩa các route ────────────────────────────────────

export const appRoutes: Array<AppRoute> = [
  // ── Public / Auth ─────────────────────────────
  {
    path: '/login',
    label: 'Đăng nhập',
    layout: 'blank',
    hideInMenu: true,
  },

  // ── Main app (Header + Sidebar) ───────────────
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    layout: 'header-sidebar',
  },
  {
    path: '/dashboard/pos',
    label: 'POS',
    icon: 'ShoppingCart',
    layout: 'header-sidebar',
  },
  {
    path: '/dashboard/products',
    label: 'Sản phẩm',
    icon: 'Package',
    layout: 'header-sidebar',
    children: [
      {
        path: '/dashboard/products/list',
        label: 'Danh sách',
        icon: 'List',
        layout: 'header-sidebar',
      },
      {
        path: '/dashboard/products/create',
        label: 'Thêm mới',
        icon: 'Plus',
        layout: 'header-sidebar',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/dashboard/orders',
    label: 'Đơn hàng',
    icon: 'ClipboardList',
    layout: 'header-sidebar',
  },
  {
    path: '/dashboard/tables',
    label: 'Quản lý bàn',
    icon: 'Grid2x2',
    layout: 'header-sidebar',
  },
  {
    path: '/dashboard/reports',
    label: 'Báo cáo',
    icon: 'BarChart2',
    layout: 'header-sidebar',
  },
  {
    path: '/dashboard/hooks',
    label: 'Demo Hook',
    icon: 'List',
    layout: 'header-sidebar',
    children: [
      {
        path: '/dashboard/hooks/use-callback',
        label: 'useCallback',
        layout: 'header-sidebar',
      },
      {
        path: '/dashboard/hooks/use-memo',
        label: 'useMemo',
        layout: 'header-sidebar',
      },
      {
        path: '/dashboard/hooks/use-ref',
        label: 'useRef',
        layout: 'header-sidebar',
      },
      {
        path: '/dashboard/hooks/use-context',
        label: 'useContext',
        layout: 'header-sidebar',
      },
      {
        path: '/dashboard/hooks/forward-ref',
        label: 'forwardRef',
        layout: 'header-sidebar',
      },
      {
        path: '/dashboard/hooks/use-reducer',
        label: 'useReducer',
        layout: 'header-sidebar',
      },
      {
        path: '/dashboard/hooks/use-effect',
        label: 'useEffect',
        layout: 'header-sidebar',
      },
    ],
  },
  {
    path: '/dashboard/settings',
    label: 'Cài đặt',
    icon: 'Settings',
    layout: 'header-sidebar',
  },

  // ── Info pages (Header + Footer) ──────────────
  {
    path: '/about',
    label: 'Giới thiệu',
    layout: 'header-footer',
    hideInMenu: true,
  },
  {
    path: '/privacy',
    label: 'Chính sách bảo mật',
    layout: 'header-footer',
    hideInMenu: true,
  },
]

// ─── Utilities ───────────────────────────────────────────────

/** Lấy danh sách route hiển thị trong menu sidebar */
export const getSidebarMenuRoutes = (): Array<AppRoute> =>
  appRoutes.filter((r) => r.layout === 'header-sidebar' && !r.hideInMenu)

/** Lấy layout của một path cụ thể */
export const getLayoutForPath = (path: string): RouteLayout => {
  const flatten = (routes: Array<AppRoute>): Array<AppRoute> =>
    routes.flatMap((r) => [r, ...(r.children ? flatten(r.children) : [])])

  const found = flatten(appRoutes).find((r) => r.path === path)
  return found?.layout ?? 'header-sidebar'
}
