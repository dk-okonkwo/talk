import {
  Outlet,
  createRootRoute,
  Link,
  useRouterState,
} from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
// import TalkNotification from "@/components/Notification";
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
import { AuthProvider, useAuth } from "@/utils/auth";
import { Skeleton } from "@/components/ui/skeleton";
import MarketNavigation from "@/components/MarketNavigation";
import { Toaster } from "sonner";
import TalkNotifications from "@/components/TalkNotifications";
// import { GlobalProvider } from "@/context/GlobalProvider";

export const Route = createRootRoute({
  component: () => (
    <AuthProvider>
      <RootComponent />
    </AuthProvider>
  ),
});

export const teams = [
  {
    name: "Talk",
    logo: talkLogo,
    plan: "Free",
  },
  {
    name: "Account.",
    logo: talkLogo,
    plan: "Vendor",
  },
  {
    name: "Logout",
    logo: talkLogo,
    plan: "Super",
  },
];

function RootComponent() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const noPadding = [
    "/chat",
    "/workshop",
    "/market/products",
    "/market/taka",
    "/market/services",
  ];
  const inChat = pathname.includes("/chat");
  let found = noPadding.some((item) => pathname === item) || inChat;

  const { user, loading, isAuthenticated } = useAuth();

  if (loading)
    return (
      <div className="flex items-center flex-col gap-2 !p-2 w-screen h-screen overflow-hidden md:flex-row md:overflow-y-auto">
        {/* Sidebar skeleton */}
        <Skeleton className="md:h-full md:w-[20vw] bg-[var(--skeleton-gray)] rounded-xl h-30 w-full hidden md:flex"></Skeleton>

        <div className="flex flex-col md:flex-1 gap-2 h-full w-full overflow-hidden">
          {/* top */}
          <div className="h-1/6 w-full flex items-center gap-2">
            <div className="flex flex-col h-fit w-full gap-1">
              <Skeleton className="bg-[var(--skeleton-gray)] rounded-xl h-4"></Skeleton>
              <Skeleton className="bg-[var(--skeleton-gray)] rounded-xl h-4"></Skeleton>
              <Skeleton className="bg-[var(--skeleton-gray)] rounded-xl h-4"></Skeleton>
            </div>
            <Skeleton className="bg-[var(--skeleton-gray)] rounded-xl w-45 h-15"></Skeleton>
            <Skeleton className="bg-[var(--skeleton-gray)] h-1/1 aspect-square rounded-full"></Skeleton>
          </div>
          {/*Bottom items */}
          <div className="flex flex-col justify-between w-full md:h-5/6 h-full">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </div>
        </div>
      </div>
    );

  return pathname === "/login" || pathname === "/signup" ? (
    <Outlet />
  ) : (
    <SidebarProvider className="overflow-x-hidden">
      <AppSidebar user={user} />
      <SidebarInset
        className={`h-screen overflow-hidden ${inChat && "h-fit sm:h-screen"}`}
      >
        <header
          className={`sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 ${inChat && "hidden md:flex"}`}
        >
          <div className="flex items-center gap-2 px-4 w-full md:pr-12">
            <SidebarTrigger className="-ml-1 hidden sm:!block" />
            <Separator
              orientation="vertical"
              className="mr-2 !h-4 hidden sm:!block"
            />
            <div className={`flex items-center flex-1`}>
              <SearchForm
                className={`${isAuthenticated ? "flex-1" : "flex-1 sm:flex-none"}`}
              />

              <MarketNavigation />

              <div className="flex items-center ml-auto gap-1 sm:gap-4">
                {isAuthenticated && user ? (
                  <div className="flex gap-2 sm:gap-7 items-start !h-15 ml-2 mr-2">
                    <TalkNotifications />
                    {/* <TalkNotification /> */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link to="/chat/1">
                            <Button
                              variant="outline"
                              className="rounded-full w-10 !p-0 min-h-10 aspect-square mt-2.5 sm:mt-2"
                            >
                              <MessageText className="w-5 md:w-5 xl:w-6 stroke-[var(--bg-text)]" />
                            </Button>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Messages</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ) : (
                  <Link to="/login">
                    <Button className="font-semibold ml-2 sm:ml-0">
                      Login
                    </Button>
                  </Link>
                )}
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
          className={`flex flex-1 flex-col gap-4 ${found ? " p-0" : "p-4 pt-0"}  bg-[var(--main-bg)] ${inChat ? "h-fit max-h-fit !pb-0 overflow-y-hidden sm:h-full sm:max-h-full" : "overflow-y-scroll"}`}
        >
          <Outlet />
          <NavBar />
        </div>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}

function SkeletonRow() {
  return (
    <div className="w-full h-32/100 justify-between flex">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col h-full w-1/5 justify-between">
          <Skeleton className="bg-[var(--skeleton-gray)] w-full h-4/7 rounded-sm "></Skeleton>

          <div className="flex items-center h-1/6 gap-2 w-full">
            <Skeleton className="h-full aspect-square rounded-full bg-[var(--skeleton-gray)]"></Skeleton>
            <Skeleton className="bg-[var(--skeleton-gray)] h-6/7 rounded-sm w-full"></Skeleton>
          </div>
          <Skeleton className="bg-[var(--skeleton-gray)] rounded-sm h-1/12"></Skeleton>
          <Skeleton className="bg-[var(--skeleton-gray)] rounded-sm h-1/12"></Skeleton>
        </div>
      ))}
    </div>
  );
}
