import { useState } from 'react'
import robo from '../assets/images/robo.jpg'
import { ArrowDown2 } from 'iconsax-react'

function HeaderDropdown() {
  const [openDropdown, setOpenDropdown] = useState(false)
  return (
    <div className="sm:order-2 flex flex-col group relative pb-1">
      <div
        className="flex items-center gap-2 py-1 px-2 transition-all duration-300 ease-in-out shadow-sm inset-shadow-sm hover:shadow-xl hover:inset-shadow-sm rounded-sm hover:cursor-pointer"
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        <div className="flex items-center justify-center aspect-square h-12 rounded-full border-2 border-[var(--primary)] sm:!h-14">
          <img
            src={robo}
            alt="profile picture"
            className="h-9/10 aspect-square rounded-full"
          />
        </div>
        <div className="flex flex-col items-start h-full md:gap-2">
          <span className="text-[var(--bg-text)] font-bold text-xl">
            William Smith
          </span>
          <span className="text-[var(--subheading)] text-sm hidden sm:!block sm:text-md">
            williamsmith@gmail.com
          </span>
        </div>
        <ArrowDown2 className="w-5 stroke-[var(--bg-text)] self-end hidden sm:!block" />
      </div>
      <div
        className={`absolute w-full mt-15 sm:mt-17 py-2 shadow-md z-1000 rounded-md bg-[var(--secondary-bg)]  transition-all duration-200 ease-in group-hover:opacity-100 group-hover:pointer-events-auto opacity-0 pointer-events-none ${openDropdown && 'opacity-100 pointer-events-auto'}`}
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
  )
}

export default HeaderDropdown
