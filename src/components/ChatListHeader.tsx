"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { CheckIcon, PlusIcon } from "lucide-react";
// import { User } from "@/utils/auth";

const users = [
  {
    name: "Olivia Martin",
    email: "m@example.com",
    avatar: "/avatars/01.png",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    avatar: "/avatars/03.png",
  },
  {
    name: "Emma Wilson",
    email: "emma@example.com",
    avatar: "/avatars/05.png",
  },
  {
    name: "Jackson Lee",
    email: "lee@example.com",
    avatar: "/avatars/02.png",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    avatar: "/avatars/04.png",
  },
] as const;

type User = (typeof users)[number];

export default function ChatListHeader() {
  const [open, setOpen] = React.useState(false);
  const [selectedUsers, setSelectedUsers] = React.useState<User[]>([]);
  return (
    <div className="gap-3.5 border-b p-4 w-full flex flex-col md:h-1/6 ">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-foreground text-base font-medium">Inbox</div>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  className="ml-auto size-8 rounded-full"
                  onClick={() => setOpen(true)}
                >
                  <PlusIcon />
                  <span className="sr-only">New message</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>New message</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="gap-0 p-0 outline-none">
              <DialogHeader className="px-4 pt-5 pb-4">
                <DialogTitle>New message</DialogTitle>
                <DialogDescription>
                  Invite a user to this thread. This will create a new group
                  message.
                </DialogDescription>
              </DialogHeader>
              <Command className="overflow-hidden rounded-t-none border-t bg-transparent">
                <CommandInput placeholder="Search user..." />
                <CommandList>
                  <CommandEmpty>No users found.</CommandEmpty>
                  <CommandGroup>
                    {users.map((user) => (
                      <CommandItem
                        key={user.email}
                        data-active={selectedUsers.includes(user)}
                        className="data-[active=true]:opacity-50"
                        onSelect={() => {
                          if (selectedUsers.includes(user)) {
                            return setSelectedUsers(
                              selectedUsers.filter(
                                (selectedUser) => selectedUser !== user
                              )
                            );
                          }

                          return setSelectedUsers(
                            [...users].filter((u) =>
                              [...selectedUsers, user].includes(u)
                            )
                          );
                        }}
                      >
                        <Avatar className="border">
                          <AvatarImage src={user.avatar} alt="Image" />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="ml-2">
                          <p className="text-sm leading-none font-medium">
                            {user.name}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {user.email}
                          </p>
                        </div>
                        {selectedUsers.includes(user) ? (
                          <CheckIcon className="text-primary ml-auto flex size-4" />
                        ) : null}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
              <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
                {selectedUsers.length > 0 ? (
                  <div className="flex -space-x-2 overflow-hidden">
                    {selectedUsers.map((user) => (
                      <Avatar key={user.email} className="inline-block border">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Select users to add to this thread.
                  </p>
                )}
                <Button
                  disabled={selectedUsers.length < 2}
                  size="sm"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Continue
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Label className="flex items-center gap-2 text-sm">
          <span>Unreads</span>
          <Switch className="shadow-none" />
        </Label>
      </div>
      <Input placeholder="Type to search..." />
    </div>
  );
}
