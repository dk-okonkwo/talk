import { createFileRoute } from "@tanstack/react-router";
import { takaItems } from "@/data/products";
import ProductSection from "@/components/productSection";
import AddItem from "@/components/AddItem";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ReceiptAdd } from "iconsax-react";

export const Route = createFileRoute("/market/_layout/taka/")({
  component: TakaList,
});

function TakaList() {
  return (
    <div className="flex flex-col gap-4 px-2 overflow-x-hidden mb-5 mt-5">
      <ProductSection title="Trending" itemList={takaItems} />
      <ProductSection title="Deals" itemList={takaItems} />
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="bg-transparent fixed bottom-20 md:bottom-5 right-10 z-20 w-fit h-fit flex items-center justify-center">
            <AddItem />
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="p-4 !w-fit accent-bg">
          <div className="flex items-center gap-4">
            <ReceiptAdd className="stroke-muted-foreground w-5 h-5" />
            <div className="font-bold text-md text-muted-foreground">
              Add Item
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
