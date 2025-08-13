import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
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
import { useState } from "react";

export default function ResultsOptions() {
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
  return (
    <div className="w-full py-5 px-2 lg:px-10 bg-[var(--primary-accent)] flex items-center justify-between gap-2">
      <div className="hidden sm:flex gap-3 lg:gap-5 items-center">
        {/* Navigation buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-0 !p-1">
            <ArrowLeft2 className="stroke-black" />
            <ArrowLeft2 className="stroke-black" />
          </Button>
          <Button variant="outline" className="!p-1">
            <ArrowLeft2 className="stroke-black" />
          </Button>
          <Button variant="outline" className="!p-1">
            <ArrowRight2 className="stroke-black" />
          </Button>
          <Button variant="outline" className="gap-0 !p-1">
            <ArrowRight2 className="stroke-black" />
            <ArrowRight2 className="stroke-black" />
          </Button>
        </div>
        <span className="text-xs">Showing 1 - 16 of 32 results</span>
      </div>

      <div className="hidden sm:flex gap-3 items-center">
        <div className="flex gap-2 text-xs items-center">
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
