import { Home, Shop, MenuBoard, Heart, UserOctagon } from "iconsax-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { type Icon } from "iconsax-react";
import { useAuth } from "@/utils/auth";

const NavTitles = ["Home", "Market", "Billboard", ];
const authRoutes = ["Saved", "Profile"];
const NavIcons: Icon[] = [Home, Shop, MenuBoard, Heart, UserOctagon];

export default function NavBar() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const { user } = useAuth();

  const navRoutes = user ? [...NavTitles, ...authRoutes] : NavTitles;


  const linkClass = (to: string) =>
    `${
      pathname === to
        ? "text-[var(--primary)] text-sm stroke-[var(--primary)]"
        : "stroke-[var(--inactive-grey)] group-hover/item:stroke-[var(--primary)] group-hover/item:text-[var(--primary)] transition-all duration-300 ease-in-out text-sm"
    }`;
  return (
    <div className="p-2 fixed bottom-0 left-0 right-0 w-[100vw] h-15 bg-[var(--secondary-bg)] z-250 sm:hidden flex justify-between items-center transition-width ease-in-out duration-400">
      <ul className="w-full flex justify-between">
        {navRoutes.map((title, index) => {
          const path =
            title === "Home"
              ? "/"
              : title == "Market"
                ? "/market/products"
                : `/${title.toLowerCase()}`;
          const Icon = NavIcons[index];
          return (
            <li key={title}>
              <Link
                to={path == "/profile" && user ? `/profile/${user!.id}` : path}
                className="flex flex-col items-center transition-all ease-in-out duration-400 group/item hover:bg-white p-2"
              >
                <Icon className={`${linkClass(path)} w-6`} />
                <span className={linkClass(path)}>{title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
