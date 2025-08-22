"use client";
import { ProductsUIProvider } from "@/components/ProductsUIContext";
import {
  createFileRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
// import ResultsOptions from "@/components/resultsOptions";
import FilterBar from "@/components/FilterBar";
import SearchBar from "@/components/MarketSearchBar";

export const Route = createFileRoute("/market/_layout")({
  component: MarketLayout,
});

function MarketLayout() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  console.log(pathname);

  const noPadding = ["/market/products", "/market/taka", "/market/services"];
  let found = noPadding.some((item) => pathname === item);

  return (
    <ProductsUIProvider>
      <div className="">
        {/* <ResultsOptions /> */}
        <div
          className={`flex-col gap-2 overflow-x-hidden sticky top-0 z-40 ${found ? "flex" : "hidden"}`}
        >
          <FilterBar />
          <SearchBar />
        </div>

        <Outlet />
      </div>
    </ProductsUIProvider>
  );
}
