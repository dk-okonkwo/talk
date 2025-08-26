"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Send2 } from "iconsax-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/data/chat-data";
import { User } from "@/utils/auth";
import { ArrowLeft } from "iconsax-react";
import { useRouter } from "@tanstack/react-router";
import { TeamSwitcher } from "@/components/team-switcher";
import { teams } from "@/routes/__root";
import { Textarea } from "@/components/ui/textarea";

type Props = { initialMessages: ChatMessage[]; chatUser: User };

export function ChatCard({ initialMessages, chatUser }: Props) {
  const router = useRouter();
  const [messages, setMessages] = React.useState<ChatMessage[]>(
    () => initialMessages ?? []
  );
  const [input, setInput] = React.useState("");
  const inputLength = input.trim().length;

  const bottomRef = React.useRef<HTMLDivElement | null>(null);

  // sync when parent's messages change (won't clobber user-typed input)
  React.useEffect(() => {
    setMessages(initialMessages ?? []);
  }, [initialMessages]);

  // scroll to bottom when messages change
  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  // handle submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputLength === 0) return;
    const newMsg: ChatMessage = {
      id: Number(Date.now()),
      role: "user",
      content: input,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  return (
    <Card className="h-[calc(100dvh-4.2rem)] flex-1 flex flex-col sm:h-full min-h-0 rounded-none gap-1 sm:gap-3 md:gap-6">
      <CardHeader className="flex flex-col items-center px-2 sm:px-4 md:px-6">
        <div className="flex flex-row items-center w-full">
          <div className="flex items-center gap-3 sm:gap-4">
            <Button
              variant="outline"
              className="rounded-full !w-8 !h-8 bg-muted md:hidden"
              onClick={() => router.navigate({ to: "/chat/list" })}
            >
              <ArrowLeft className="stroke-black !w-5 !h-5" />
            </Button>
            <Avatar className="border">
              <AvatarImage src="/avatars/01.png" alt="Image" />
              <AvatarFallback>{chatUser.first_name?.[0] ?? ""}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm leading-none font-medium">
                {chatUser.first_name ?? "New"} {chatUser.last_name ?? "User"}
              </p>
              <p className="text-muted-foreground text-xs">{chatUser.email}</p>
            </div>
            <div className="flex items-center ml-auto w-fit sm:hidden">
              <Separator
                orientation="vertical"
                className="mx-2 !h-6 sm:hidden"
              />
              <div className="sm:hidden">
                <TeamSwitcher teams={teams} />
              </div>
            </div>
          </div>
        </div>
        <Separator orientation="horizontal" className="w-full mt-2 sm:mt-4" />
      </CardHeader>

      <CardContent className="sm:flex-1 overflow-hidden p-0">
        <ScrollArea className="w-full h-full overflow-x-hidden">
          <div className="flex flex-col px-2 md:px-3 gap-4 w-full min-w-full overflow-x-hidden">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex md:w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground ml-auto"
                    : "bg-muted"
                )}
              >
                {message.content}
              </div>
            ))}
            {/* invisible anchor to scroll into view */}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex-shrink-0 flex flex-col">
        <Separator orientation="horizontal" className="w-full mb-4" />
        <form onSubmit={handleSubmit} className="relative w-full">
          <Textarea
            id="message"
            placeholder="Type your message..."
            className="flex-1 pr-10"
            autoComplete="off"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute top-1/2 right-2 size-6 -translate-y-1/2 rounded-full"
            disabled={inputLength === 0}
          >
            <Send2 variant="Bold" className="size-3.5 fill-white" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
