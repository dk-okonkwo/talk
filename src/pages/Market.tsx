import {
  Breadcrumb,
  BreadcrumbItem,
  // BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
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
} from '@/components/ui/navigation-menu'
import { Link, Outlet, useRouterState } from '@tanstack/react-router'

function Market() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  const segments = pathname.split('/') // Splits into ['', 'market', 'products']
  const lastSegment = segments[segments.length - 1] // Gets 'products'
  const title = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)

  return (
    <div>
      <div className="p-2 flex items-center justify-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <NavigationMenu viewport={false}>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-md md:text-xl bg-transparent">
                      Marketplace
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-4 w-fit">
                        <li>
                          <NavigationMenuLink
                            asChild
                            className="text-md md:text-xl"
                          >
                            <Link to="/market/products">Products</Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink
                            asChild
                            className="text-md md:text-xl"
                          >
                            <Link to="/market/services">Services</Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink
                            asChild
                            className="text-md md:text-xl"
                          >
                            <Link to="/market/taka">Taka</Link>
                          </NavigationMenuLink>
                        </li>
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
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Market
