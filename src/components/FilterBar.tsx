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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProductsUI } from "@/components/ProductsUIContext";
import { Link, useRouterState } from "@tanstack/react-router";

export default function FilterBar({
  pageOptions = [16, 32, 48, 64],
  sortOptions = [
    "Default",
    "Price: Low to High",
    "Price: High to Low",
    "Newest Arrivals",
    "Best Sellers",
  ],
}: {
  pageOptions?: number[];
  sortOptions?: string[];
}) {
  const {
    items,
    pageIndex,
    setPageIndex,
    pageSize,
    setPageSize,
    sortBy,
    setSortBy,
  } = useProductsUI();

  // derived values for display (you can also move the derivation to the list page)
  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const showingFrom = total === 0 ? 0 : pageIndex * pageSize + 1;
  const showingTo = Math.min(total, (pageIndex + 1) * pageSize);

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const links: string[] = ["market/products", "market/services", "market/taka"];
  const linkNames = ["Products", "Services", "Taka"];
  const segments = pathname.split("/"); // Splits into ['', 'market', 'products']
  const lastSegment = segments[segments.length - 1]; // Gets 'products'
  const title = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);

  return (
    <div className="w-full py-5 px-2 lg:px-10 bg-[var(--primary-accent)] flex items-center justify-between gap-2 h-fit">
      <div className="flex gap-3 lg:gap-5 items-center">
        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            className="!p-1"
            onClick={() => setPageIndex(0)}
            disabled={pageIndex === 0}
          >
            <ChevronsLeft />
          </Button>
          <Button
            type="button"
            variant="outline"
            className="!p-1"
            onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
            disabled={pageIndex === 0}
          >
            <ChevronLeft />
          </Button>
          <Button
            type="button"
            variant="outline"
            className="!p-1"
            onClick={() => setPageIndex((p) => Math.min(pageCount - 1, p + 1))}
            disabled={pageIndex >= pageCount - 1}
          >
            <ChevronRight />
          </Button>
          <Button
            type="button"
            variant="outline"
            className="!p-1"
            onClick={() => setPageIndex(pageCount - 1)}
            disabled={pageIndex >= pageCount - 1}
          >
            <ChevronsRight />
          </Button>
        </div>
        <span className="hidden md:flex text-xs">
          Showing {showingFrom}-{showingTo} of {total} results
        </span>
      </div>

      <div className="sm:flex items-center justify-center hidden">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-transparent border-none"
                  >
                    Marketplace
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuLabel className="font-semibold">
                    GO TO
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {links.map((link, index) => (
                      <Link key={index} to={`/${link}`}>
                        <DropdownMenuItem>{linkNames[index]}</DropdownMenuItem>
                      </Link>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="tracking-wide bg-transparent">
                {title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex gap-3 items-center">
        <div className="hidden md:flex gap-2 items-center text-xs">
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

        <div className="flex gap-2 items-center text-xs">
          <p>Sort By</p>
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
      </div>
    </div>
  );
}
