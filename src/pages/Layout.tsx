import { AppSidebar } from '@/components/app-sidebar'
import TalkNotification from '@/components/Notification'
import { SearchForm } from '@/components/Search'
import { Button } from '@/components/ui/button'
import { Link, Outlet } from '@tanstack/react-router'
import { MessageText } from 'iconsax-react'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import NavBar from '@/components/NavBar'
import { TeamSwitcher } from '@/components/team-switcher'
import talkLogo from '../assets/images/logo.png'

const teams = [
  {
    name: 'Talk',
    logo: talkLogo,
    plan: 'Enterprise',
  },
  {
    name: 'Account.',
    logo: talkLogo,
    plan: 'Startup',
  },
  {
    name: 'Logout',
    logo: talkLogo,
    plan: 'Free',
  },
]

export default function Page() {
  return (
    <SidebarProvider className="overflow-x-hidden">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 bg-white w-full md:pr-12">
            <SidebarTrigger className="-ml-1 hidden sm:!block" />
            <Separator
              orientation="vertical"
              className="mr-2 !h-4 hidden sm:!block"
            />
            {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
            <div className="flex items-center justify-between flex-1">
              <SearchForm />
              <div className="flex items-center ml-2 gap-1 sm:gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to='/'>
                        <Button
                          variant="outline"
                          className="rounded-full !p-2 aspect-square"
                        >
                          <MessageText className="w-4 md:w-5 xl:w-6 stroke-[var(--bg-text)]" />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Messages</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TalkNotification />
                <Separator
                  orientation="vertical"
                  className="mx-2 !h-6 sm:hidden"
                />
                <div className="sm:hidden">
                  <TeamSwitcher teams={teams} />
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-[var(--main-bg)]">
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-orange-200" />
            <div className="aspect-video rounded-xl bg-orange-200" />
            <div className="aspect-video rounded-xl bg-orange-200" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-orange-200 md:min-h-min" /> */}
          <Outlet />
          <NavBar />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
