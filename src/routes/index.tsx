import PostCard from '@/components/PostCard'
// import { Link } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import { Bookmark, EllipsisVertical, SquarePlus } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Index,
  
})

function Index() {
  return (
    <div className="relative h-[92vh] overflow-scroll">
      <header className='sticky top-0 px-4 py-2.5 bg-black flex justify-between border-b border-main/30 '>
        <div className='flex  items-center'>
          <EllipsisVertical/>
          <img src='/images/talk-text.png' alt='talk text logo'/>
        </div>
        <div className='flex gap-5 items-center opacity-60'>
          <SquarePlus/>
          <Bookmark/>
        </div>
      </header>
      <main className='px-4'>
        <PostCard/>
        <PostCard/>
        <PostCard/>
        <PostCard/>

      </main>
    </div>
  )
}