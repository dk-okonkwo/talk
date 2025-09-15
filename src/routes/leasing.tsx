import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/leasing')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/leasing"!</div>
}
