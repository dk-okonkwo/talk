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
import { Input } from "@/components/ui/input";
import { Send2 } from "iconsax-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CardsChat() {
  const [messages, setMessages] = React.useState([
    {
      role: "agent",
      content: "Hi, how can I help you today?",
    },
    {
      role: "user",
      content: "Hey, I'm having trouble with my account.",
    },
    {
      role: "agent",
      content: "What seems to be the problem?",
    },
    {
      role: "user",
      content: "I can't log in.",
    },
  ]);
  const [input, setInput] = React.useState("");
  const inputLength = input.trim().length;

  const bottomRef = React.useRef<HTMLDivElement | null>(null);

  // scroll to bottom when messages change
  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <>
      <Card className="flex-1 flex flex-col h-full min-h-0 rounded-none">
        <CardHeader className="flex flex-col items-center">
          <div className="flex flex-row items-center w-full">
            <div className="flex items-center gap-4">
              <Avatar className="border">
                <AvatarImage src="/avatars/01.png" alt="Image" />
                <AvatarFallback>S</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm leading-none font-medium">Sofia Davis</p>
                <p className="text-muted-foreground text-xs">m@example.com</p>
              </div>
            </div>
          </div>
          <Separator orientation="horizontal" className="w-full mt-4" />
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden">
          <ScrollArea className="w-full h-full">
            <div className="flex flex-col gap-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
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
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (inputLength === 0) return;
              setMessages([
                ...messages,
                {
                  role: "user",
                  content: input,
                },
              ]);
              setInput("");
            }}
            className="relative w-full"
          >
            <Input
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
    </>
  );
}
