"use client";
import { Button } from "@/components/ui/button";
import {
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { useProductsUI } from "@/components/ProductsUIContext";

export default function FilterBar({
  pageOptions = [16, 32, 48, 64],
}: {
  pageOptions?: number[];
}) {
  const { items, pageIndex, setPageIndex, pageSize, setPageSize } =
    useProductsUI();

  // derived values for display (you can also move the derivation to the list page)
  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const showingFrom = total === 0 ? 0 : pageIndex * pageSize + 1;
  const showingTo = Math.min(total, (pageIndex + 1) * pageSize);

  return (
    <div className="w-full py-5 px-2 lg:px-10 bg-[var(--primary-accent)] flex items-center justify-center md:justify-between gap-2 h-fit md:!pr-30">
      <span className="hidden md:flex text-sm font-medium">
        Showing {showingFrom}-{showingTo} of {total} results
      </span>
      <div className="flex gap-3 lg:gap-5 items-center">
        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            className="!px-2 gap-1"
            onClick={() => setPageIndex(0)}
            disabled={pageIndex === 0}
          >
            <ChevronsLeft className="mt-1" />
            <span>First</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            className="!px-2 gap-1"
            onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
            disabled={pageIndex === 0}
          >
            <ChevronLeft className="mt-1" />
            <span>Prev</span>
          </Button>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <Button
            type="button"
            variant="outline"
            className="!px-2 gap-1"
            onClick={() => setPageIndex((p) => Math.min(pageCount - 1, p + 1))}
            disabled={pageIndex >= pageCount - 1}
          >
            <span>Next</span>
            <ChevronRight className="mt-1" />
          </Button>
          <Button
            type="button"
            variant="outline"
            className="!px-2 gap-1"
            onClick={() => setPageIndex(pageCount - 1)}
            disabled={pageIndex >= pageCount - 1}
          >
            <span>Last</span>
            <ChevronsRight className="mt-1" />
          </Button>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <div className="hidden md:flex gap-2 items-center text-sm">
          <p>Page Size</p>
          <Select
            value={pageSize.toString()}
            onValueChange={(v) => {
              setPageSize(Number(v));
              setPageIndex(0);
            }}
          >
            <SelectTrigger className="px-2 py-1 gap-1 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Pages</SelectLabel>
                {pageOptions.map((p) => (
                  <SelectItem key={p} value={p.toString()}>
                    {p}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

export function SortByTab({
  sortOptions = [
    "Default",
    "Price: Low to High",
    "Price: High to Low",
    "Newest Arrivals",
    "Best Sellers",
  ],
}: {
  sortOptions?: string[];
}) {
  const { sortBy, setSortBy } = useProductsUI();
  return (
    <div className="flex gap-2 items-center text-sm">
      <p className="hidden sm:flex">Sort By</p>
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="px-2 py-1 gap-1 bg-white w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort</SelectLabel>
            {sortOptions.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
