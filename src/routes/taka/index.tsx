import { createFileRoute } from '@tanstack/react-router'
import { takaItems } from "@/data/products";
import ProductSection from "@/components/productSection";
import AddItem from "@/components/AddItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export const Route = createFileRoute('/taka/')({
  component: TakaList,
})

function TakaList() {
   return (
     <div className=" flex flex-col gap-4 mb-20 md:mb-4">
       <ProductSection title="Trending" itemList={takaItems} />
       <ProductSection title="Deals" itemList={takaItems} />
       <HoverCard>
         <HoverCardTrigger asChild>
           <div className="bg-transparent fixed bottom-20 md:bottom-5 right-10 z-2000 w-fit h-fit flex items-center justify-center">
             <AddItem />
           </div>
         </HoverCardTrigger>
         <HoverCardContent className="w-80">
           <div className="flex justify-between gap-4">
             <Avatar>
               <AvatarImage src="https://github.com/vercel.png" />
               <AvatarFallback>VC</AvatarFallback>
             </Avatar>
             <div className="space-y-1">
               <h4 className="text-sm font-semibold">@nextjs</h4>
               <p className="text-sm">
                 The React Framework – created and maintained by @vercel.
               </p>
               <div className="text-muted-foreground text-xs">
                 Joined December 2021
               </div>
             </div>
           </div>
         </HoverCardContent>
       </HoverCard>
     </div>
   );
}
