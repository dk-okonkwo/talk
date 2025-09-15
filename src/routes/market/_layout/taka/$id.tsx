"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { takaItems, type takaItem } from "@/data/products";
import { useState } from "react";
import StarReview from "@/components/StarReview";
import { Copy, Facebook, Instagram, ArrowLeft } from "iconsax-react";
import { ItemTabs } from "@/components/itemTab";
import { Link, useRouter } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/market/_layout/taka/$id")({
  component: TakaProduct,
  loader: ({ params }) => getTakaProduct(params.id),
});

function TakaProduct() {
  const [current, setCurrent] = useState(0);
  const item: takaItem = Route.useLoaderData();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);

  const [vendorMessage, setVendorMessage] = useState(
    `Hi ${item.owner[0]}, is this available?`
  );

  //   const { id } = Route.useParams();
  return (
    <Card className="!min-h-[87vh] w-full shadow-none border-0 rounded-none bg-transparent mx-auto overflow-y-scroll overflow-x-hidden lg:flex lg:justify-between pt-14 sm:pt-0 relative md:flex-row">
      <Button
        variant="outline"
        className="absolute top-2 rounded-full !w-11 !h-11 sm:hidden"
        onClick={() => router.history.back()}
      >
        <ArrowLeft className="stroke-black !w-6 !h-6" />
      </Button>

      {/* left column */}
      <div className="flex flex-col lg:w-50/100 lg:mb-8 h-full">
        <CardHeader>
          <CardTitle>{item.name}</CardTitle>
          <CardDescription>
            {item.discount > 0 ? (
              <div className="flex items-center gap-2">
                <span className="font-bold">
                  ₦{(item.price * (100 - item.discount)) / 100}
                </span>
                <s className="text-gray-500">₦{item.price}</s>
              </div>
            ) : (
              <span className="font-bold">₦{item.price}</span>
            )}
          </CardDescription>
        </CardHeader>

        <div className="flex flex-col gap-4 p-3 pb-0 items-center w-full">
          <div className="w-90/100 aspect-square bg-gray-100 rounded-xs border border-gray-300 flex items-center justify-center xl:w-60/100">
            <div
              className="w-90/100 aspect-square"
              style={{
                backgroundImage: `url(${item.imgUrls[current]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>

          <Carousel
            opts={{
              align: "start",
            }}
            className="w-95/100 max-w-95/100 relative bg-gray-100 border border-gray-300"
          >
            <CarouselContent className="">
              {item.imgUrls.map((_, index) => (
                <CarouselItem key={index} className="basis-7/24 lg:basis-1/4">
                  <div className="p-1">
                    <Button
                      className={`w-80/100 !aspect-square h-full rounded-xs ${current == index && `border-3 border-[var(--primary)]`} !p-0 overflow-hidden`}
                      onClick={() => setCurrent(index)}
                    >
                      <div
                        className="w-full aspect-square"
                        style={{
                          backgroundImage: `url(${item.imgUrls[index]})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      ></div>
                    </Button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-20px] primary-bg stroke-white" />
            <CarouselNext className="absolute right-[-20px] primary-bg stroke-white" />
          </Carousel>
        </div>
      </div>

      {/* Right Column */}
      <div className="p-3 pb-0 flex flex-col items-center gap-4 lg:w-45/100">
        <div className="flex flex-col gap-3 w-full pl-2">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-none bg-transparent"
                >
                  <Avatar>
                    <AvatarImage src={item.owner[1]} alt="item owner" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <span className="hover:underline">{item.owner[0]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 z-3000" align="start">
                <DropdownMenuLabel className="font-bold">
                  Go To
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link to="/profile">
                    <DropdownMenuItem>Vendor's Profile</DropdownMenuItem>
                  </Link>
                  <Link to="/workshop">
                    <DropdownMenuItem>Vendor's Workshop</DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <StarReview review={item.rating} />
        </div>
        {/* Message Vendor */}
        <div className="flex flex-col sm:flex-row w-full sm:items-center gap-3 md:max-w-md lg:max-w-full">
          <Input
            type="text"
            placeholder="Is this available?"
            value={vendorMessage}
            onChange={(e) => setVendorMessage(e.target.value)}
            className="rounded-xs text-xs hidden sm:flex"
          />
          <Textarea
            placeholder="Type something."
            value={vendorMessage}
            onChange={(e) => setVendorMessage(e.target.value)}
            className="flex sm:hidden"
          />
          <Button
            type="submit"
            className="rounded-sm hover:cursor-pointer self-end sm:self-auto"
          >
            Message Vendor
          </Button>
        </div>

        {/*Share and Save Options */}
        <div className="flex items-center w-full gap-3">
          <span className="text-xs">Share product:</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Copy
                variant="Bold"
                className="w-5 h-5 stroke-primary transition-all duration-300 ease-in-out hover:cursor-pointer hover:fill-primary"
              />
            </TooltipTrigger>
            <TooltipContent className="z-1000 p-2">
              <p>Copy link</p>
            </TooltipContent>
          </Tooltip>

          <Facebook
            variant="Bold"
            className="w-5 h-5 stroke-primary transition-all duration-300 ease-in-out hover:cursor-pointer hover:fill-primary"
          />
          <Instagram
            variant="Bold"
            className="w-5 h-5 stroke-primary transition-all duration-300 ease-in-out hover:cursor-pointer hover:fill-primary"
          />
          <Button
            variant="outline"
            className={`ml-auto rounded-sm  hover:cursor-pointer ${isSaved ? "text-white hover:text-primary bg-primary border-none hover:bg-white" : "text-primary border-primary hover:bg-primary hover:text-white"}`}
            onClick={() => setIsSaved(!isSaved)}
          >
            {isSaved ? "Unsave" : "Save"}
          </Button>
        </div>

        <ItemTabs />

        {/* <div className="mt-3 h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <Bar
                    dataKey="goal"
                    style={
                      {
                        fill: 'hsl(var(--foreground))',
                        opacity: 0.9,
                      } as React.CSSProperties
                    }
                  />
                </BarChart>
              </ResponsiveContainer>
            </div> */}
      </div>
    </Card>
  );
}

function getTakaProduct(id: string): takaItem | undefined {
  const numericId = parseInt(id, 10);
  return takaItems.find((item) => item.id === numericId);
}
