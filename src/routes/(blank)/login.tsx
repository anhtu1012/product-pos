import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(blank)/login')({
  component: LoginPage,
})

function LoginPage() {
  return (
    <div>
      <h1>Đăng nhập</h1>
    </div>
  )
}
