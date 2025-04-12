import { Bookmark, Database, Heart, Mail, Upload } from 'lucide-react'
// import React from 'react'

const PostCard = () => {
  return (
    <main className='flex flex-col gap-4 border-b border-[#333] py-4'>
      <div className='flex items-center gap-4'>
        <img 
          src='/images/post-demo.png'
          alt='post'
          className='rounded-full size-9 object-cover'  
        />
        <div className='text-sm tracking-wide'>
          <h2 className='font-semibold '>Anita David</h2>
          <h3 className='text-main text-[10px] tracking-widest'>Fashion Designer</h3>
        </div>
      </div>
      <img 
        src='/images/post-demo.png'
        alt='post'
        className='rounded-2xl object-cover'  
      />
      <section className='space-y-3'>
        <div className='flex gap-2 text-xs tracking-wide'>
          <h2 className='font-semibold whitespace-nowrap '>Anita David</h2>
          <p className='line-clamp-2 text-[10px]'>Fashion is the style of clothing, accessories, and other items that are popular at a given time. It can a</p>
        </div>
        <div className='flex justify-between '>
          <div className='flex gap-2.5 *:*:size-5 text-sm items-end'>
            <p className='flex items-center gap-0.5'><Database/>124</p>
            <p className='flex items-center gap-0.5'><Heart/>124</p>
            <p className='flex items-center gap-0.5'><Bookmark/>124</p>
            
          </div>
          <div className='flex gap-4 *:size-5'>
             <Mail/>
             <Upload/>
          </div>
        </div>
      </section>
    </main>
  )
}

export default PostCard