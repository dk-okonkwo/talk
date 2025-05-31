import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/product/$productId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const { productId } = params
    // Simulate fetching product data based on productId
    return { productId }
  }
})

function RouteComponent() {
  // const { productId } = Route.useLoaderData()
  return (
    <div className='bg-talkBG min-h-screen'>
      <main>
        <h3 className='font-medium'>2020 Apple MacBook Pro with Apple M1 Chip (13-inch, 8GB RAM, 256GB SSD Storage) - Space Gray</h3>
        <div className='flex items-center gap-1 my-4 text-xs tracking-wide'>  
          <div>
            {Array.from({ length: 5 }, (_, index) => (
                <span key={index} className='text-lg text-yellow-500'>★</span>
            ))} 
          </div>
          <p className='font-medium'>4.7 Star Rating</p>
          <p className='opacity-70'>(21,671 User feedback)</p>
        </div>
      </main>
    </div>
  )
}
