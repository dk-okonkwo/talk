import ChatListHeader from "@/components/ChatListHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { chatUsers, lastMessages } from "./_layout";

export const Route = createFileRoute("/chat/list")({
  component: RouteComponent,
});

function RouteComponent() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const linkClass = (to: string) => `${pathname === to && "sm:bg-white"}`;

  // TODO: Add ring to show online and offline users

  return (
    <div className="w-full h-[calc(100dvh-4rem)] overflow-hidden p-1 flex flex-row gap-1">
      {/* chat list */}

      <div
        className={`bg-transparent h-full w-full min-w-full flex flex-col items-center gap-0 overflow-hidden`}
      >
        <ChatListHeader />
        <ScrollArea className="w-full h-full pr-3 gap-1 flex flex-col pl-1 py-1">
          {chatUsers.map((user, idx) => (
            <React.Fragment key={user.id}>
              <Link to={"/chat/$id"} params={{ id: user.id }}>
                <div
                  className={`w-full hover:bg-white hover:text-sidebar-accent-foreground flex items-center gap-2 !px-2 !py-4 text-sm leading-tight overflow-hidden !min-h-fit rounded-sm ${linkClass(`/chat/${user.id}`)}`}
                >
                  <Avatar className="h-12 w-12 rounded-full">
                    <AvatarImage src={user.profileImageUrl} alt="User pic" />
                    <AvatarFallback className="rounded-lg">User</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col items-start gap-2 border-b p-0 text-sm last:border-b-0 w-full">
                    <div className="flex w-full items-center gap-2">
                      <span className="font-bold truncate max-w-50">
                        {user.first_name} {user.last_name}
                      </span>
                      <span className="ml-auto text-xs">
                        {lastMessages[idx].time}
                      </span>
                    </div>

                    <span className="line-clamp-2 text-xs text-left text-wrap truncate">
                      {lastMessages[idx].content}
                    </span>
                  </div>
                </div>
              </Link>
              <Separator orientation="horizontal" className="w-full my-1" />
            </React.Fragment>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
