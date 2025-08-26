"use client";

import { useState, useRef, useEffect } from "react";
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
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "./ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { toast, Toaster } from "sonner";
import Cookies from "js-cookie";

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
  name: string;
  description: string;
  category: string;
  price: Number;
  discount: string;
  negotiable: boolean;
  primaryImage?: File | null;
  tags?: string[];
  images: string[];
}

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
          className="bg-transparent shadow-none border-none !z-2000 !w-[99w] md:!w-[50vw] md:!max-w-350 flex flex-col gap-2 py-1 px-4 !max-h-[95vh]"
        >
          <DialogClose asChild>
            <Button className="rounded-full m-0 p-0 w-8.5 h-8.5 ml-auto flex items-center justify-center">
              <CloseCircle className="!w-8 !h-8 stroke-white" />
            </Button>
          </DialogClose>
          <AddItemForm />
          <Toaster />
        </DialogContent>
      </form>
    </Dialog>
  );
}

export function AddItemForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");
  const [commandInputValue, setCommandInputValue] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [imageNames, setImageNames] = useState<string[]>([]);

  //form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [discount, setDiscount] = useState<number | "">("");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const picked = Array.from(e.target.files);
    const allowed = 5 - files.length;
    const toAdd = picked.slice(0, allowed);

    if (toAdd.length === 0) {
      // optionally notify user
      e.currentTarget.value = "";
      return;
    }

    setFiles((prev) => [...prev, ...toAdd]);

    // append filenames in the same order
    setImageNames((prev) => [...prev, ...toAdd.map((f) => f.name)]);
    // reset input value so the same file can be picked again if removed
    e.currentTarget.value = "";
  }

  function toggleTag(value: string) {
    setTags((prev) => {
      if (prev.includes(value)) return prev.filter((t) => t !== value);
      if (prev.length >= 4) return prev;
      return [...prev, value];
    });
  }

  function removeFile(index: number) {
    // revoke preview URL for the removed file (if available)
    const removedPreview = previews[index];
    if (removedPreview) {
      try {
        URL.revokeObjectURL(removedPreview);
      } catch {
        // ignore
      }
    }

    // remove file and corresponding image name
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setImageNames((prev) => prev.filter((_, i) => i !== index));
  }

  function handleUploadClick() {
    fileInputRef.current?.click();
  }

  // create object URLs whenever files change
  useEffect(() => {
    // revoke previous previews by revoking the URLs created in previous effect cleanup
    const objectUrls = files.map((f) => URL.createObjectURL(f));
    setPreviews(objectUrls);

    return () => {
      objectUrls.forEach((u) => {
        try {
          URL.revokeObjectURL(u);
        } catch {
          // ignore
        }
      });
    };
  }, [files]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // basic validation
    if (!name.trim()) return alert("Name is required");
    if (!categoryValue) return alert("Select a category");
    if (!price || Number(price) <= 0) return alert("Enter a valid price");
    if (files.length === 0) return alert("Add at least one image");

    const product: takaProduct = {
      name: name.trim(),
      description: description.trim(),
      category: categoryValue,
      price: Number(price),
      discount: String(discount) || "0",
      negotiable: isNegotiable,
      primaryImage: files[0],
      tags,
      images: imageNames,
    };

    // build FormData to send files
    const fd = new FormData();
    fd.append("name", product.name);
    fd.append("description", product.description);
    fd.append("category", product.category);
    fd.append("tag", String(product.tags![0] ?? ""));
    fd.append("price", String(product.price));
    fd.append("discount", String(product.discount));
    fd.append("negotiable", String(product.negotiable));
    // imageNames.forEach((name, i) => {
    //   fd.append(`upload_images[${i}]`, name);
    // });
    // imageNames.forEach((i) => fd.append("upload_images", i));
    files.forEach((file) => {
      fd.append("upload_images", file, file.name);
    });

    // if (product.primaryImage instanceof File) {
    //   fd.append(
    //     "primary_image",
    //     product.primaryImage,
    //     product.primaryImage.name
    //   );
    // }
    // files.forEach((file) => fd.append("upload_images", file)); // backend must accept multiple files

    // ensure we don't accidentally send a service_provider value
    fd.delete("service_provider");

    for (const [k, v] of fd.entries()) {
      console.log("Form Data entry:", k, v);
    }

    const token = Cookies.get("access_token");
    // TODO: remove this console.log if it works
    console.log("fetched token:", token);
    const config: any = { withCredentials: true };

    // if your backend expects Authorization header (JS-stored token)
    if (token) {
      config.headers = { Authorization: `Bearer ${token}` };
    }

    try {
      setIsAdding(true);
      const datares = await axios.post(
        "https://talk-l955.onrender.com/api/v1/products/taka/create-product/",
        fd,
        config
      );
      // success UI: clear form
      if (datares.status === 201 || datares.status === 200) {
        setName("");
        setDescription("");
        setCategoryValue("");
        setPrice("");
        setDiscount("");
        setTags([]);
        setFiles([]);
        setImageNames([]);
        toast("Success!", {
          description: "Item added",
        });
      }
    } catch (err: any) {
      console.error(err);
      console.log("New error:", err.response?.status, err.response?.data);
      toast("Upload failed!", {
        description: err?.response?.data?.message ?? "",
      });
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <Card className="h-[80vh] md:h-fit overflow-hidden overflow-y-scroll border-primary">
      <CardContent className="grid p-0">
        <form onSubmit={onSubmit} className="p-5 md:p-8 pt-0 md:pt-0">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <h1 className="text-xl font-bold">New Item</h1>
              <p className="text-balance text-muted-foreground">
                Add new item to taka marketplace
              </p>
            </div>
            <div className="flex flex-col gap-5 w-full">
              {/* image previews */}
              {previews.length > 0 && (
                <div className="flex items-center gap-2 h-fit w-full overflow-hidden overflow-x-scroll">
                  {previews.map((src, index) => (
                    <div className="flex flex-col" key={index}>
                      <Button
                        variant="outline"
                        className="w-4.5 h-4.5 !p-0 self-end rounded-full"
                        onClick={() => removeFile(index)}
                      >
                        <CloseCircle className="!w-4 !h-4 stroke-gray-600" />
                      </Button>
                      <img
                        src={src}
                        alt={`preview-${index}`}
                        className="rounded-md object-cover w-15 aspect-square"
                      />
                    </div>
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
              <Input
                id="name"
                type="text"
                placeholder=""
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(e.target.value)
                }
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
                    value={price}
                    onChange={(e) =>
                      setPrice(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
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
                    value={discount}
                    onChange={(e) =>
                      setDiscount(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                  />
                </div>
              </div>
            </div>

            {/* Is negotiable + category */}
            <div className="flex items-center justify-between gap-5">
              <div className="grid gap-2 flex-1">
                <Label htmlFor="text" className="font-bold">
                  Negotiable
                </Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-5"
                    >
                      <span>{isNegotiable ? "Yes" : "No"}</span>
                      <ArrowDown2 className="stroke-black" />
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
                        {categoryValue
                          ? itemCategories.find(
                              (c) => c.value === categoryValue
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
                        value={commandInputValue}
                        onValueChange={(val: string) =>
                          setCommandInputValue(val)
                        }
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
                          {itemCategories
                            .filter((c) =>
                              c.label
                                .toLowerCase()
                                .includes(commandInputValue.toLowerCase())
                            )
                            .map((category) => (
                              <CommandItem
                                key={category.value}
                                value={category.value}
                                onSelect={(v) => {
                                  setCategoryValue(v);
                                  setOpen(false);
                                }}
                              >
                                {category.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    categoryValue === category.value
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
            {/* tags */}
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
                <div className="flex flex-wrap gap-2">
                  {itemTags.map((tag, index) => (
                    <Button
                      key={index}
                      type="button"
                      onClick={() => toggleTag(tag.value)}
                      className={cn(
                        `p-1.5 px-2.5 sm:!px-4 h-fit text-xs !rounded-full flex items-center gap-0.5 hover:cursor-pointer ${tag.color} hover:${tag.color}/45`,
                        tag.color,
                        tags.includes(tag.value)
                          ? "ring-1 ring-offset-1 ring-primary"
                          : "opacity-90"
                      )}
                    >
                      <span>{tag.label}</span>
                      {tags.includes(tag.value) && <Check />}
                    </Button>
                  ))}
                </div>
                <Separator orientation="horizontal" className="!w-full mt-2" />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full font-semibold text-md hover:cursor-pointer"
              disabled={isAdding}
            >
              {isAdding ? "Adding Item..." : "Add Item"}
            </Button>
            <Toaster />
            {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div> */}
          </div>
        </form>
        {/* <div className="relative hidden bg-muted md:block">
          <img
            src={placeholder}
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div> */}
      </CardContent>
    </Card>
  );
}
