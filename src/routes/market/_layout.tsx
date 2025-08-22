"use client";
import { ProductsUIProvider } from "@/components/ProductsUIContext";
import { createFileRoute, Outlet } from "@tanstack/react-router";
// import ResultsOptions from "@/components/resultsOptions";
import FilterBar from "@/components/FilterBar";
import SearchBar from "@/components/MarketSearchBar";

export const Route = createFileRoute("/market/_layout")({
  component: MarketLayout,
});

function MarketLayout() {
  return (
    <ProductsUIProvider>
      <div className="">
        {/* <ResultsOptions /> */}
        <div className="flex flex-col gap-2 overflow-x-hidden sticky top-0 z-40">
          <FilterBar />
          <SearchBar />
        </div>

        <Outlet />
      </div>
    </ProductsUIProvider>
  );
}
