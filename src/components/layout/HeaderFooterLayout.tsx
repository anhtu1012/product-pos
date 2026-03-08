/**
 * ============================================================
 *  LAYOUT 1 — HeaderFooterLayout
 * ============================================================
 *  Cấu trúc:
 *   ┌──────────────────────────────┐
 *   │           HEADER             │
 *   ├──────────────────────────────┤
 *   │                              │
 *   │      MAIN CONTENT (flex-1)   │
 *   │                              │
 *   ├──────────────────────────────┤
 *   │           FOOTER             │
 *   └──────────────────────────────┘
 *
 *  Dùng cho: trang giới thiệu, landing page, chính sách, v.v.
 * ============================================================
 */

import React from 'react'
import { Link } from '@tanstack/react-router'
import { colors } from '@/styles/colors'

// shadcn components
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

// ─── Header ──────────────────────────────────────────────────

function Header() {
  return (
    <header
      style={{
        backgroundColor: colors.header.bg,
        boxShadow: colors.header.shadow,
      }}
      className="sticky top-0 z-50 w-full"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 relative">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div
            style={{ backgroundColor: colors.primary[500] }}
            className="flex h-8 w-8 items-center justify-center rounded-lg"
          >
            <span className="text-sm font-bold text-white">G</span>
          </div>
          <span
            style={{ color: colors.primary[600] }}
            className="text-lg font-bold tracking-tight"
          >
            GogiPOS
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link
              to="/"
              style={{ color: colors.text.secondary }}
              activeProps={{
                style: {
                  color: colors.primary[600],
                  backgroundColor: 'transparent',
                },
              }}
            >
              Trang chủ
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link
              to="/about"
              style={{ color: colors.text.secondary }}
              activeProps={{
                style: {
                  color: colors.primary[600],
                  backgroundColor: 'transparent',
                },
              }}
            >
              Giới thiệu
            </Link>
          </Button>
          <Button
            asChild
            style={{
              backgroundColor: colors.primary[500],
              color: colors.text.inverse,
            }}
          >
            <Link to="/login">Đăng nhập</Link>
          </Button>
        </nav>

        <Separator
          className="absolute bottom-0 left-0 right-0"
          style={{ backgroundColor: colors.header.border }}
        />
      </div>
    </header>
  )
}

// ─── Footer ──────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        backgroundColor: colors.sidebar.bg,
        color: colors.sidebar.text,
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div
                style={{ backgroundColor: colors.primary[500] }}
                className="flex h-8 w-8 items-center justify-center rounded-lg"
              >
                <span className="text-sm font-bold text-white">G</span>
              </div>
              <span className="text-lg font-bold">GogiPOS</span>
            </div>
            <p
              style={{ color: colors.sidebar.textMuted }}
              className="text-sm leading-relaxed"
            >
              Hệ thống quản lý nhà hàng thông minh — nhanh, gọn, hiệu quả.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider">
              Liên kết
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Trang chủ', path: '/' },
                { label: 'Giới thiệu', path: '/about' },
                { label: 'Chính sách bảo mật', path: '/privacy' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    style={{ color: colors.sidebar.textMuted }}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider">
              Liên hệ
            </h4>
            <address
              className="space-y-1 not-italic"
              style={{ color: colors.sidebar.textMuted }}
            >
              <p className="text-sm">📧 support@gogipos.vn</p>
              <p className="text-sm">📞 1800 6789</p>
              <p className="text-sm">📍 TP. Hồ Chí Minh, Việt Nam</p>
            </address>
          </div>
        </div>

        <div className="mt-8 relative pt-6 text-center">
          <Separator className="absolute top-0 left-0 right-0 bg-white/10" />
          <p style={{ color: colors.sidebar.textMuted }} className="text-xs">
            © {year} GogiPOS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── Layout ──────────────────────────────────────────────────

interface HeaderFooterLayoutProps {
  children: React.ReactNode
}

export function HeaderFooterLayout({ children }: HeaderFooterLayoutProps) {
  return (
    <div
      style={{ backgroundColor: colors.surface.background }}
      className="flex min-h-screen flex-col"
    >
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default HeaderFooterLayout
