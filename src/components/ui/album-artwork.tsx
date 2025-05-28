import { cn } from '@/lib/utils'

import { type Album } from '@/data/album'

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  album: Album
  aspectRatio?: 'portrait' | 'square'
  width?: number
  height?: number
}

export function AlbumArtwork({ album, ...props }: AlbumArtworkProps) {
  return (
    <div className={cn('space-y-3')} {...props}>
      <div className="overflow-hidden rounded-md">
        <img
          src={album.cover}
          alt={album.name}
          className={cn(
            'min-w-[150px] h-[150px] md:h-[330px] lg:min-w-[250px] object-cover transition-all hover:scale-105 aspect-square sm:aspect-[3/4]',
          )}
        />
      </div>
    </div>
  )
}
