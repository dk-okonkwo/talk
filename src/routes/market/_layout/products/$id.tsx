import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/market/_layout/products/$id')({
  component: RouteComponent,
  loader: ({ params }) => {
    // Here you can fetch product data based on the id from params
    // For example, you might call an API to get product details
    const productId = params.id;
    console.log(`Fetching product with id: ${productId}`);
    // Simulate fetching product data
    return { id: productId, name: `Product ${productId}` };
  }
})

function RouteComponent() {
  return <div>Hello "/market/_layout/products/$id"!</div>
}
