import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tenant-rent')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tenant-rent"!</div>
}
