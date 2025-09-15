import type { ReactElement } from 'react'
import {
  Home,
  Shop,
  MenuBoard,
  Heart,
  UserOctagon,
  LogoutCurve,
} from 'iconsax-react'
import { Link } from '@tanstack/react-router'

const NavTitles = ['Home', 'Market', 'Billboard', 'Saved', 'Profile']
const NavIcons: ReactElement[] = [
  <Home className="stroke-[var(--inactive-grey)] w-6 sm:w-7.5 group-hover:stroke-[var(--primary)] transition-all duration-300 ease-in-out" />,
  <Shop className="stroke-[var(--inactive-grey)] w-6 sm:w-7.5 group-hover:stroke-[var(--primary)] transition-all duration-300 ease-in-out" />,
  <MenuBoard className="stroke-[var(--inactive-grey)] w-6 sm:w-7.5 group-hover:stroke-[var(--primary)] transition-all duration-300 ease-in-out" />,
  <Heart className="stroke-[var(--inactive-grey)] w-6 sm:w-7.5 group-hover:stroke-[var(--primary)] transition-all duration-300 ease-in-out" />,
  <UserOctagon className="stroke-[var(--inactive-grey)] w-6 sm:w-7.5 group-hover:stroke-[var(--primary)] transition-all duration-300 ease-in-out" />,
]

function SideBar() {
  return (
    <div className="p-2 fixed bottom-0 w-full h-15 bg-[var(--secondary-bg)] sm:!h-18 lg:top-0 z-250 lg:!w-auto lg:!min-w-20 lg:!h-full flex justify-between items-center lg:!items-start md:gap-3 lg:flex-col transition-width ease-in-out duration-400">
      <Link to="/" className="hidden md:!block md:text-4xl">
        logo
      </Link>

      <ul className="w-full flex flex-row justify-between md:!w-3/4 lg:!flex-col lg:!flex-none lg:max-h-120 lg:h-2/3">
        {NavTitles.map((title, index) => (
          <li key={index}>
            <Link
              to={`${title === 'Market' ? '/market/products' : title === 'Home' ? '/' : title.toLowerCase()}`}
              className="flex flex-col items-center group md:px-1 lg:px-2 lg:py-3 lg:!flex-row sm:gap-1 lg:gap-2 lg:hover:!w-35 lg:hover:bg-white transition-all ease-in-out duration-400 rounded-sm lg:hover:shadow-sm"
            >
              {NavIcons[index]}
              <span className="text-sm sm:text-xl md:text-xl group-hover:text-[var(--primary)] transition-all ease-in-out duration-300 lg:hidden lg:group-hover:block sm:font-bold text-[var(--inactive-grey)]">
                {title}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="hidden md:!flex items-center">
        <Link
          to="/"
          className="flex flex-col items-center group md:px-1 lg:px-2 lg:py-3 lg:!flex-row sm:gap-1 lg:gap-2 lg:hover:!w-35 lg:hover:bg-white transition-all ease-in-out duration-400 rounded-sm lg:hover:shadow-sm"
        >
          <LogoutCurve className="stroke-[var(--inactive-grey)] w-6 sm:w-7.5 group-hover:stroke-[var(--primary)] transition-all duration-300 ease-in-out" />
          <span className="text-sm sm:text-xl md:text-xl group-hover:text-[var(--primary)] transition-all ease-in-out duration-300 lg:hidden lg:group-hover:block sm:font-bold text-[var(--inactive-grey)]">
            Logout
          </span>
        </Link>
      </div>
    </div>
  )
}

export default SideBar
