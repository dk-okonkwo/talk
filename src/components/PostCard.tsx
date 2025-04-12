import { Bookmark, Database, Heart, Mail, Upload } from 'lucide-react'
// import React from 'react'

const PostCard = () => {
  return (
    <main className='flex flex-col gap-4'>
      <div className='flex items-center gap-4'>
        <img 
          src='/images/post-demo.png'
          alt='post'
          className='rounded-full size-9 object-cover'  
        />
        <div>
          <h2 className='font-semibold '>Anita David</h2>
          <h3 className='text-main text-[10px]'>Fashion Designer</h3>
        </div>
      </div>
      <img 
          src='/images/post-demo.png'
          alt='post'
          className='rounded-2xl object-cover'  
        />
        <div className='flex gap-2'>
          <h2 className='font-semibold '>Anita David</h2>
          <p className='text-xs line-clamp-2 text-balance overflow-hidden'>Fashion is the style of clothing, accessories, and other items that are popular at a given time. It can a</p>
        </div>
        <div className='flex justify-between '>
          <div className='flex gap-1 *:*:size-5 items-end'>
            <p className='flex items-center gap-1'><Database/>124</p>
            <p className='flex items-center gap-1'><Heart/>124</p>
            <p className='flex items-center gap-1'><Bookmark/>124</p>
            
          </div>
          <div className='flex gap-1 *:size-5'>
             <Mail/>
             <Upload/>
          </div>
        </div>
    </main>
  )
}

export default PostCard