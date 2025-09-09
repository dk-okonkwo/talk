import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingCart } from "iconsax-react";
import { MoreHorizontal, X } from "lucide-react";
import { makeSavedData, SavedItem } from "@/data/saved-data";
import { useState } from "react";

export const Route = createFileRoute("/saved/")({
  component: SavedList,
  loader: () => makeSavedData(20),
});

function SavedList() {
  const data = Route.useLoaderData() as SavedItem[];
  const [savedData, setSavedData] = useState<SavedItem[]>(data ?? []);

  function deleteSavedItem(index: number) {
    setSavedData((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <Table className="!w-full mb-18">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">PRODUCTS</TableHead>
          <TableHead>PRICE</TableHead>
          <TableHead className="hidden sm:!table-cell">STATUS</TableHead>
          <TableHead>ACTIONS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {savedData.map((saved, idx) => (
          <TableRow key={saved.id ?? idx} className="hover:bg-white">
            <TableCell className="font-medium flex items-center gap-2">
              <img
                src={saved.imgUrl}
                alt="saved image"
                className="w-12.5 h-12.5 sm:w-18 sm:h-18 aspect-square object-cover rounded-sm"
              />
              <span className="truncate w-[50vw] sm:w-60 md:w-90 lg:w-150 lg:h-20 lg:text-wrap flex items-center">
                {saved.name}
              </span>
            </TableCell>
            <TableCell className="font-bold">₦{saved.price}</TableCell>
            <TableCell
              className={`hidden font-bold ${saved.isAvailable ? "text-green-400" : "text-red-400"} sm:table-cell`}
            >
              {saved.isAvailable ? "IN STOCK" : "OUT OF STOCK"}
            </TableCell>
            <TableCell className="items-center gap-6 hidden sm:!flex">
              <Link to={`/chat/${saved.vendorId}`}>
                <Button className="flex items-center gap-3 rounded-xs">
                  <span>Message Vendor</span>
                  <ShoppingCart className="w-5 h-5 stroke-white" />
                </Button>
              </Link>
              <Button
                onClick={() => deleteSavedItem(idx)}
                variant="outline"
                className="rounded-full aspect-square !p-2  max-h-fit max-w-fit"
              >
                <X />
              </Button>
            </TableCell>
            <TableCell className="sm:!hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className={`font-bold ${saved.isAvailable ? "text-green-400" : "text-red-400"}`}
                  >
                    {saved.isAvailable ? "IN STOCK" : "OUT OF STOCK"}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to={`/chat/${saved.vendorId}`}>Message Vendor</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => deleteSavedItem(idx)}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
