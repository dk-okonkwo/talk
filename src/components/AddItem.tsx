"use client";

import { Check, ChevronsUpDown, Percent, BadgeDollarSign } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CloseCircle, GalleryAdd, Add, ArrowDown2 } from "iconsax-react";
// import { CalendarIcon } from 'lucide-react'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from '@/components/ui/hover-card'
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import placeholder from "../assets/images/placeholder.svg";
import { ChangeEvent, useState, useRef } from "react";
import { Textarea } from "./ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AddItem() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="rounded-full h-15 w-15 z-20">
            <Add className="!w-10 !h-10 stroke-white" />
          </Button>
        </DialogTrigger>
        <DialogContent
          onInteractOutside={(e) => e.preventDefault()}
          className="bg-transparent shadow-none border-none !z-2000 md:!w-[80vw] md:!max-w-350 flex flex-col gap-2 py-1 px-4 max-h-[95vh]"
        >
          <DialogClose asChild>
            <Button className="rounded-full m-0 p-0 w-8.5 h-8.5 ml-auto">
              <CloseCircle className="!w-8 !h-8 stroke-white" />
            </Button>
          </DialogClose>
          <AddItemForm />
        </DialogContent>
      </form>
    </Dialog>
  );
}

const itemCategories = [
  {
    value: "electronics",
    label: "Electronics",
  },
  {
    value: "furniture",
    label: "Furniture",
  },
  {
    value: "clothing",
    label: "Clothing",
  },
  {
    value: "books",
    label: "Books",
  },
  {
    value: "toys",
    label: "Toys & Games",
  },
  {
    value: "sports",
    label: "Sports & Outdoors",
  },
  {
    value: "beauty",
    label: "Beauty & Personal Care",
  },
  {
    value: "automotive",
    label: "Automotive",
  },
];

const itemTags = [
  { value: "new", label: "New", color: "bg-rose-500" },
  { value: "sale", label: "Sale", color: "bg-purple-500" },
  { value: "handmade", label: "Handmade", color: "bg-cyan-500" },
  { value: "popular", label: "Popular", color: "bg-indigo-600" },
  { value: "best-seller", label: "Best Seller", color: "bg-slate-600" },
  { value: "on-demand", label: "On Demand", color: "bg-red-500" },
  {
    value: "limited-edition",
    label: "Limited Edition",
    color: "bg-lime-800",
  },
  { value: "refurbished", label: "Refurbished", color: "bg-teal-600" },
  { value: "eco-friendly", label: "Eco-Friendly", color: "bg-lime-500" },
  { value: "free-shipping", label: "Free Shipping", color: "bg-yellow-500" },
];

export interface takaProduct {
  name: String;
  description: String;
  category: String;
  price: Number;
  address: String;
  negotiable: boolean;
  images: String;
}

