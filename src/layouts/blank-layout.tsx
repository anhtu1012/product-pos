import React from 'react'

interface BlankLayoutProps {
  children: React.ReactNode
}

export function BlankLayout({ children }: BlankLayoutProps) {
  return <div className="min-h-screen bg-background">{children}</div>
}

export default BlankLayout
