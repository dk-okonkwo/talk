'use client'

import CarouselDemo from '@/components/CarouselDemo'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  // DialogFooter,
  // DialogHeader,
  // DialogTitle,
  // DialogTrigger,
} from '@/components/ui/dialog'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { type CarouselApi } from '@/components/ui/carousel'
import { useState } from 'react'

export function CarouselDialog() {
  const [open, setOpen] = useState(false)
  const [startIndex, setStartIndex] = useState(0)

  const handleClick = (index: number) => {
    setStartIndex(index)
    setOpen(true)
  }

  return (
    <div className="p-2 bg-purple-100 flex items-center gap-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <Button
          key={index}
          variant="outline"
          onClick={() => handleClick(index)}
        >
          Edit Profile {index + 1}
        </Button>
      ))}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex items-center justify-center bg-transparent border-0 shadow-none !max-w-auto sm:!max-w-auto">
          <CarouselDemo key={startIndex} start={startIndex} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
