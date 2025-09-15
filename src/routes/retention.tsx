import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/retention')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/retention"!</div>
}
