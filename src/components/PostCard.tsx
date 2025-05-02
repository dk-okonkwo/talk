import { DollarSign, Ellipsis, Image, MessageCircle, Repeat2, Smile, ThumbsDown, ThumbsUp } from 'lucide-react'
import { Input } from './ui/input'
// import React from 'react'

const PostCard = () => {
  return (
    <main className='flex flex-col gap-4 border-b border-[#999] py-4'>
      <div className='flex items-center gap-1.5'>
        <img 
          src='/images/post-demo.png'
          alt='post'
          className='rounded-full size-9 object-cover'  
        />
        <div className=' tracking-wide '>
          <h2 className='font-semibold leading-tight'>Anita David</h2>
          <p className=' text-xs opacity-50 tracking-widest'>16h</p>
        </div>
        <Ellipsis className='ml-auto'/>
      </div>
      <p className='line-clamp-6 text-xs'>Fashion is the style of clothing, accessories, and other items that are popular at a given time. It can a</p>
      <img 
        src='/images/post-demo.png'
        alt='post'
        className='rounded-2xl object-cover'  
      />
      <section className='flex items-center justify-between opacity-80'>
        <div className='flex gap-5 *:*:size-5 text-sm items-end'>
            <p className='flex items-center gap-0.5'><ThumbsUp/>124</p>
            <p className='flex items-center gap-0.5'><ThumbsDown/>124</p>
            <p className='flex items-center gap-0.5'><Repeat2/>124</p>
            <p className='flex items-center gap-0.5'><MessageCircle/>124</p>
        </div>
        <div className='flex gap-0.5 text-sm items-center'>
            <DollarSign className='size-5'/>
            <p>Tip</p>
        </div>
      </section>
      <p className='opacity-70 text-sm font-medium'>View 12 comments</p>
      <div>
        <div className='flex items-end gap-1.5'>
          <img 
            src='/images/post-demo.png'
            alt='post'
            className='rounded-full size-9 object-cover'  
          />
          <Input 
            type="text" 
            placeholder='Add a comment...'
            className='border-b rounded-none p-2 text-sm w-full'
          />
          <div className='ml-auto flex *:size-5 gap-2 opacity-50'>
            <Smile/>
            <Image/>
          </div>
        </div>
      </div>
    </main>
  )
}

export default PostCard