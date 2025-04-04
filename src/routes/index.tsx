import { Link } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
  
})

function Index() {
  return (
    <div className="p-2">
      <Link to="/sign-in" className="[&.active]:font-bold">sign in</Link>
      <Link to="/sign-up" className="[&.active]:font-bold">sign up</Link>

    </div>
  )
}