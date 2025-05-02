import { Link } from '@tanstack/react-router'
import { Home, Mail, NotepadText, Store, User } from 'lucide-react'


const navLinks = [
  {
    label: 'Home',
    icon: <Home/>,
    route:'/'
  },
  {
    label: 'Market',
    icon: <Store/>,
    route:'/market'
  },
  {
    label: 'Billboard',
    icon: <NotepadText/>,
    route:'/billboard'
  },
  {
    label: 'Messages',
    icon: <Mail/>,
    route:'/messages'
  },
  {
    label: 'Profile',
    icon: <User/>,
    route:'/profile'
  },
]
const MobileNav = () => {
  
  return (
    <nav className='sm:hidden sticky bottom-0 left-0 w-full h-[8vh] flex justify-between items-center bg-[#EDEFF2] dark:bg-black border-t border-[#999] dark:border-dark-[#222] '>
      {
        navLinks.map((link,index) => (
          <Link key={index} to={link.route} className='flex-1 h-full gap-1 flex flex-col justify-center items-center text-[#555] text-xs tracking-wide  active:bg-black/5 dark:active:bg-dark-grey-50 [&.active]:text-main [&.active]:dark:text-dark-main [&.active]:font-medium transition-all duration-200 '>
            <div className='relative *:size-5'>
             {link.icon}
             {/* {link.label === 'Cart' && cartItems.length !== 0 && <span className='absolute top-0 right-0 size-1 translate-x-1/2 -translate-y-1/2 rounded-lg font-medium p-2 flex justify-center items-center text-[10px] bg-main text-white dark:bg-dark-main '>{cartItems.length}</span>} */}
            </div>
            <span>{link.label}</span>
          </Link>
        ))
      }
    </nav>
  )
}

export default MobileNav