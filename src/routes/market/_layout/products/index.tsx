import { createFileRoute, useRouter } from "@tanstack/react-router";
import ProductCard from "@/components/ProductCard";
import { ProductType } from "@/lib/types";
import Cookies from "js-cookie";
import axios from "axios";

export const Route = createFileRoute("/market/_layout/products/")({
  component: ProductList,
  loader : async () => {
    try {
      const accessToken = Cookies.get('access_token')
  
      if (!accessToken) {
        // Return a flag to indicate redirect is needed
        return { posts: [], redirect: true }
      }
  
      console.log('Sending request...')
  
      const datares = await axios.get(
        'https://talk-l955.onrender.com/api/v1/products/marketplace/list-products/',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
  
      console.log("Fetched posts:", datares)
      const res = datares.data.results.data
      return { posts: res, redirect: false }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
  
        if (status === 401 || status === 403) {
          // Invalid or expired token
          Cookies.remove('access_token') // Optional: clean the token
          return { posts: [], redirect: true }
        } else {
          console.error(`API Error [${status}]:`, error.response?.data || error.message)
        }
      } else {
        console.error('Unexpected error:', error)
      }
      return { posts: [], redirect: false }
    }
  }
});

function ProductList() {
  const router = useRouter();
  const { posts, redirect } = Route.useLoaderData() as { posts: ProductType[] | [], redirect: boolean };

  if (redirect) {
    router.navigate({ to: '/login' });
    return null;
  }

  return (
    <div className="h-[92vh] overflow-auto sm:h-full">
      <div className="*:px-2 sm:*:px-6">
        <h2 className="text-lg font-medium">Trending</h2>
        <main className="sm:px-6 xl:px-14 py-6 max-w-6xl remove-scrollbar mx-auto flex items-stretch overflow-x-scroll whitespace-nowrap sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-10 sm:gap-6 gap-3">
          {posts && posts.length > 0 ? (
            posts.map((post: ProductType) => (
              <ProductCard key={post.id} product={post} />
            ))
          ) : (
            <p>No products available.</p>
          )}
        </main>
        <h2 className="text-lg font-medium">Popular</h2>
        <main className="sm:px-6 xl:px-14 py-6 max-w-6xl remove-scrollbar mx-auto flex items-stretch overflow-x-scroll whitespace-nowrap sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-10 sm:gap-6 gap-3">
          {/* <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard /> */}
        </main>
      </div>
    </div>
  );
}
