"use client";
import { ProductsUIProvider } from "@/components/ProductsUIContext";
import {
  createFileRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
// import ResultsOptions from "@/components/resultsOptions";
import FilterBar, { SortByTab } from "@/components/FilterBar";
import SearchBar from "@/components/MarketSearchBar";
// import FilterButton from "@/components/FilterButton";
import { Separator } from "@/components/ui/separator";
import { spring } from "motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

  const [state, setState] = useState(false);

  return (
    <ProductsUIProvider>
      <div className="mb-30 sm:mb-10 md:mb-5 relative example-container">
        {/* <ResultsOptions /> */}
        <div className="sticky top-0 mt-3 flex items-center z-40 justify-end pr-5">
          <div
            className={`p-1 accent-bg items-center gap-2 rounded-sm w-fit ml-auto mr-4 my-2 ${state ? "flex" : "hidden"}`}
          >
            <SearchBar />
            <Separator orientation="vertical" className="mr-2 !h-4" />
            <SortByTab />
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                className="h-12 w-12 box bg-white hover:bg-gray-200"
                data-state={state}
                onClick={() => setState(!state)}
              >
                <SlidersHorizontal className="stroke-primary" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-white shadow-sm text-primary text-sm">
              <p>
                {state
                  ? "Close Search & Filter Options"
                  : "Open Search & Filter Options"}
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
        <style>
          {`
            .box {
                transition: transform ${spring(0.5, 0.6)};
            }

            .box[data-state="true"] {
                transform: translateX(-1400%) rotate(180deg);
            }
        `}
        </style>
        <Outlet />
        <div
          className={`flex-col gap-2 overflow-x-hidden z-40 ${found ? "flex" : "hidden"}`}
        >
          <FilterBar />
        </div>
        {/* <FilterButton /> */}
      </div>
    </ProductsUIProvider>
  );
}
