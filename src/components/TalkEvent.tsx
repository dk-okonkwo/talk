import { useState } from 'react'
import { UserSquare, Calendar, CloseCircle } from 'iconsax-react'
// image, title, time, fee, description

interface TalkEventProps {
  img: string
  title: string
  date: string
  time: string
  entry: string
  desc: string
}

function TalkEvent({ img, title, date, time, entry, desc }: TalkEventProps) {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <>
      <div
        className={`event w-[80vw] bg-white rounded-xl h-40 flex pt-3 pl-3 pr-3 sm:shadow-sm md:shadow-md sm:!w-60 sm:min-h-80 sm:rounded-sm sm:flex-col sm:p-2 sm:gap-1 sm:pointer-events-none`}
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
        onClick={handleOpen}
      >
        <div
          className="hidden sm:!block w-full h-25 rounded-sm mb-3"
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className=" w-full gap-1 hidden sm:!flex sm:flex-wrap">
          <div className="flex gap-1">
            <UserSquare className="stroke-[var(--primary)] w-4" />
            <span className="text-[11px] font-bold">Organizer</span>
          </div>
          <div className="flex gap-1">
            <Calendar className="stroke-[var(--primary)] w-4" />
            <span className="text-[11px] font-bold">
              {date}, {time}
            </span>
          </div>
        </div>
        <span className="text-left font-bold hidden sm:!block">{title}</span>
        <span className="text-left text-sm hidden sm:!block">{desc}</span>
        <div className="p-2 rounded-xs border-1 border-[var(--primary)] hidden sm:!flex items-center justify-center">
          <span className="font-bold text-[var(--primary)]">{entry}</span>
        </div>
        <div className="flex flex-col items-start h-fit px-2 py-2 rounded-sm border-1 border-[var(--primary)] backdrop-blur-sm bg-white/30 text-white max-w-150 sm:!hidden">
          <span className="font-bold">{title}</span>
          <span className="text-sm">
            {date} at {time}
          </span>
          <span className="text-sm">
            Entry: <strong>{entry}</strong>
          </span>
        </div>
      </div>
      <div
        className={`fixed inset-0 bg-gray-500/70 w-screen h-screen z-500 backdrop-blur-xs flex flex-col items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <CloseCircle
          onClick={handleClose}
          className="w-12 stroke-black mb-10"
        />
        <div
          className={`event bg-white flex w-95/100 max-w-80 min-h-100 rounded-sm flex-col p-2 gap-2`}
        >
          <div
            className="block w-full h-40 rounded-sm mb-3"
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          ></div>
          <div className=" w-full gap-3 flex flex-wrap">
            <div className="flex gap-1">
              <UserSquare className="stroke-[var(--primary)] w-5" />
              <span className="text-md font-bold">Organizer</span>
            </div>
            <div className="flex gap-1">
              <Calendar className="stroke-[var(--primary)] w-5" />
              <span className="text-md font-bold">
                {date}, {time}
              </span>
            </div>
          </div>
          <span className="text-left font-bold block text-xl">{title}</span>
          <span className="text-left text-md block">{desc}</span>
          <div className="p-2 rounded-xs border-1 border-[var(--primary)] flex justify-center">
            <span className="font-bold text-[var(--primary)] text-md">
              {entry}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default TalkEvent
