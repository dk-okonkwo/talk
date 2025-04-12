import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/billboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/billboard"!</div>
}
