import * as React from "react";
import { SquareTerminal } from "lucide-react";
import { MarketNav } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
// import { Calendar, Inbox, Search, Settings } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Shop, MenuBoard, Heart, UserOctagon } from "iconsax-react";
import robo from "../assets/images/robo.jpg";
import talkLogo from "../assets/images/logo.png";

// This is sample data.
const data = {
  user: {
    name: "William Smith",
    email: "williamsmith@gmail.com",
    avatar: robo,
  },
  teams: [
    {
      name: "Acme Inc",
      logo: talkLogo,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: talkLogo,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: talkLogo,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Marketplace",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Products",
          url: "#",
        },
        {
          title: "Services",
          url: "#",
        },
        {
          title: "Taka",
          url: "#",
        },
      ],
    },
  ],
};

const markNav = {
  title: "Marketplace",
  url: "#",
  icon: Shop,
  isActive: true,
  items: [
    {
      title: "Products",
      url: "/products",
    },
    {
      title: "Services",
      url: "/market/services",
    },
    {
      title: "Taka",
      url: "/taka",
    },
  ],
};

// Menu items.
// const items = [
//   {
//     title: "Home",
//     url: "#",
//     icon: Home,
//   },
//   {
//     title: "Saved",
//     url: "#",
//     icon: Inbox,
//   },
//   {
//     title: "Profile",
//     url: "#",
//     icon: Calendar,
//   },
//   {
//     title: "Search",
//     url: "#",
//     icon: Search,
//   },
//   {
//     title: "Settings",
//     url: "#",
//     icon: Settings,
//   },
// ];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const linkClass = (to: string) =>
    `${
      pathname === to
        ? "text-[var(--primary)] stroke-[var(--primary)]"
        : "stroke-[var(--inactive-grey)] group-hover/item:stroke-[var(--primary)] group-hover/item:text-[var(--primary)] transition-all duration-300 ease-in-out"
    }`;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-[var(--secondary-bg)]">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="bg-[var(--secondary-bg)]">
        <SidebarGroup className="pt-20">
          <SidebarMenu className="gap-5">
            <SidebarMenuItem className="group/item">
              <SidebarMenuButton asChild tooltip={"Home"} className="">
                <Link to="/">
                  <Home className={`${linkClass("/")}`} />
                  <span className={linkClass("/")}>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <MarketNav item={markNav} />
            <SidebarMenuItem className="group/item">
              <SidebarMenuButton asChild tooltip={"Billboard"}>
                <Link to="/billboard">
                  <MenuBoard className={linkClass("/billboard")} />
                  <span className={linkClass("/billboard")}>Billboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem className="group/item">
              <SidebarMenuButton asChild tooltip={"Saved"}>
                <Link to="/saved">
                  <Heart className={linkClass("/saved")} />
                  <span className={linkClass("/saved")}>Saved</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem className="group/item">
              <SidebarMenuButton asChild tooltip={"Profile"}>
                <Link to="/profile">
                  <UserOctagon className={linkClass("/profile")} />
                  <span className={linkClass("/profile")}>Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-[var(--secondary-bg)]">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
