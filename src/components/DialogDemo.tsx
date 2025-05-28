import CarouselDemo from '@/components/CarouselDemo'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { AlbumArtwork } from '@/components/ui/album-artwork'
import { type Album } from '@/data/album'

export function DialogDemo({ album, index }: { album: Album; index: number }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <AlbumArtwork album={album} />
      </DialogTrigger>
      <DialogContent className="flex items-center justify-center bg-transparent border-0 shadow-none !max-w-auto sm:!max-w-auto">
        <CarouselDemo key={index} start={index} />
      </DialogContent>
    </Dialog>
  )
}
