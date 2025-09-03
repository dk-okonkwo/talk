import type { takaItem } from "@/data/products";
import { Button } from "@/components/ui/button";
import { DocumentText, Heart, Share } from "iconsax-react";
// import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
// import { DrawerDemo } from "@/components/productDrawer";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Link } from "@tanstack/react-router";

interface productSectionProps {
  title: string;
  itemList: takaItem[];
}

function ProductSection({ title, itemList }: productSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-extrabold text-2xl">{title}</span>
      <ScrollArea className="w-full rounded-md border whitespace-nowrap">
        <div className="flex w-max space-x-4 p-1 pb-3">
          {itemList.map((item, index) => (
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
              <Link to={"/market/taka/$id"} params={{ id: item.id }}>
                <Button className="sm:hidden absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold">
                  See Details
                </Button>
              </Link>
              <div className="hidden bg-gray-600/90 group-hover/product:!flex flex-col items-center justify-end absolute inset-0 z-200 gap-3">
                <Link to={`/chat/${item.id}`}>
                  <Button className="rounded-xs w-40 bg-white primary-text hover:!text-white hover:scale-105">
                    Message
                  </Button>
                </Link>

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
                  <Link to={"/market/taka/$id"} params={{ id: item.id }}>
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
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

export default ProductSection;
