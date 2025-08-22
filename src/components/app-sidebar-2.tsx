"use client";

import * as React from "react";
import { ArchiveX, File, Inbox, Send, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import headshot from "../assets/images/headshot.jpg";
import { Label } from "@/components/ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
} from "@/components/ui/sidebar";
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

// This is sample data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
      isActive: true,
    },
    {
      title: "Drafts",
      url: "#",
      icon: File,
      isActive: false,
    },
    {
      title: "Sent",
      url: "#",
      icon: Send,
      isActive: false,
    },
    {
      title: "Junk",
      url: "#",
      icon: ArchiveX,
      isActive: false,
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2,
      isActive: false,
    },
  ],
  mails: [
    {
      name: "William Smith",
      email: "williamsmith@example.com",
      subject: "Meeting Tomorrow",
      date: "09:34 AM",
      teaser:
        "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
    },
    {
      name: "Alice Smith",
      email: "alicesmith@example.com",
      subject: "Re: Project Update",
      date: "Yesterday",
      teaser:
        "Thanks for the update. The progress looks great so far.\nLet's schedule a call to discuss the next steps.",
    },
    {
      name: "Bob Johnson",
      email: "bobjohnson@example.com",
      subject: "Weekend Plans",
      date: "2 days ago",
      teaser:
        "Hey everyone! I'm thinking of organizing a team outing this weekend.\nWould you be interested in a hiking trip or a beach day?",
    },
    {
      name: "Emily Davis",
      email: "emilydavis@example.com",
      subject: "Re: Question about Budget",
      date: "2 days ago",
      teaser:
        "I've reviewed the budget numbers you sent over.\nCan we set up a quick call to discuss some potential adjustments?",
    },
    {
      name: "Michael Wilson",
      email: "michaelwilson@example.com",
      subject: "Important Announcement",
      date: "1 week ago",
      teaser:
        "Please join us for an all-hands meeting this Friday at 3 PM.\nWe have some exciting news to share about the company's future.",
    },
    {
      name: "Sarah Brown",
      email: "sarahbrown@example.com",
      subject: "Re: Feedback on Proposal",
      date: "1 week ago",
      teaser:
        "Thank you for sending over the proposal. I've reviewed it and have some thoughts.\nCould we schedule a meeting to discuss my feedback in detail?",
    },
    {
      name: "David Lee",
      email: "davidlee@example.com",
      subject: "New Project Idea",
      date: "1 week ago",
      teaser:
        "I've been brainstorming and came up with an interesting project concept.\nDo you have time this week to discuss its potential impact and feasibility?",
    },
    {
      name: "Olivia Wilson",
      email: "oliviawilson@example.com",
      subject: "Vacation Plans",
      date: "1 week ago",
      teaser:
        "Just a heads up that I'll be taking a two-week vacation next month.\nI'll make sure all my projects are up to date before I leave.",
    },
    {
      name: "James Martin",
      email: "jamesmartin@example.com",
      subject: "Re: Conference Registration",
      date: "1 week ago",
      teaser:
        "I've completed the registration for the upcoming tech conference.\nLet me know if you need any additional information from my end.",
    },
    {
      name: "Sophia White",
      email: "sophiawhite@example.com",
      subject: "Team Dinner",
      date: "1 week ago",
      teaser:
        "To celebrate our recent project success, I'd like to organize a team dinner.\nAre you available next Friday evening? Please let me know your preferences.",
    },
  ],
};

export function AppSidebar2({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, _setActiveItem] = React.useState(data.navMain[0]);
  const [mails, _setMails] = React.useState(data.mails);
  // const { setOpen } = useSidebar();

  const [open, setOpen] = React.useState(false);
  const [selectedUsers, setSelectedUsers] = React.useState<User[]>([]);

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row relative h-full"
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}

      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex !h-full">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-foreground text-base font-medium">
                {activeItem?.title}
              </div>
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
                          <Avatar
                            key={user.email}
                            className="inline-block border"
                          >
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
          <SidebarInput placeholder="Type to search..." />
        </SidebarHeader>
        <SidebarContent className="">
          <SidebarGroup className="px-0 !h-full">
            <SidebarGroupContent>
              {mails.map((mail) => (
                <a
                  href="#"
                  key={mail.email}
                  className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-row items-center justify-between gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0"
                >
                  <Avatar className="h-12 w-12 rounded-full">
                    <AvatarImage src={headshot} alt="User pic" />
                    <AvatarFallback className="rounded-lg">User</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col items-start gap-2 border-b p-0 text-sm leading-tight whitespace-nowrap last:border-b-0">
                    <div className="flex w-full items-center gap-2">
                      <span className="font-bold">{mail.name}</span>{" "}
                      <span className="ml-auto text-xs">{mail.date}</span>
                    </div>

                    <span className="line-clamp-2 w-[260px] text-xs whitespace-break-spaces">
                      {mail.teaser}
                    </span>
                  </div>
                </a>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
