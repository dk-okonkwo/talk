'use client'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { MoreVertical } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import postImg from '@/assets/images/postImg.png'
import { Like1, HeartAdd, Share, Message2 } from 'iconsax-react'

export default function CarouselDemo({ start }: { start: number }) {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    initial: start,
  })

  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)

  return (
    <Carousel className="w-90 h-102 sm:w-130 sm:h-115">
      <CarouselContent ref={sliderRef}>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="flex items-center justify-center"
          >
            <Card className="w-90 h-102 sm:w-130 sm:h-115">
              <CardHeader className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex flex-col gap-1">
                  <CardTitle className="text-sm">William Smith</CardTitle>
                  <CardDescription className="flex items-center justify-between text-xs">
                    <span>16h</span>
                    <span>23.15k views</span>
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreVertical className="!w-7 !h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Copy payment ID</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View customer</DropdownMenuItem>
                    <DropdownMenuItem>View payment details</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <span className="text-sm text-left">
                  This 3 shows are special😄Part (1/7) #TheOwlHouse #DemonSlayer
                  #AvatarTheLastAirbender
                </span>
                <AspectRatio ratio={16 / 8} className="bg-muted">
                  <img
                    src={postImg}
                    alt="post image"
                    className="w-full h-full rounded-xl"
                  />
                </AspectRatio>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Like1
                            variant="Bold"
                            onClick={() => setLiked(!liked)}
                            className={`hover:cursor-pointer hover:fill-[var(--hova)] w-5 ${liked ? 'fill-[var(--primary)]' : 'fill-[var(--inactive-grey)]'} transition-all duration-300 ease-in-out`}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{liked ? 'Unlike' : 'like'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <span
                      className={`font-bold text-sm ${liked ? 'text-[var(--primary)]' : 'text-[var(--inactive-grey)]'}`}
                    >
                      {123 + index + 1}
                    </span>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Share
                          variant="Bold"
                          className={`hover:cursor-pointer fill-[var(--inactive-grey)] hover:fill-[var(--hova)] w-5 transition-all duration-300 ease-in-out`}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Share</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <div className="flex items-center gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Message2
                            variant="Bold"
                            className={`hover:cursor-pointer fill-[var(--inactive-grey)] hover:fill-[var(--hova)] w-5 transition-all duration-300 ease-in-out`}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Comment</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <span
                      className={`font-bold text-sm text-[var(--inactive-grey)]`}
                    >
                      25
                    </span>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HeartAdd
                          variant="Bold"
                          onClick={() => setSaved(!saved)}
                          className={`hover:cursor-pointer hover:fill-[var(--hova)] w-5 ${saved ? 'fill-[var(--primary)]' : 'fill-[var(--inactive-grey)]'} transition-all duration-300 ease-in-out ml-auto`}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{liked ? 'Unlike' : 'like'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Button
                  variant="outline"
                  className="text-blue-600 text-sm p-2 border-0 w-fit"
                >
                  View 25 comments
                </Button>
              </CardContent>

              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
