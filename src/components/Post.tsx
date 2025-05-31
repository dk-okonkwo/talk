import { useState } from 'react'
import {
  CloseCircle,
  More,
  Like1,
  SmsTracking,
  ArchiveAdd,
} from 'iconsax-react'
import robo from '../assets/images/robo.jpg'
import bm from '../assets/images/bmw2.jpg'

function TalkPost() {
  const [liked, setLiked] = useState(true)
  const [saved, setSaved] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <div className="w-[30vw] md:!w-58 lg:!w-65  xl:!w-75 h-fit">
      <img
        src={bm}
        alt="post image"
        className="w-full aspect-21/20 rounded-lg transform transition-all duration-300 ease-in-out hover:scale-98"
        onClick={handleOpen}
      />
      <div
        className={`fixed inset-0 bg-gray-500/70 w-screen h-screen z-500 backdrop-blur-xs flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div
          className={`rounded-lg w-9/10  bg-white transform transition-transform duration-350 ease-in-out ${isOpen ? 'scale-100' : 'scale-75'} relative p-2 pt-8 sm:!w-7/10 md:!w-125`}
        >
          {/* Modal header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <img
                src={robo}
                alt="user image"
                className="h-8 rounded-full aspect-square"
              />
              <div className="flex flex-col items-start gap-1">
                <span className="font-bold text-[12px] text-[var(--bg-text)]">
                  William Smith
                </span>
                <span className="text-[var(--subheading)] text-[10px]">
                  16h
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--subheading)] text-[10px]">
                2.1k views
              </span>
              <More
                onClick={handleClose}
                className="w-5 stroke-[var(--bg-text)] rotate-90"
              />
            </div>
          </div>
          <span className="w-full text-left text-sm flex flex-col mb-3">
            This 3 shows are special😄
            <br />
            Part (1/7)
            <br />
            <span className="text-blue-500">
              #TheOwlHouse #DemonSlayer #AvatarTheLastAirbender
            </span>
          </span>
          <div className="w-full aspect-5/3 bg-gray-300 backdrop-blur-sm rounded-sm flex items-center justify-center mb-2">
            <img src={bm} alt="post pic" className="h-full aspect-auto" />
          </div>
          <div className="flex w-full items-center gap-7">
            <div className="flex items-center gap-1">
              <Like1
                onClick={() => setLiked(!liked)}
                variant={liked ? 'Bold' : 'Linear'}
                className={`w-5 stroke-[var(--primary)] ${liked && 'fill-[var(--primary)]'}`}
              />
              <span className="font-bold text-xs text-[var(--bg-text)]">
                253
              </span>
            </div>
            <ArchiveAdd
              onClick={() => setSaved(!saved)}
              variant={saved ? 'Bold' : 'Linear'}
              className={`w-5 stroke-[var(--primary)] ${saved && 'fill-[var(--primary)] '}`}
            />
            <a href="">
              <SmsTracking className="w-5 stroke-[var(--primary)]" />
            </a>
          </div>
          <div className="h-[1px] w-full bg-gray-200 mt-3"></div>
          <CloseCircle
            onClick={handleClose}
            className="w-7 stroke-[var(--bg-text)] absolute right-1 top-1"
          />
        </div>
      </div>
    </div>
  )
}

export default TalkPost
