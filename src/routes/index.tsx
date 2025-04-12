import PostCard from '@/components/PostCard'
import { Link } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import { Bookmark, EllipsisVertical, SquarePlus } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Index,
  
})

function Index() {
  return (
    <div className="h-[92vh] overflow-scroll">
      <header className='p-4 flex justify-between border-b border-main/30 '>
        <div className='flex  items-center'>
          <EllipsisVertical/>
          <img src='/images/talk-text.png' alt='talk text logo'/>
        </div>
        <div className='flex gap-5 items-center opacity-60'>
          <SquarePlus/>
          <Bookmark/>
        </div>
      </header>
      <main className='p-4'>
        <PostCard/>

      </main>
    </div>
  )
}