import { Button } from '@/components/ui/button'
import { ArrowDown2 } from 'iconsax-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AvatarDemo } from './TAvatar'

export function AvatarDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex gap-2 h-auto shadow-sm md:gap-3 md:py-0.5 sm:order-2"
        >
          <AvatarDemo />
          <div className="flex flex-col items-start justify-evenly">
            <span className="text-[var(--bg-text)] font-bold text-sm md:text-lg">
              William Smith
            </span>
            <span className="text-[var(--subheading)] text-sm hidden sm:!block sm:text-md">
              williamsmith@gmail.com
            </span>
          </div>
          <ArrowDown2 className="w-5 stroke-[var(--bg-text)] self-end hidden sm:!block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="font-bold">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
