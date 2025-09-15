import ChatListHeader from "@/components/ChatListHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  createFileRoute,
  Outlet,
  Link,
  useRouterState,
} from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { makeChatUsers, makeLastMessageData } from "@/data/chat-data";

export const Route = createFileRoute("/chat/_layout")({
  component: RouteComponent,
});

export const chatUsers = makeChatUsers(12);
export const lastMessages = makeLastMessageData(12);

function RouteComponent() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const linkClass = (to: string) => `${pathname === to && "sm:bg-white"}`;

  // const atChatIndex = pathname === "/chat" || pathname === "/chat/";
  // const sidebarMobileClass = atChatIndex ? "flex" : "hidden";
  return (
    <div className="w-full md:h-full overflow-hidden p-1 flex flex-row gap-1">
      {/* chat list */}
      <div
        className={`bg-muted h-full w-86 min-w-86 hidden md:flex flex-col items-center gap-0 overflow-hidden`}
      >
        <ChatListHeader />
        <ScrollArea className="w-full h-full pr-3 gap-1 flex flex-col pl-1 py-1 pb-3">
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
      {/* chat body on the right of the screen*/}
      <div className="w-full h-fit sm:h-full overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
