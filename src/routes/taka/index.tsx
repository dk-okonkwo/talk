import { createFileRoute } from "@tanstack/react-router";
import { takaItems } from "@/data/products";
import ProductSection from "@/components/productSection";
import AddItem from "@/components/AddItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  // BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";

export const Route = createFileRoute("/taka/")({
  component: TakaList,
});

function TakaList() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const segments = pathname.split("/"); // Splits into ['', 'market', 'products']
  const lastSegment = segments[segments.length - 1]; // Gets 'products'
  const title = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);

  const links: string[] = ["products", "services", "taka"];

  return (
    <div className=" flex flex-col gap-4 mb-20 md:mb-4">
      <div className="p-2 flex items-center justify-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <NavigationMenu viewport={false}>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-black/60 tracking-wide bg-transparent">
                      Marketplace
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="z-500">
                      <ul className="grid gap-4 w-fit">
                        {links.map((link, index) => (
                          <li key={index}>
                            <NavigationMenuLink
                              asChild
                              className="text-black/80 font-medium"
                            >
                              <Link to={`/${link}`}>{link}</Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-md md:text-xl">
                {title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
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
