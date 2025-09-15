import { useState } from 'react'
// import HeaderDropdown from './HeaderDropdown'
import { MessageText, Notification } from 'iconsax-react'
import { SearchForm } from './Search'
import { AvatarDropdown } from './AvatarDropdown'

function TopHeader() {
  const [openDropdown, setOpenDropdown] = useState(false)
  const notifications = 11
  return (
    <div className="p-2 fixed top-0 w-full h-30 bg-white sm:!h-18 lg:!h-20  lg:pl-22 flex flex-col items-center justify-between sm:!flex-row z-50">
      <div className="flex items-center justify-between w-full sm:gap-[2vw] sm:!w-fit sm:order-2">
        <AvatarDropdown />
        <div className="flex items-center gap-3 sm:order-1">
          <a
            href=""
            className="flex items-center justify-center h-10 bg-[var(--primary-accent)] w-fit rounded-full hover:shadow-xl aspect-square sm:h-10 transition-all duration-300 ease-in-out hover:inset-shadow-sm"
          >
            <MessageText className="w-4 md:w-5 xl:w-6 stroke-[var(--bg-text)]" />
          </a>
          <div
            className="relative"
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            <div className="flex items-center justify-center h-10 bg-[var(--primary-accent)] w-fit rounded-full hover:shadow-xl hover:inset-shadow-sm aspect-square sm:h-10 transition-all duration-300 ease-in-out relative">
              <Notification className="w-4 md:w-5 xl:w-6 stroke-[var(--bg-text)]" />
              {notifications > 0 && (
                <div className="absolute right-0 bottom-[-5px] rounded-full bg-[var(--primary)] aspect-square h-5 flex items-center justify-center">
                  <span className="text-[9px] font-bold p-0 m-0 text-white">
                    {notifications < 9 ? notifications : '9+'}
                  </span>
                </div>
              )}
            </div>
            <div
              className={`absolute w-auto mt-3 sm:mt-3 py-2 shadow-md z-50 rounded-md bg-[var(--secondary-bg)]  transition-all duration-200 ease-in opacity-0 pointer-events-none ${openDropdown && 'opacity-100 pointer-events-auto'}`}
            >
              <ul className="w-full gap-3 flex flex-col">
                <li className="w-full hover:bg-[var(--primary-accent)] py-1 px-2">
                  <a href="" className="w-full flex">
                    Profile
                  </a>
                </li>
                <li className="w-full hover:bg-[var(--primary-accent)] py-1 px-2">
                  <a href="" className="w-full flex">
                    Settings
                  </a>
                </li>
                <li className="w-full hover:bg-[var(--primary-accent)] py-1 px-2">
                  <a href="" className="w-full flex">
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="hidden sm:!block h-15 w-[1px] bg-gray-300 rounded-5"></div>
        </div>
      </div>
      <SearchForm />
    </div>
  )
}

export default TopHeader
