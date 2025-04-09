import { Link } from '@tanstack/react-router'
import { Home, LayoutGrid, ShoppingCart, User } from 'lucide-react'


const navLinks = [
  {
    label: 'Home',
    icon: <Home/>,
    route:'/'
  },
  {
    label: 'Categories',
    icon: <LayoutGrid/>,
    route:'/categories'
  },
  {
    label: 'Account',
    icon: <User/>,
    route:'/account'
  },
  {
    label: 'Cart',
    icon: <ShoppingCart/>,
    route:'/cart'
  }
]
const MobileNav = () => {
  
  return (
    <nav className='sm:hidden sticky bottom-0 left-0 w-full h-[8vh] flex justify-between items-center bg-white dark:bg-black border-t border-grey-50 dark:border-dark-grey-50 '>
      {
        navLinks.map((link,index) => (
          <Link key={index} to={link.route} className='flex-1 h-full gap-1 flex flex-col justify-center items-center text-sm  active:bg-grey-100 dark:active:bg-dark-grey-50 [&.active]:text-main [&.active]:dark:text-dark-main [&.active]:font-bold font-medium text-grey-150 dark:text-dark-grey-150 transition-all duration-200 '>
            <div className='relative'>
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