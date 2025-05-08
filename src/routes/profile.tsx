import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <Link to='/sign-in'>sign in</Link>
    <Link to='/sign-up'>sign up</Link>
  </div>
}
