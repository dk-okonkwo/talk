import { createFileRoute } from "@tanstack/react-router";
import ProductCard from "@/components/ProductCard";
import { ProductType } from "@/lib/types";
import { useGlobalContext } from "@/context/GlobalProvider";

export const Route = createFileRoute("/market/_layout/products/")({
  component: ProductList,
});

function ProductList() {
  const { posts } = useGlobalContext();

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
