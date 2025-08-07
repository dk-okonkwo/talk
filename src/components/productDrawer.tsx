'use client'

import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { Button } from '@/components/ui/button'
import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { takaItem } from '@/data/products'
import { useState } from 'react'
import StarReview from './StarReview'
import { Copy, Facebook, Instagram } from 'iconsax-react'
import { ItemTabs } from './itemTab'
import { Link } from '@tanstack/react-router'

export function DrawerDemo({ item }: { item: takaItem }) {

  const [current, setCurrent] = useState(0)

  const [vendorMessage, setVendorMessage] = useState(
    `Hi ${item.owner[0]}, is this available?`,
  )

  return (
    <DrawerContent className="!min-h-[87vh] xl:!max-h-120 z-500">
      <div className="mx-auto w-full max-w-sm overflow-y-scroll overflow-x-hidden sm:max-w-lg lg:max-w-full lg:flex lg:justify-between">
        {/* left column */}
        <div className="flex flex-col lg:w-50/100 lg:mb-8 h-full">
          <DrawerHeader>
            <DrawerTitle>{item.name}</DrawerTitle>
            <DrawerDescription>
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
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex flex-col gap-4 p-3 pb-0 items-center w-full">
            <div className="w-90/100 aspect-square bg-gray-100 rounded-xs border border-gray-300 flex items-center justify-center xl:w-60/100">
              <div
                className="w-90/100 aspect-square"
                style={{
                  backgroundImage: `url(${item.imgUrls[current]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
            </div>

            <Carousel
              opts={{
                align: 'start',
              }}
              className="w-95/100 max-w-95/100 relative bg-gray-100 border border-gray-300"
            >
              <CarouselContent className="">
                {item.imgUrls.map((_, index) => (
                  <CarouselItem key={index} className="basis-7/24 lg:basis-1/4">
                    <div className="p-1">
                      <Button
                        className={`w-80/100 !aspect-square h-full rounded-xs ${current == index && 'border-3 border-[var(--primary)]'} !p-0 overflow-hidden`}
                        onClick={() => setCurrent(index)}
                      >
                        <div
                          className="w-full aspect-square"
                          style={{
                            backgroundImage: `url(${item.imgUrls[index]})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
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
                  <Button variant="outline" className="border-none shadow-none">
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
          <div className="flex w-full items-center gap-3 md:max-w-md lg:max-w-full">
            <Input
              type="text"
              placeholder="Is this available?"
              value={vendorMessage}
              onChange={(e) => setVendorMessage(e.target.value)}
              className="rounded-xs text-xs"
            />
            <Button type="submit" className="rounded-xs hover:cursor-pointer">
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
              className="ml-auto rounded-xs text-primary border-primary hover:bg-primary hover:text-white hover:cursor-pointer"
            >
              Save
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
      </div>
    </DrawerContent>
  )
}
