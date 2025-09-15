// import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardAction,
} from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react'
// import { TrendUp, TrendDown } from 'iconsax-react'
import { Badge } from '@/components/ui/badge'
import { drawerReviews } from '@/data/reviews'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'

export function ItemTabs() {
  return (
    <Tabs defaultValue="description" className="items-center w-100 lg:w-full">
      <TabsList className="grid w-95/100 sm:min-w-100 grid-cols-2 p-0 h-auto bg-[var(--secondary-bg)] rounded-xs lg:w-full">
        <TabsTrigger
          value="description"
          className="font-bold text-gray-600 text-sm md:text-md lg:text-lg data-[state=active]:text-primary data-[state=active]:border-b-primary hover:cursor-pointer rounded-xs my-1 transition-all duration-350 ease-in-out"
        >
          Description
        </TabsTrigger>
        <TabsTrigger
          value="reviews"
          className="font-bold text-gray-600 text-sm md:text-md lg:text-lg data-[state=active]:text-primary data-[state=active]:border-b-primary hover:cursor-pointer rounded-none my-1 transition-all duration-350 ease-in-out"
        >
          Reviews
        </TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="w-full">
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 w-full">
          <Card className="@container/card mb-5">
            <CardHeader>
              <CardDescription>Description</CardDescription>
            </CardHeader>
            <CardContent className="text-sm md:text-md">
              The most powerful MacBook Pro ever is here. With the blazing-fast
              M1 Pro or M1 Max chip — the first Apple silicon designed for pros
              — you get groundbreaking performance and amazing battery life. Add
              to that a stunning Liquid Retina XDR display, the best camera and
              audio ever in a Mac notebook, and all the ports you need. The
              first notebook of its kind, this MacBook Pro is a beast. M1 Pro
              takes the exceptional performance of the M1 architecture to a
              whole new level for pro users.<br></br>
              <br></br>Even the most ambitious projects are easily handled with
              up to 10 CPU cores, up to 16 GPU cores, a 16‑core Neural Engine,
              and dedicated encode and decode media engines that support H.264,
              HEVC, and ProRes codecs.
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent
        value="reviews"
        className="max-w-95/100 sm:max-w-97/100 flex items-center justify-center w-full"
      >
        <ScrollArea className="h-120 rounded-sm border *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 w-100 mb-5 lg:w-80/100">
            {drawerReviews.map((review, index) => (
              <Card key={index} className="@container/card my-5">
                <CardHeader>
                  <CardDescription>
                    <Avatar>
                      <AvatarImage src={review.reviewerImg} alt="item owner" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                  </CardDescription>
                  <CardAction>
                    <Badge variant="outline">
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-star-icon lucide-star fill-primary"
                      >
                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                      </svg>
                      {review.rating}
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardContent className="text-sm">
                  "{review.description}"
                </CardContent>
                <CardFooter className="text-sm">
                  <div className="text-muted-foreground">
                    {review.reviewerName}
                  </div>
                </CardFooter>
              </Card>
            ))}
        </ScrollArea>
      </TabsContent>
    </Tabs>
  )
}
