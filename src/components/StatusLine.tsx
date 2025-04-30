import { Check, Dot } from "lucide-react"

const allStatus = [
  {
    id:1,
    title:'Sign In Details',
  },
  {
    id:2,
    title:'Personal Details',
  },
  {
    id:3,
    title:'Select Institution',
  },
]
const StatusLine = ({activePage}:{activePage:number}) => {
  return (
    <div className='sticky top-0 left-0 h-20 px-12 flex items-center z-10'>
      <div className='w-full h-[1px] bg-[#999] text-[#777] font-light relative '>
        {
          allStatus.map((status,index) => {
            const leftPosition = `${(index/(allStatus.length - 1))*100}%`
            const active = activePage === status.id
            const prev = activePage > status.id
            const next = activePage < status.id
            return (
              <div key={index} style={{left:leftPosition}} className='absolute -bottom-3/4 -translate-x-1/2 translate-y-3/4 flex flex-col items-center tracking-wide text-grey-150'>
                <div className={`${(active || prev) ? 'text-white bg-main border-main' :'border-[#999] bg-white dark:bg-black'} p-1 flex items-center justify-center w-6 h-6 rounded-full border dark:border-dark-grey-150 text-xs `}>
                  {(active || next) && <Dot/>}
                  {prev && <Check/>}
                </div>
                <p className={`${active && 'text-main '} font-normal text-xs`}>STEP-{status.id}</p>
                <p className={`${active && 'text-main '} text-[10px] whitespace-nowrap`}>{status.title}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default StatusLine