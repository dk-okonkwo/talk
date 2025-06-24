import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { madeForYouAlbums } from '@/data/album'
import { DialogDemo } from './DialogDemo'
import { Textarea } from '@/components/ui/textarea'
import { currentUser } from '@/data/current-user'
import { Happyemoji, Hashtag } from 'iconsax-react'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Music App',
  description: 'Example music app using the components.',
}

export default function ProfilePosts() {
  return (
    <div className="border-none p-0 outline-none mt-5 md:mt-0">
      <div className="w-full p-2 shadow-md rounded-sm flex flex-col items-center gap-3 bg-white mb-4">
        <div className="w-full flex gap-2">
          <Avatar>
            <AvatarImage src={currentUser.imgUrl} alt="item owner" />
            <AvatarFallback>
              {currentUser.firstName[0]}
              {currentUser.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <Textarea placeholder="Type something." />
        </div>
        <div className="w-full flex items-center gap-2">
          <Happyemoji
            variant="Bold"
            className="w-5 h-5 stroke-gray-400 hover:stroke-primary hover:cursor-pointer"
          />
          <Hashtag className="w-5 h-5 stroke-gray-400 hover:stroke-primary hover:cursor-pointer" />
          <Button className='ml-auto font-semibold cursor-pointer'>Post</Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Your Posts</h2>
          {/* <p className="text-sm text-muted-foreground">
            Top picks for you. Updated daily.
          </p> */}
        </div>
      </div>
      <Separator className="my-4 bg-[var(--primary)]" />
      <div className="relative">
        <ScrollArea>
          <div className="flex pb-4 flex-wrap gap-2 lg:gap-3 justify-center md:justify-start xl:justify-center">
            {madeForYouAlbums.map((album, index) => (
              <DialogDemo key={album.name} album={album} index={index} />
            ))}
          </div>
        </ScrollArea>
      </div>
      {/* <div className="mt-6 space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Made for You</h2>
        <p className="text-sm text-muted-foreground">
          Your personal playlists. Updated daily.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4 flex-wrap space-y-4">
            {listenNowAlbums.map((album) => (
              <AlbumArtwork key={album.name} album={album} />
            ))}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div> */}
    </div>
  )
}
