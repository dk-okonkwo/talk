import {
  ChevronsLeft,
  ChevronsRight,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "./ui/button";
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
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";

export default function ResultsOptions() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const [pageCount, setPageCount] = useState("16");
  const [sortByValue, setSortByValue] = useState("Default");
  const allPagesCount = ["16", "20", "24", "32", "40", "48", "56", "64"];
  const allSortBy = [
    "Default",
    "Price: Low to High",
    "Price: High to Low",
    "Newest Arrivals",
    "Best Sellers",
  ];
  const links: string[] = ["products", "services", "taka"];
  const segments = pathname.split("/"); // Splits into ['', 'market', 'products']
  const lastSegment = segments[segments.length - 1]; // Gets 'products'
  const title = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  return (
    <div className="w-full py-5 px-2 lg:px-10 bg-[var(--primary-accent)] flex items-center justify-between gap-2">
      <div className="flex gap-3 lg:gap-5 items-center">
        {/* Navigation buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-0 !p-1">
            <ChevronsLeft />
          </Button>
          <Button variant="outline" className="!p-1">
            <ChevronLeft />
          </Button>
          <Button variant="outline" className="!p-1">
            <ChevronRight className="stroke-black" />
          </Button>
          <Button variant="outline" className="gap-0 !p-1">
            <ChevronsRight />
          </Button>
        </div>
        <span className="hidden md:flex text-xs">
          Showing 1 - 16 of 32 results
        </span>
      </div>
      <div className="sm:flex items-center justify-center hidden">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <NavigationMenu viewport={false}>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-black/60 tracking-wide bg-transparent">
                      Marketplace
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="z-500">
                      <ul className="grid gap-4 w-fit">
                        {links.map((link, index) => (
                          <li key={index}>
                            <NavigationMenuLink
                              asChild
                              className="text-black/80 font-medium"
                            >
                              <Link to={`/${link}`}>{link}</Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-md md:text-xl">
                {title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex gap-3 items-center">
        <div className="hidden md:flex gap-2 text-xs items-center">
          <p className="">Page Count</p>
          <Select value={pageCount} onValueChange={setPageCount}>
            <SelectTrigger className="px-2 py-1 gap-1 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Pages</SelectLabel>
                {allPagesCount.map((page) => (
                  <SelectItem key={page} value={page}>
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
  );
}
