import * as React from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import {
  BarChart2,
  Bell,
  ClipboardList,
  Grid2x2,
  LayoutDashboard,
  List,
  Package,
  Plus,
  Settings,
} from 'lucide-react'
import { getSidebarMenuRoutes } from '@/config/routes'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { colors } from '@/styles/colors'

// Icons fallback map

// Create an icon mapper
const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Package,
  List,
  Plus,
  ClipboardList,
  Grid2x2,
  BarChart2,
  Settings,
}

function RouteIcon({ name, className }: { name?: string; className?: string }) {
  const Icon = name ? iconMap[name] : null
  if (!Icon)
    return (
      <span className={`flex h-4 w-4 items-center justify-center ${className}`}>
        •
      </span>
    )
  return <Icon className={className} />
}

export function AppSidebar() {
  const pathname = useLocation({ select: (s) => s.pathname })
  const menuRoutes = getSidebarMenuRoutes()

  // Exclude Settings from main menu routes as it goes to Footer,
  // but if it's there we can just render everything from menuRoutes.
  // We'll filter it out to put Settings specifically in the Footer.
  const mainRoutes = menuRoutes.filter((r) => r.path !== '/dashboard/settings')

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard">
                <div
                  className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground"
                  style={{ backgroundColor: colors.primary[500] }}
                >
                  <span className="font-bold text-white">G</span>
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-base">GogiPOS</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu chính</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainRoutes.map((route) => {
                const isActive =
                  pathname === route.path ||
                  (route.path !== '/dashboard' &&
                    pathname.startsWith(route.path))

                return (
                  <SidebarMenuItem key={route.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={route.label}
                    >
                      <Link
                        to={
                          route.path === '/dashboard/products'
                            ? '/dashboard/products/list'
                            : route.path
                        }
                      >
                        <RouteIcon name={route.icon} />
                        <span>{route.label}</span>
                      </Link>
                    </SidebarMenuButton>

                    {/* Submenu if children exist */}
                    {route.children && isActive && (
                      <SidebarMenuSub>
                        {route.children
                          .filter((child) => !child.hideInMenu)
                          .map((child) => (
                            <SidebarMenuSubItem key={child.path}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === child.path}
                              >
                                <Link to={child.path}>
                                  <RouteIcon
                                    name={child.icon}
                                    className="mr-2 h-4 w-4"
                                  />
                                  <span>{child.label}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Cài đặt"
              isActive={pathname === '/dashboard/settings'}
            >
              <Link to="/dashboard/settings">
                <Settings />
                <span>Cài đặt</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b px-6 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-white">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="text-sm text-muted-foreground hidden sm:block">
          {/* Breadcrumbs can go here */}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-lg text-muted-foreground hover:bg-muted"
        >
          <Bell className="h-5 w-5" />
          <span
            className="absolute right-2 top-2 h-2 w-2 rounded-full"
            style={{ backgroundColor: colors.primary[500] }}
          />
        </Button>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarFallback
            className="text-sm font-semibold"
            style={{
              backgroundColor: colors.primary[100],
              color: colors.primary[700],
            }}
          >
            A
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-1 flex-col w-full overflow-hidden bg-slate-50">
        <Header />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </SidebarProvider>
  )
}

export default DashboardLayout
