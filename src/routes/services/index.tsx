import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/services/')({
  component: ServicesList,
})

function ServicesList() {
  return <div>Hello "/services/"!</div>
}
