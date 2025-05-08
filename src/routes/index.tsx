import PostCard from '@/components/PostCard'
import { Input } from '@/components/ui/input'
import { createFileRoute } from '@tanstack/react-router'
import { Bell, MessageCircle, Search, X } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import EventBanner from '@/components/EventBanner'



export const Route = createFileRoute('/')({
  component: Index,
  
})

function Index() {
  return (
    <div className='flex'>
      
    <div className="relative flex-1 bg-talkBG h-[92vh] lg:h-screen overflow-auto">
      <header className='z-50 sticky top-0 shadow px-4 py-2.5 bg-inherit flex justify-between gap-20'>
        <div className='flex lg:hidden items-center  gap-2'>
          <img
            src='/images/talk.png'
            alt='talk logo'
            className='rounded-full size-8 object-cover'
          />
          <img src='/images/talk-text2.png' alt='talk text logo' className='w-12'/>
          {/* <Link to='/sign-in' className='text-sm font-medium text-black/60 hover:text-black/80'>Sign In</Link>
          <Link to='/sign-up' className='text-sm font-medium text-black/60 hover:text-black/80'>Sign Up</Link> */}
        </div>
        <div className='w-full ml-8 lg:flex hidden px-2 items-center py-1 bg-[#EDEFF2] border focus-within:border-black/50 rounded-sm text-sm'>
          <Search className='opacity-50'/>
          <Input
            placeholder='Search...'
            
          />
        </div>
        <div className='flex gap-5 items-center opacity-60'>
          <DropdownMenu>
            <DropdownMenuTrigger className='bg-[#F9F1E7] p-1 rounded-sm'><Bell/></DropdownMenuTrigger>
            <DropdownMenuContent >
              <DropdownMenuLabel>Notifications<span className='text-black/60'>(02)</span></DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <img
                  src='/images/notification.png'
                  alt="Notification"
                />
                <div className='max-w-40 py-2 text-xs space-y-1'>
                  <p>Canon EOS 1500D DSLR Camera Body+ 18-55 mm</p>
                  <p className='text-black/60 font-medium'>1 x <span className='text-blue-400'>₦1,500</span></p>
                </div>
                <div className='self-start mt-2'>
                  <X/>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <img
                  src='/images/notification.png'
                  alt="Notification"
                />
                <div className='max-w-40 py-2 text-xs space-y-1'>
                  <p>Canon EOS 1500D DSLR Camera Body+ 18-55 mm</p>
                  <p className='text-black/60 font-medium'>1 x <span className='text-blue-400'>₦1,500</span></p>
                </div>
                <div className='self-start mt-2'>
                  <X/>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          
          <MessageCircle className='bg-[#F9F1E7] p-1 rounded-sm size-8'/>
        </div>
      </header>
      <main className='px-4 py-2 space-y-4'>
        <div className=' flex lg:hidden px-2 items-center py-1 bg-[#EDEFF2] border focus-within:border-black/50 rounded-sm text-sm'>
          <Search className='opacity-50'/>
          <Input
            placeholder='Search...'
            
          />
        </div>
        <div className='space-y-4 max-w-lg mx-auto'>
          <EventBanner/>
          <h1 className="text-lg font-medium tracking-wide">Updates</h1>
          <PostCard/>
          <PostCard/>
          <PostCard/>
          <PostCard/>

        </div>

      </main>
    </div>

    </div>
  )
}