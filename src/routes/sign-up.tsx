import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sign-up')({
  component: SignUp,
})

function SignUp() {
  return (
    <main className="flex flex-col items-center text-center bg-amber-400 min-h-screen py-2">
      <h1 className="text-4xl font-bold">Sign Up</h1>
      <h2 className="text-2xl font-bold">Create Account</h2>
    </main>

  )
}