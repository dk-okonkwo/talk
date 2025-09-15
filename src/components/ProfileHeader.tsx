import robo from '../assets/images/robo.jpg'
import {
  Brush3,
  Sms,
  Setting2,
  Youtube,
  Instagram,
  Facebook,
} from 'iconsax-react'

function ProfileHeader() {
  return (
    <div className="flex w-full mx-auto justify-evenly items-center xl:!justify-center xl:gap-[10vw]">
      <div className="flex flex-col items-center">
        <img
          src={robo}
          alt="profile picture"
          className="h-30 aspect-square rounded-full sm:h-45 xl:h-[220px]"
        />
        <span className="text-xl font-bold text-[var(--primary)] mb-1 sm:text-2xl xl:text-3xl">
          William Smith
        </span>
        <span className="text-sm font-bold text-[var(--bg-text)] mb-5 sm:text-base xl:text-xl">
          UI/UX Designer
        </span>
        <ul className="flex items-center gap-2 sm:gap-5 md:gap-7">
          <li className="flex flex-col items-center p-0.5 xl:p-1 rounded-sm transition-all duration-300 transform hover:scale-95 hover:bg-[var(--secondary-bg)] hover:shadow-md">
            <Brush3 className="w-5 stroke-[var(--primary)] sm:w-6 xl:w-8" />
            <span className="text-[var(--subheading)] text-[13px] sm:!text-base xl:!text-xl sm:font-bold">
              Workshop
            </span>
          </li>
          <li className="flex flex-col items-center p-0.5 xl:p-1 rounded-sm transition-all duration-300 transform hover:scale-95 hover:bg-[var(--secondary-bg)] hover:shadow-md">
            <Sms className="w-5 stroke-[var(--primary)] sm:w-6 xl:w-8" />
            <span className="text-[var(--subheading)] text-[13px] sm:!text-base xl:!text-xl sm:font-bold">
              Message
            </span>
          </li>
          <li className="flex flex-col items-center p-0.5 xl:p-1 rounded-sm transition-all duration-300 transform hover:scale-95 hover:bg-[var(--secondary-bg)] hover:shadow-md">
            <Setting2 className="w-5 stroke-[var(--primary)] sm:w-6 xl:w-8" />
            <span className="text-[var(--subheading)] text-[13px] sm:!text-base xl:!text-xl sm:font-bold">
              Settings
            </span>
          </li>
        </ul>
      </div>
      {/* Description and Socials */}
      <div className="w-45 sm:w-70 flex flex-col gap-2 sm:gap-[2vw] md:w-[500px]">
        <div className="p-2 bg-white rounded-md flex flex-col items-start gap-2 shadow-md">
          <span className="text-sm font-bold text-[var(--subheading)] sm:!text-base">
            About
          </span>
          <span className="text-left text-[var(--bg-text)] text-xs sm:text-base xl:text-xl">
            Description: Vintage meets vogue is this serif typeface. encompasses
            the mode high-fashion aesthetic of the 1960s with a commercial take.
          </span>
        </div>
        <ul className="flex flex-col pl-2 pt-2 items-start bg-white rounded-md shadow-md sm:gap-1">
          <li className="font-bold text-sm mb-2 text-[var(--subheading)] sm:!text-base">
            Socials
          </li>
          <li className="w-full">
            <a
              href=""
              className="flex gap-2 items-center mb-2 sm:gap-4 transition-all duration-300 hover:bg-[var(--primary-accent)]"
            >
              <Youtube className="w-5 stroke-[var(--primary)] sm:w-7" />
              <span className="text-sm text-[var(--bg-text)] sm:text-base xl:text-xl sm:font-bold">
                @williamSmith
              </span>
            </a>
          </li>
          <li className="w-full">
            <a
              href=""
              className="flex gap-2 items-center mb-2 sm:gap-4 transition-all duration-300 hover:bg-[var(--primary-accent)]"
            >
              <Instagram className="w-5 stroke-[var(--primary)] sm:w-7" />
              <span className="text-sm text-[var(--bg-text)] sm:text-base xl:text-xl sm:font-bold">
                @williamSmith
              </span>
            </a>
          </li>
          <li className="w-full">
            <a
              href=""
              className="flex gap-2 items-center mb-2 sm:gap-4 transition-all duration-300 hover:bg-[var(--primary-accent)]"
            >
              <Facebook className="w-5 stroke-[var(--primary)] sm:w-7" />
              <span className="text-sm text-[var(--bg-text)] sm:text-base xl:text-xl sm:font-bold">
                @williamSmith
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ProfileHeader
