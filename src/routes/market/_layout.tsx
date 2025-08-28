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
import * as motion from "motion/react-client";
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

  const [openFilter, setOpenFilter] = useState(false);
  const [xVal, setXVal] = useState(30);
  const [ops, setOps] = useState(0);
  const [scl, setScl] = useState(0);

  function toggleFilter() {
    if (openFilter) {
      setXVal(30);
      setOps(0);
      setScl(0);
      setOpenFilter(false);
    } else {
      setXVal(0);
      setOps(1);
      setScl(1);
      setOpenFilter(true);
    }
  }

  return (
    <ProductsUIProvider>
      <div className="mb-30 sm:mb-10 md:mb-5 relative example-container">
        {/* <ResultsOptions /> */}
        <div className="sticky top-0 mt-2 md:mt-3 flex items-center z-40 pl-1 sm:pl-3 md:pr-5 gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                animate={{ x: xVal }}
                transition={{ type: "spring", duration: 0.4 }}
              >
                <Button
                  type="button"
                  className="h-12 w-12 bg-white hover:bg-gray-100"
                  data-state={openFilter}
                  onClick={() => toggleFilter()}
                >
                  <SlidersHorizontal className="stroke-primary" />
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent className="bg-white shadow-sm text-primary text-sm">
              <p>
                {openFilter
                  ? "Close Search & Filter Options"
                  : "Open Search & Filter Options"}
              </p>
            </TooltipContent>
          </Tooltip>
          <motion.div
            animate={{ opacity: ops, scale: scl }}
            transition={{
              duration: 0.4,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
          >
            <div
              className={`p-0 py-0.5 sm:p-1 accent-bg items-center gap-0 sm:gap-2 rounded-sm w-fit mr-0 sm:mr-4 my-2 flex`}
            >
              <SearchBar />
              <Separator orientation="vertical" className="mr-2 !h-4" />
              <SortByTab />
            </div>
          </motion.div>
        </div>
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
