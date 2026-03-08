/**
 * ============================================================
 *  LAYOUT 2 — HeaderSidebarLayout
 * ============================================================
 *  Cấu trúc:
 *   ┌──────────────────────────────┐
 *   │           HEADER             │  ← fixed top
 *   ├────────┬─────────────────────┤
 *   │        │                     │
 *   │SIDEBAR │   MAIN CONTENT      │
 *   │(fixed) │   (scrollable)      │
 *   │        │                     │
 *   └────────┴─────────────────────┘
 *
 *  Dùng cho: dashboard, quản lý sản phẩm, đơn hàng, báo cáo, v.v.
 * ============================================================
 */

import React, { createContext, useContext, useState } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import type { AppRoute } from '@/config/routes'
import { getSidebarMenuRoutes } from '@/config/routes'
import { colors } from '@/styles/colors'

// shadcn components
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

// ─── Sidebar context (collapse state) ────────────────────────

interface SidebarContextValue {
  collapsed: boolean
  toggle: () => void
}

const SidebarContext = createContext<SidebarContextValue>({
  collapsed: false,
  toggle: () => {},
})

export const useSidebar = () => useContext(SidebarContext)

// ─── Sidebar Width constants ──────────────────────────────────

const SIDEBAR_W = 240
const SIDEBAR_W_COLLAPSED = 64

// ─── Icon map (text fallback) ─────────────────────────────────
// Nếu bạn cài lucide-react thì thay bằng import icon thật

const IconFallback: Record<string, string> = {
  LayoutDashboard: '⊞',
  Package: '📦',
  List: '☰',
  Plus: '+',
  ClipboardList: '📋',
  Grid2x2: '⊡',
  BarChart2: '📊',
  Settings: '⚙',
  ChevronLeft: '‹',
  ChevronRight: '›',
  Menu: '☰',
  Bell: '🔔',
  User: '👤',
}

function RouteIcon({ name }: { name?: string }) {
  return (
    <span className="flex h-5 w-5 items-center justify-center text-base leading-none">
      {name ? (IconFallback[name] ?? '•') : '•'}
    </span>
  )
}

// ─── Header ──────────────────────────────────────────────────

function Header() {
  const { collapsed, toggle } = useSidebar()

  return (
    <header
      style={{
        backgroundColor: colors.header.bg,
        borderBottom: `1px solid ${colors.header.border}`,
        boxShadow: colors.header.shadow,
        left: collapsed ? SIDEBAR_W_COLLAPSED : SIDEBAR_W,
        right: 0,
        top: 0,
        transition: 'left 0.25s ease',
      }}
      className="fixed z-40 flex h-16 items-center gap-4 px-6"
    >
      {/* Hamburger toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggle}
        style={{ color: colors.text.secondary }}
        className="rounded-lg transition-colors hover:bg-gray-100"
        aria-label="Toggle sidebar"
      >
        <span className="text-xl">{IconFallback['Menu']}</span>
      </Button>

      {/* Breadcrumb placeholder */}
      <div style={{ color: colors.text.muted }} className="flex-1 text-sm">
        {/* TODO: thêm breadcrumb động nếu cần */}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Notification */}
        <Button
          variant="ghost"
          size="icon"
          style={{ color: colors.text.secondary }}
          className="relative rounded-lg transition-colors hover:bg-gray-100"
          aria-label="Thông báo"
        >
          <span className="text-lg">{IconFallback['Bell']}</span>
          <span
            style={{ backgroundColor: colors.primary[500] }}
            className="absolute right-2 top-2 h-2 w-2 rounded-full"
          />
        </Button>

        {/* Avatar */}
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarFallback
            style={{
              backgroundColor: colors.primary[100],
              color: colors.primary[700],
            }}
            className="text-sm font-semibold"
          >
            A
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────

function SidebarItem({
  route,
  collapsed,
}: {
  route: AppRoute
  collapsed: boolean
}) {
  const pathname = useLocation({ select: (s) => s.pathname })
  const [hovered, setHovered] = useState(false)

  const isActive =
    pathname === route.path ||
    (route.path !== '/' && pathname.startsWith(route.path))

  const bgColor = isActive
    ? colors.sidebar.bgActive
    : hovered
      ? colors.sidebar.bgHover
      : 'transparent'

  const textColor = isActive ? colors.text.inverse : colors.sidebar.text

  return (
    <Link
      to={route.path}
      style={{ backgroundColor: bgColor, color: textColor }}
      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <RouteIcon name={route.icon} />
      {!collapsed && (
        <span className="truncate transition-opacity duration-200">
          {route.label}
        </span>
      )}
    </Link>
  )
}

function Sidebar() {
  const { collapsed } = useSidebar()
  const menuRoutes = getSidebarMenuRoutes()
  const width = collapsed ? SIDEBAR_W_COLLAPSED : SIDEBAR_W

  return (
    <aside
      style={{
        width,
        backgroundColor: colors.sidebar.bg,
        transition: 'width 0.25s ease',
        top: 0,
        left: 0,
        bottom: 0,
      }}
      className="fixed z-50 flex flex-col overflow-hidden"
    >
      {/* Logo */}
      <div
        style={{
          minHeight: 64,
        }}
        className="flex items-center gap-3 px-3 relative"
      >
        <div
          style={{ backgroundColor: colors.primary[500] }}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
        >
          <span className="text-base font-bold text-white">G</span>
        </div>
        {!collapsed && (
          <span
            style={{ color: colors.sidebar.text }}
            className="truncate text-base font-bold tracking-tight"
          >
            GogiPOS
          </span>
        )}
        <Separator className="absolute bottom-0 left-0 right-0 bg-white/10" />
      </div>

      {/* Menu */}
      <ScrollArea className="flex-1 w-full relative">
        <div className="px-2 py-4">
          <ul className="space-y-1">
            {menuRoutes.map((route) => (
              <li key={route.path}>
                <SidebarItem route={route} collapsed={collapsed} />
              </li>
            ))}
          </ul>
        </div>
      </ScrollArea>

      {/* Bottom: Settings */}
      <div className="relative px-2 py-3">
        <Separator className="absolute top-0 left-0 right-0 bg-white/10" />
        <SidebarItem
          route={{
            path: '/settings',
            label: 'Cài đặt',
            icon: 'Settings',
            layout: 'header-sidebar',
          }}
          collapsed={collapsed}
        />
      </div>
    </aside>
  )
}

// ─── Layout ──────────────────────────────────────────────────

interface HeaderSidebarLayoutProps {
  children: React.ReactNode
}

export function HeaderSidebarLayout({ children }: HeaderSidebarLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  const sidebarW = collapsed ? SIDEBAR_W_COLLAPSED : SIDEBAR_W

  return (
    <SidebarContext.Provider
      value={{ collapsed, toggle: () => setCollapsed((v) => !v) }}
    >
      <div
        style={{ backgroundColor: colors.surface.background }}
        className="min-h-screen"
      >
        {/* Sidebar cố định bên trái */}
        <Sidebar />

        {/* Header cố định trên cùng (offset theo sidebar) */}
        <Header />

        {/* Main content — offset trái = sidebar width, offset trên = header height */}
        <main
          style={{
            marginLeft: sidebarW,
            marginTop: 64,
            transition: 'margin-left 0.25s ease',
            minHeight: 'calc(100vh - 64px)',
          }}
          className="p-6"
        >
          {children}
        </main>
      </div>
    </SidebarContext.Provider>
  )
}

export default HeaderSidebarLayout
