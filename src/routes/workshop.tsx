import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatListHeader from "@/components/ChatListHeader";
import {
  makeChatMessages,
  makeChatUsers,
  makeLastMessageData,
} from "@/data/chat-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ChatCard } from "@/components/ChatCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

export const Route = createFileRoute("/workshop")({
  component: RouteComponent,
});

function RouteComponent() {
  const chatUsers = makeChatUsers(12);
  const lastMessages = makeLastMessageData(12);
  return (
    <Tabs defaultValue={"0"} className="flex flex-row h-full p-1">
      <div className="bg-muted h-full w-86 flex flex-col items-center gap-0">
        <ChatListHeader />

        <TabsList
          className="w-full
        flex-1 overflow-hidden p-1 rounded-none justify-start"
        >
          <ScrollArea className="w-full h-full pr-3 gap-1 flex flex-col">
            {chatUsers.map((user, idx) => (
              <React.Fragment key={user.id}>
                <TabsTrigger
                  value={String(user.id)}
                  className="w-full hover:bg-white hover:text-sidebar-accent-foreground flex items-center gap-2 border-b !px-2 !py-4 text-sm leading-tight last:border-b-0 overflow-hidden !min-h-fit"
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
                </TabsTrigger>
                <Separator orientation="horizontal" className="w-full my-1" />
              </React.Fragment>
            ))}
          </ScrollArea>
        </TabsList>
      </div>

      {chatUsers.map((user) => (
        <TabsContent key={user.id} value={String(user.id)}>
          <ChatCard initialMessages={makeChatMessages()} chatUser={user} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
