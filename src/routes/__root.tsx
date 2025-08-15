import {
  Outlet,
  createRootRoute,
  Link,
  useRouterState,
} from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import TalkNotification from "@/components/Notification";
import { SearchForm } from "@/components/Search";
import { Button } from "@/components/ui/button";
import { MessageText } from "iconsax-react";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import NavBar from "@/components/NavBar";
import { TeamSwitcher } from "@/components/team-switcher";
import talkLogo from "../assets/images/logo.png";

export const Route = createRootRoute({
  component: RootComponent,
});

const teams = [
  {
    name: "Talk",
    logo: talkLogo,
    plan: "Enterprise",
  },
  {
    name: "Account.",
    logo: talkLogo,
    plan: "Startup",
  },
  {
    name: "Logout",
    logo: talkLogo,
    plan: "Free",
  },
];

function RootComponent() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  console.log(pathname);

  const noPadding = [
    "/messages",
    "/market/products",
    "/market/taka",
    "/market/services",
  ];
  let found = noPadding.some((item) => pathname === item);

  return pathname === "/login" || pathname === "/signup" ? (
    <Outlet />
  ) : (
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
            <div className="flex items-center justify-between flex-1">
              <SearchForm />
              <div className="flex items-center ml-2 gap-1 sm:gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to="/chat">
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
        <div
          className={`flex flex-1 flex-col gap-4 ${found ? "max-h-[calc(100svh-4rem)] p-0" : "p-4 pt-0"}  bg-[var(--main-bg)]`}
        >
          <Outlet />
          <NavBar />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
