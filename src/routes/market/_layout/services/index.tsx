import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import {
  ChevronsLeft,
  ChevronsRight,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
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
import { useState, useEffect, useMemo } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { makeProducts, productItem } from "@/data/demo-taka-data";
import { rankItem } from "@tanstack/match-sorter-utils";
import { Search } from "lucide-react";
import { DocumentText, Share, Heart } from "iconsax-react";

import { Label } from "@/components/ui/label";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar";

export const Route = createFileRoute("/market/_layout/services/")({
  component: ServicesList,
});

function ServicesList() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const [sortByValue, setSortByValue] = useState("Default");
  const allPagesCount = [16, 32, 48, 64];
  const allSortBy = [
    "Default",
    "Price: Low to High",
    "Price: High to Low",
    "Newest Arrivals",
    "Best Sellers",
  ];
  const links: string[] = ["market/products", "market/services", "market/taka"];
  const linkNames = ["Products", "Services", "Taka"];
  const segments = pathname.split("/"); // Splits into ['', 'market', 'products']
  const lastSegment = segments[segments.length - 1]; // Gets 'products'
  const title = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);

  // initial data - change numbers as you like
  const [data, _setData] = useState<productItem[]>(
    () => (makeProducts?.(200) as unknown as productItem[]) ?? []
  );

  const [globalFilter, setGlobalFilter] = useState<string>("");

  // pagination state
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(16);

  // compute filtered results using rankItem on a combined searchable string
  const filtered = useMemo(() => {
    const q = globalFilter?.trim();
    if (!q) return data;

    return data.filter((item) => {
      // combine the searchable fields into one string
      const combined = `${item.name} ${item.owner?.join(" ") ?? ""} ${String(
        item.price
      )} ${String(item.rating)}`;
      // rankItem returns { passed, score, ... } - we only care about passed
      const r = rankItem(combined, q);
      return r.passed;
    });
  }, [data, globalFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));

  // clamp pageIndex when filtered or pageSize changes
  useEffect(() => {
    if (pageIndex >= pageCount) setPageIndex(pageCount - 1);
  }, [pageCount, pageIndex]);

  const pageItems = useMemo(() => {
    const start = pageIndex * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, pageIndex, pageSize]);

  const showingFrom = filtered.length === 0 ? 0 : pageIndex * pageSize + 1;
  const showingTo = Math.min(filtered.length, (pageIndex + 1) * pageSize);

  return (
    <div className="flex flex-col gap-2 overflow-x-hidden">
      {/* filter bar */}
      <div className="w-full py-5 px-2 lg:px-10 bg-[var(--primary-accent)] flex items-center justify-between gap-2 h-fit">
        <div className="flex gap-3 lg:gap-5 items-center">
          {/* Navigation buttons */}
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
              onClick={() =>
                setPageIndex((p) => Math.min(pageCount - 1, p + 1))
              }
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
            Showing {showingFrom}- {showingTo} of {filtered.length} results
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
                          <DropdownMenuItem>
                            {linkNames[index]}
                          </DropdownMenuItem>
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
          <div className="hidden md:flex gap-2 text-xs items-center">
            <p className="">Page Size</p>
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
                  {allPagesCount.map((page) => (
                    <SelectItem key={page} value={page.toString()}>
                      {page}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 text-xs items-center">
            <p className="">Sort By</p>
            <Select value={sortByValue} onValueChange={setSortByValue}>
              <SelectTrigger className="px-2 py-1 gap-1 bg-white w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort Products</SelectLabel>
                  {allSortBy.map((val) => (
                    <SelectItem key={val} value={val}>
                      {val}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="p-2">
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(v) => {
            setGlobalFilter(String(v));
            setPageIndex(0); // reset to first page on new search
          }}
        />
      </div>

      {/* Items list */}
      <div className="flex flex-wrap gap-2 md:gap-4 px-2 overflow-x-hidden self-center w-full justify-center">
        {pageItems.map((item, index) => (
          <div
            key={item.id ?? index}
            className="w-45 h-68 min-w-43 overflow-hidden rounded-sm relative group/product border shadow sm:hover:scale-105 transition duration-200 ease-in-out"
          >
            <div
              className="h-45 w-auto"
              style={{
                backgroundImage: `url(${item.imgUrls[0]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className="pl-2 pt-1 flex flex-col gap-1.5">
              <span className="font-semibold sm:text-sm text-sm">
                {item.name}
              </span>
              <span className="opacity-60 text-sm sm:text-xs font-bold sm:font-light">
                {item.owner[0]}
              </span>
              {item.discount > 0 ? (
                <div className="flex items-center gap-2">
                  <span className="opacity-50 line-through text-[10px] sm:text-xs font-medium">
                    ₦{((item.price * (100 - item.discount)) / 100).toFixed(2)}
                  </span>
                  <span className="text-xs sm:text-sm font-bold sm:font-semibold">
                    ₦{item.price}
                  </span>
                </div>
              ) : (
                <span className="text-xs sm:text-sm font-semibold">
                  ₦{item.price}
                </span>
              )}
            </div>
            {item.discount > 0 && (
              <div className="absolute right-2 top-2 h-10 w-10 flex items-center justify-center bg-red-400 rounded-full text-gray-800 font-bold t">
                -{item.discount}%
              </div>
            )}
            <Link to={"/market/services/$id"} params={{ id: item.id }}>
              <Button className="sm:hidden absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold">
                See Details
              </Button>
            </Link>
            <div className="hidden bg-gray-600/90 group-hover/product:!flex flex-col items-center justify-end absolute inset-0 z-200 gap-3">
              <Button className="rounded-xs w-40 bg-white primary-text hover:!text-white hover:scale-105">
                Message
              </Button>
              <div className="flex flex-col">
                <Button className="flex items-center gap-1 !p-0 !bg-transparent !shadow-none cursor-pointer group hover:scale-105">
                  <Share className="stroke-white w-5 h-5 group-hover:!stroke-[var(--primary)]" />
                  <span className="text-white text-xs group-hover:!text-[var(--primary)]">
                    Share
                  </span>
                </Button>
                {/* <Drawer>
                      <DrawerTrigger asChild>
                        <Button className="flex items-center gap-1 !p-0 !bg-transparent !shadow-none cursor-pointer group hover:scale-105">
                          <DocumentText className="stroke-white w-5 h-5 group-hover:!stroke-[var(--primary)]" />
                          <span className="text-white text-xs group-hover:!text-[var(--primary)]">
                            Description
                          </span>
                        </Button>
                      </DrawerTrigger>
                      <DrawerDemo item={item} />
                    </Drawer> */}
                <Link to={"/market/services/$id"} params={{ id: item.id }}>
                  <Button className="flex items-center gap-1 !p-0 !bg-transparent !shadow-none cursor-pointer group hover:scale-105">
                    <DocumentText className="stroke-white w-5 h-5 group-hover:!stroke-[var(--primary)]" />
                    <span className="text-white text-xs group-hover:!text-[var(--primary)]">
                      Description
                    </span>
                  </Button>
                </Link>
                <Button className="flex items-center gap-1 !p-0 !bg-transparent !shadow-none cursor-pointer group hover:scale-105">
                  <Heart className="stroke-white w-5 h-5 group-hover:!stroke-[var(--primary)]" />
                  <span className="text-white text-xs group-hover:!text-[var(--primary)]">
                    Save
                  </span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type debouncedProps = {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & React.ComponentProps<"form">;

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: debouncedProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, onChange, debounce]); // include onChange + debounce in deps
  return (
    <form
      {...props}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            placeholder="Search by name, owner, price, rating..."
            className="p-5 pl-8 w-90"
            value={String(value)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
          />
          <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
