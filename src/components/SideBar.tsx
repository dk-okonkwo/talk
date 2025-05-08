import { Link } from '@tanstack/react-router'
import { Heart, House, LogOut, Mail, NotepadText, Store } from 'lucide-react'
import React from 'react'


const navLinks = [
  {
    id:'1',
    title:'Home',
    icon:<House/>,
    route:"/"
  },
  {
    id:'2',
    title:'Market',
    icon:<Store/>,
    route:"/market"
  },
  {
    id:'3',
    title:'Billboard',
    icon:<NotepadText/>,
    route:"/billboard"
  },
  {
    id:'4',
    title:'Saved',
    icon:<Heart/>,
    route:"/"
  },
  {
    id:'5',
    title:'Messages',
    icon:<Mail/>,
    route:"/messages"
  },
  {
    id:'6',
    title:'Profile',
    icon:(
        <img
          src='/images/profile.jpg'
          alt='user'
          className='rounded-full size-6 border-2 border-current object-cover overflow-hidden'
        />
    ),
    route:"/profile"
  },
  
]


const SideBar = () => {

  const [activeTabId, setActiveTabId] = React.useState('1')
  return (
    <div className='sm:block hidden h-screen w-44 md:w-60'>
        <aside className='h-full w-44 md:w-60 fixed top-0 left-0 bg-[#EDEFF2] flex flex-col justify-between px-3 pt-2 pb-5 border-r '>
          <div>
            <div className='px-3 pb-4 pt-8 mb-5 flex items-center gap-2 *:w-12'>
              <img
                src='/images/talk.png'
                alt='talk logo'
              />
              <img
                src='/images/talk-text2.png'
                alt='talk logo'
              />
            </div>
            <ul className='space-y-1.5'>
              {
                navLinks.map(({id,icon,title,route},i)=>{
                  const isActive = activeTabId === id
                  return(
                    <Link
                      to={route}
                      key={i}
                      onClick={()=>setActiveTabId(id)}
                      className={`p-3 group flex items-center gap-4 cursor-pointer rounded-xl  ${isActive ? 'font-medium text-white bg-main **:stroke-2':"text-gray-600 hover:bg-black/5"} active:bg-main/10 transition-all duration-200`}
                    >
                      <div className='relative'>
                        <span className=''>{icon}</span>
                        {title === 'Messages' && <div className='absolute right-0 top-0 translate-x-1/4 -translate-y-1/4  group-hover:border-current border border-white/50 bg-amber-500 text-white size-[16px] flex justify-center items-center rounded-full text-[8px]  font-medium '>2</div>}
                      </div>
                      {title}
                    </Link>
                  )
                })
              }
            </ul>
          </div>
          <div 
          onClick={()=>setActiveTabId('11')}
          className={`p-3 flex items-center gap-4  cursor-pointer rounded-xl *:size-5 text-sm ${(activeTabId === '11') ? 'font-medium bg-main text-white':"text-gray-600 hover:bg-black/5"} active:bg-main/5 transition-all duration-200`}
          >
            <LogOut/>
            Log-out
          </div>
        </aside>
      </div>
  )
}

export default SideBar