export function AddItemForm() {
  const [files, setFiles] = useState<File[]>([]);
  // const [filenames, setFilenames] = useState<String[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [tags, setTags] = useState<String[]>([]);
  const [isNegotiable, setIsNegotiable] = useState(false);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      var newFilenames: String[] = [];
      for (var i = 0; i < newFiles.length; i++) {
        newFilenames.push(newFiles[i].name);
      }
      setFiles((prev) => [...prev, ...newFiles]);
      // setFilenames((prev) => [...prev, ...newFilenames]);
    }
  }

  function updateTags(label: string) {
    if (!tags.includes(label) && tags.length < 4) {
      // Add tag
      setTags((prev) => [...prev, label]);
    } else if (tags.includes(label)) {
      // Remove tag
      setTags((prev) => prev.filter((t) => t !== label));
    }
  }

  function handleUploadClick() {
    fileInputRef.current?.click();
  }

  return (
    <Card className="h-fit overflow-hidden overflow-y-scroll border-primary">
      <CardContent className="grid p-0 md:grid-cols-2">
        <form className="p-5 md:p-8 pt-0 md:pt-0">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <h1 className="text-xl font-bold">New Item</h1>
              <p className="text-balance text-muted-foreground">
                Add new item to taka marketplace
              </p>
            </div>
            <div className="flex flex-col gap-5 w-full">
              {/* image previews */}
              {files.length > 0 && (
                <div className="flex items-center gap-2 h-fit w-full overflow-hidden overflow-x-scroll">
                  {files.map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="rounded-md object-cover w-15 aspect-square"
                    />
                  ))}
                </div>
              )}

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={files.length >= 5}
              />

              {/* Upload Button / Icon */}
              {files.length < 5 && (
                <div
                  onClick={handleUploadClick}
                  className="flex flex-col items-center justify-center border-2 border-dashed border-primary rounded-md p-6 cursor-pointer hover:bg-primary/5 max-w-60"
                >
                  <div className="m-0 p-2 w-fit h-fit bg-primary rounded-sm flex items-center justify-center">
                    <GalleryAdd className="!w-7 !h-7 stroke-white" />
                  </div>
                  <span className="text-sm mt-2 text-primary font-medium">
                    Upload {5 - files.length} more
                  </span>
                </div>
              )}

              {/* Label */}
              <Label className="text-sm text-muted-foreground text-center">
                Max 5 images. First image will be the cover photo.
              </Label>
            </div>

            {/* item name */}
            <div className="grid gap-2">
              <Label htmlFor="text" className="font-bold">
                Name
              </Label>
              <Input id="name" type="text" placeholder="" required />
            </div>

            {/* item description */}
            <div className="grid gap-2">
              <Label htmlFor="text" className="font-bold">
                Description
              </Label>
              <Textarea
                rows={3}
                id="desc"
                placeholder="Add a description"
                required
              />
            </div>
            {/* price and discount */}
            <div className="flex items-center justify-between gap-5">
              <div className="grid gap-2 flex-1">
                <Label htmlFor="text" className="font-bold">
                  Price
                </Label>
                <div className="relative">
                  <BadgeDollarSign className="absolute left-2 top-2 h-5 w-5 stroke-muted-foreground/70" />
                  <Separator
                    orientation="vertical"
                    className="!h-full absolute left-8"
                  />
                  <Input
                    id="name"
                    type="number"
                    required
                    placeholder="0.00"
                    className="pl-10 font-medium"
                  />
                </div>
              </div>
              <div className="grid gap-2 flex-1">
                <Label htmlFor="text" className="font-bold">
                  Discount
                </Label>
                <div className="relative">
                  <Percent className="absolute left-2 top-3 h-4 w-4 stroke-muted-foreground/70 fill-muted-foreground/70" />
                  <Separator
                    orientation="vertical"
                    className="!h-full absolute left-8"
                  />
                  <Input
                    id="name"
                    type="number"
                    required
                    placeholder="0.00"
                    className="pl-10 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Is negotiable and category */}
            <div className="flex items-center justify-between gap-5">
              <div className="grid gap-2 flex-1">
                <Label htmlFor="text" className="font-bold">
                  Negotiable
                </Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-5">
                      <span>{isNegotiable ? "Yes" : "No"}</span>
                      <ArrowDown2 className="stroke-black"/>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 z-2000" align="start">
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => setIsNegotiable(true)}>
                        Yes
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setIsNegotiable(false)}>
                        No
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* category */}
              <div className="grid gap-2 flex-1">
                <Label htmlFor="text" className="font-bold">
                  Category
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="justify-between"
                    >
                      <span className="truncate w-10 sm:w-25 md:w-30 lg:w-50 flex items-center">
                        {value
                          ? itemCategories.find(
                              (category) => category.value === value
                            )?.label
                          : "Select Category"}
                      </span>

                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="max-w-60 p-0 z-2000">
                    <Command>
                      <CommandInput
                        placeholder="Search category..."
                        className="h-9"
                      />
                      <CommandList
                        className="overflow-y-scroll max-h-40 md:max-h-60 CommandList"
                        style={{
                          WebkitOverflowScrolling: "touch",
                          touchAction: "auto",
                        }}
                      >
                        <CommandEmpty>Category not found.</CommandEmpty>
                        <CommandGroup>
                          {itemCategories.map((category) => (
                            <CommandItem
                              key={category.value}
                              value={category.value}
                              onSelect={(currentValue) => {
                                setValue(
                                  currentValue === value ? "" : currentValue
                                );
                                setOpen(false);
                              }}
                            >
                              {category.label}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  value === category.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="text" className="font-bold">
                  Tags
                </Label>
                <span className="text-xs text-rose-500">
                  {4 - tags.length} left
                </span>
              </div>
              <div className="dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border bg-transparent p-3 shadow-xs outline-none flex-col gap-1">
                <div className="flex flex-wrap gap-1">
                  {itemTags.map((tag, index) => (
                    <Button
                      key={index}
                      type="button"
                      className={`p-1.5 px-2.5 sm:!px-4 h-fit text-xs !rounded-full flex items-center gap-0.5 hover:cursor-pointer ${tag.color} hover:${tag.color}/75`}
                      onClick={() => updateTags(tag.label)}
                    >
                      <span>{tag.label}</span>
                      {tags.find((value) => value === tag.label) && <Check />}
                    </Button>
                  ))}
                </div>
                <Separator orientation="horizontal" className="!w-full mt-2" />
              </div>
            </div>
            <Button type="submit" className="w-full font-semibold text-md">
              Add Item
            </Button>
            {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div> */}
          </div>
        </form>
        <div className="relative hidden bg-muted md:block">
          <img
            src={placeholder}
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </CardContent>
    </Card>
  );
}
