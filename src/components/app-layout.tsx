import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";
import {
  Outlet,
  createRootRoute,
  Link,
  useRouterState,
  useRouter,
} from "@tanstack/react-router";
import redLG from "../assets/images/redlogy.png";
import {
  Buildings2,
  DocumentCloud,
  Money,
  MoneyAdd,
  People,
  WalletMoney,
  Wing,
  type Icon,
} from "iconsax-react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="h-[96vh] w-[83vw] max-w-270 flex items-center">
      <CustomSidebar />
      <div className="h-full flex-1 bg-white rounded-lg p-2">{children}</div>
    </div>
  );
}

interface navItem {
  title: string;
  url: string;
  icon: Icon;
}

const navItems: navItem[] = [
  {
    title: "Home",
    url: "/",
    icon: Wing,
  },
  {
    title: "Tenants Rent",
    url: "/tenant-rent",
    icon: MoneyAdd,
  },
  {
    title: "Leasing Fee",
    url: "/leasing",
    icon: Buildings2,
  },
  {
    title: "Retention Fee",
    url: "/retention",
    icon: People,
  },
  {
    title: "Transaction Fee",
    url: "/transaction",
    icon: WalletMoney,
  },
  {
    title: "Update Schedules",
    url: "/update",
    icon: DocumentCloud,
  },
];

function CustomSidebar() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const router = useRouter();
  function logOut() {
    router.navigate({ to: "/login" });
  }

  return (
    <div className="w-60 h-[83vh] bg-secondary rounded-bl-lg rounded-tl-lg p-2 flex flex-col justify-between py-6">
      <img src={redLG} alt="red logo" />
      <div className="flex flex-col gap-2">
        {navItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <Link
              key={i}
              to={item.url}
              className={`flex items-center p-3 py-5 gap-3 rounded-sm hover:bg-white ${pathname === item.url && "bg-white"}`}
            >
              <Icon variant="Bold" className="w-5 h-5 fill-primary" />
              <span className="text-primary font-bold text-sm">
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>
      <Button onClick={logOut} className="flex items-center py-6">
        <LogOut />
        <span className="font-bold">Logout</span>
      </Button>
    </div>
  );
}
