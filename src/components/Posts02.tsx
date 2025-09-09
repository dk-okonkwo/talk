"use client";
import * as React from "react";
import {
  EmojiPicker,
  EmojiPickerSearch,
  EmojiPickerContent,
  EmojiPickerFooter,
} from "@/components/ui/emoji-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { madeForYouAlbums } from "@/data/album";
import { DialogDemo } from "./DialogDemo";
import { Textarea } from "@/components/ui/textarea";
import { Happyemoji, Hashtag } from "iconsax-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Music App",
  description: "Example music app using the components.",
};

export default function ProfilePosts({
  isUserAccount,
}: {
  isUserAccount: boolean;
}) {
  return (
    <div className="border-none p-0 outline-none mt-5 md:mt-0">
      {isUserAccount && <AddPost />}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            {isUserAccount ? "Your Posts" : "Posts"}
          </h2>
          {/* <p className="text-sm text-muted-foreground">
            See your posts from the most recent.
          </p> */}
        </div>
      </div>
      <Separator className="my-4 bg-[var(--primary)]" />
      <div className="relative">
        <ScrollArea>
          <div className="flex pb-4 flex-wrap gap-2 lg:gap-3 justify-center md:justify-start xl:justify-center">
            {madeForYouAlbums.map((album, index) => (
              <DialogDemo key={album.name} album={album} index={index} />
            ))}
          </div>
        </ScrollArea>
      </div>
      {/* <div className="mt-6 space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Made for You</h2>
        <p className="text-sm text-muted-foreground">
          Your personal playlists. Updated daily.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4 flex-wrap space-y-4">
            {listenNowAlbums.map((album) => (
              <AlbumArtwork key={album.name} album={album} />
            ))}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div> */}
    </div>
  );
}

function AddPost() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [text, setText] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const insertEmoji = (emoji: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText = text.slice(0, start) + emoji + text.slice(end);
    setText(newText);

    // move caret after the emoji
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + emoji.length, start + emoji.length);
    });
  };
  return (
    <div className="w-full p-2 shadow-md rounded-sm flex flex-col items-center gap-3 bg-white mb-4">
      <div className="w-full flex gap-2">
        <Textarea
          ref={textareaRef}
          placeholder="Type something."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="w-full flex items-center gap-2">
        <Popover onOpenChange={setIsOpen} open={isOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="group rounded-full !p-2"
              type="button"
            >
              <Happyemoji
                variant="Bold"
                className="!w-5 !h-5 stroke-gray-400 group-hover:stroke-primary hover:cursor-pointer"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-0">
            <EmojiPicker
              className="h-[342px]"
              onEmojiSelect={({ emoji }) => {
                setIsOpen(false);
                console.log(emoji);
                insertEmoji(emoji);
              }}
            >
              <EmojiPickerSearch />
              <EmojiPickerContent />
              <EmojiPickerFooter />
            </EmojiPicker>
          </PopoverContent>
        </Popover>

        <Hashtag className="w-5 h-5 stroke-gray-400 hover:stroke-primary hover:cursor-pointer" />
        <Button className="ml-auto font-semibold cursor-pointer">Post</Button>
      </div>
    </div>
  );
}
