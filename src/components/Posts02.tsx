import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

import { madeForYouAlbums } from '@/data/album'
import { DialogDemo } from './DialogDemo'

export const metadata = {
  title: 'Music App',
  description: 'Example music app using the components.',
}

export default function ProfilePosts() {
  return (
    <div className="border-none p-0 outline-none mt-5 md:mt-0">
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
