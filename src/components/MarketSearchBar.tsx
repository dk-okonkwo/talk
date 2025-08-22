"use client";
import { useEffect, useState } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { SearchNormal1 } from "iconsax-react";
import { useProductsUI } from "@/components/ProductsUIContext";

export default function SearchBar({ debounce = 500 }: { debounce?: number }) {
  const { globalFilter, setGlobalFilter, setPageIndex } = useProductsUI();
  const [value, setValue] = useState(globalFilter ?? "");

  useEffect(() => setValue(globalFilter ?? ""), [globalFilter]);

  useEffect(() => {
    const t = setTimeout(() => {
      setGlobalFilter(value);
      setPageIndex(0);
    }, debounce);
    return () => clearTimeout(t);
  }, [value, debounce, setGlobalFilter, setPageIndex]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            placeholder="Search by name, owner, price, rating..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="p-5 pl-8 w-90"
          />
          <SearchNormal1 className="!w-4 !h-4 stroke-black pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 select-none opacity-50" />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
