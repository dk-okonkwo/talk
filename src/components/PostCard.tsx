import { DollarSign, EllipsisVertical, Image, Mail, MessageCircle, Repeat2, Smile, ThumbsUp } from 'lucide-react'
import { Input } from './ui/input'
// import React from 'react'

const PostCard = () => {
  return (
    <main className='flex flex-col gap-4 bg-white rounded-lg p-4 shadow '>
      <div className='flex items-center gap-1.5'>
        <img 
          src='/images/post-demo.png'
          alt='post'
          className='rounded-full size-9 object-cover'  
        />
        <div>
          <h2 className='font-medium leading-tight'>Anita David</h2>
          <p className=' text-[10px] opacity-50 tracking-widest'>16h</p>
        </div>
        <div className='ml-auto text-[10px] opacity-50 flex items-end gap-1'>
          <p>231.5k views</p>
          <EllipsisVertical/>
        </div>
      </div>
      <p className='line-clamp-6 text-[12.5px] '>Fashion is the style of clothing, accessories, and other items that are popular at a given time. It can a</p>
      <img 
        src='/images/post-demo.png'
        alt='post'
        className='rounded-md object-cover'  
      />
      <section className='flex items-center justify-between opacity-80'>
        <div className='flex gap-4 *:*:size-5 text-[13px] items-end'>
            <p className='flex items-end gap-0.5'><ThumbsUp/>124</p>
            <p className='flex items-end gap-0.5'><MessageCircle/>124</p>
            <p className='flex items-end gap-0.5'><Repeat2/>124</p>
        </div>
        <div className='flex gap-4'>
          <Mail className='size-5'/>  
          <p className='flex gap-0.5 text-sm items-center'><DollarSign className='size-5'/>Tip</p>
        </div>
      </section>
      <p className='opacity-70 text-sm font-medium'>View 12 comments</p>
      <div className='border-t pt-2'>
        <div className='flex items-end gap-1.5'>
          <img 
            src='/images/post-demo.png'
            alt='post'
            className='rounded-full size-9 object-cover'  
          />
          <Input 
            type="text" 
            placeholder='Add a comment...'
            className=' rounded-none p-2 text-sm w-full'
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