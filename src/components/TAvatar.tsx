import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import robo from "../assets/images/robo.jpg"

export function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src={robo} alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
