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
import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Shop, MenuBoard, Heart, UserOctagon } from "iconsax-react";
import robo from "../assets/images/robo.jpg";
import talkLogo from "../assets/images/logo.png";
import { User } from "@/utils/auth";

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
  url: "/market/products",
  icon: Shop,
  isActive: true,
  items: [
    {
      title: "Products",
      url: "/market/products",
    },
    {
      title: "Services",
      url: "/market/services",
    },
    {
      title: "Taka",
      url: "/market/taka",
    },
  ],
};

type addSidebarProps = {
  user: User | null;
} & React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ user, ...props }: addSidebarProps) {
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
            {user && (
              <SidebarMenuItem className="group/item">
                <SidebarMenuButton asChild tooltip={"Saved"}>
                  <Link to="/saved">
                    <Heart className={linkClass("/saved")} />
                    <span className={linkClass("/saved")}>Saved</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
            {user && (
              <SidebarMenuItem className="group/item">
                <SidebarMenuButton asChild tooltip={"Profile"}>
                  <Link to={"/profile/$id"} params={{ id: user.id }}>
                    <UserOctagon className={linkClass(`/profile/${user.id}`)} />
                    <span className={linkClass(`/profile/${user.id}`)}>
                      Profile
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      {user && (
        <SidebarFooter className="bg-[var(--secondary-bg)]">
          <NavUser />
        </SidebarFooter>
      )}

      <SidebarRail />
    </Sidebar>
  );
}
