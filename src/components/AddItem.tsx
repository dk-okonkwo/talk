"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
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
import { CloseCircle, Add, ArrowDown2, DocumentUpload } from "iconsax-react";
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
import { useRouterState } from "@tanstack/react-router";
import { Product } from "@/lib/constants";
import { ImageSelector } from "./ImageSelector";

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
          className="bg-transparent shadow-none border-none !z-2000 !w-screen md:!w-[50vw] md:!max-w-350 flex flex-col gap-2 py-1 px-0 !max-h-[95vh]"
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
  // set url based on current route
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const urlOptions = {
    products:
      "https://talk-l955.onrender.com/api/v1/products/marketplace/create-product/",
    taka: "https://talk-l955.onrender.com/api/v1/products/taka/create-product/",
  };

  const mainUrl =
    pathname === "/market/products" ? urlOptions.products : urlOptions.taka;

  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const filesInputRef = useRef<HTMLInputElement>(null);

  // image files
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  // previews
  const [thumbnailPreview, setThumbnailPreview] = useState<
    string | undefined
  >();
  const [previews, setPreviews] = useState<string[]>([]);

  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");
  const [commandInputValue, setCommandInputValue] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  //form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [discount, setDiscount] = useState<number | "">("");

  function handleThumbnailChange(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    // revoke previous thumbnail preview if any
    if (thumbnailPreview) {
      try {
        URL.revokeObjectURL(thumbnailPreview);
      } catch {}
    }
    setThumbnail(f);
    e.currentTarget.value = "";
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const picked = Array.from(e.target.files);
    const allowed = 4 - files.length;
    const toAdd = picked.slice(0, allowed);

    if (toAdd.length === 0) {
      e.currentTarget.value = "";
      return;
    }

    setFiles((prev) => [...prev, ...toAdd]);
    e.currentTarget.value = "";
  }

  function toggleTag(value: string) {
    setTags((prev) => {
      if (prev.includes(value)) return prev.filter((t) => t !== value);
      if (prev.length >= 4) return prev;
      return [...prev, value];
    });
  }

  function handleUploadClick(kind: "thumbnail" | "files") {
    if (kind === "thumbnail") thumbnailInputRef.current?.click();
    else filesInputRef.current?.click();
  }

  function removeFile(index: number) {
    const removedPreview = previews[index];
    if (removedPreview) {
      try {
        URL.revokeObjectURL(removedPreview);
      } catch {}
    }
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  useEffect(() => {
    if (!thumbnail) return;

    const objectUrl = URL.createObjectURL(thumbnail);
    setThumbnailPreview(objectUrl);

    return () => {
      try {
        URL.revokeObjectURL(objectUrl);
      } catch {}
    };
  }, [thumbnail]);

  useEffect(() => {
    // create previews for other images
    const objectUrls = files.map((f) => URL.createObjectURL(f));
    setPreviews(objectUrls);

    return () => {
      objectUrls.forEach((u) => {
        try {
          URL.revokeObjectURL(u);
        } catch {}
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
    if (!thumbnail && files.length === 0)
      return alert("Add at least one image");

    const images = [];
    if (thumbnail) images.push(thumbnail);
    images.push(...files);

    const newProduct: Product = {
      name: name.trim(),
      description: description.trim(),
      category: categoryValue,
      price: Number(price),
      discount: String(discount) || "0",
      negotiable: isNegotiable,
      tags,
      images,
    };

    // build FormData to send files
    const fd = new FormData();
    fd.append("name", newProduct.name);
    fd.append("description", newProduct.description);
    fd.append("category", newProduct.category);
    fd.append("tag", String(newProduct.tags![0] ?? ""));
    fd.append("price", String(newProduct.price));
    fd.append("discount", String(newProduct.discount));
    fd.append("negotiable", String(newProduct.negotiable));
    newProduct.images.forEach((file) => {
      fd.append("upload_images", file, file.name);
    });

    // ensure we don't accidentally send a service_provider value
    fd.delete("service_provider");

    const token = Cookies.get("access_token");
    const config: any = { withCredentials: true };
    if (token) {
      config.headers = { Authorization: `Bearer ${token}` };
    }

    try {
      setIsAdding(true);
      const datares = await axios.post(mainUrl, fd, config);
      // success UI: clear form
      if (datares.status === 201 || datares.status === 200) {
        // revoke previews & clear
        if (thumbnailPreview) {
          try {
            URL.revokeObjectURL(thumbnailPreview);
          } catch {}
        }
        previews.forEach((p) => {
          try {
            URL.revokeObjectURL(p);
          } catch {}
        });

        setName("");
        setDescription("");
        setCategoryValue("");
        setPrice("");
        setDiscount("");
        setTags([]);
        setFiles([]);
        setThumbnail(null);
        setThumbnailPreview(undefined);
        setPreviews([]);

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

  //

  return (
    <Card className="h-[80vh] md:h-fit overflow-hidden overflow-y-scroll border-primary !px-0">
      <CardContent className="grid p-0">
        <form onSubmit={onSubmit} className="p-0 md:p-8 md:pt-0">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col mx-4">
              <h1 className="text-xl font-bold">New Item</h1>
              <p className="text-balance text-muted-foreground">
                Add new item to taka marketplace
              </p>
            </div>

            {/* item name */}
            <div className="grid gap-2 mx-4">
              <Label htmlFor="text" className="font-bold">
                Name
              </Label>
              <Input
                className="bg-secondary"
                id="name"
                type="text"
                placeholder=""
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* item description */}
            <div className="grid gap-2 mx-4">
              <Label htmlFor="text" className="font-bold">
                Description
              </Label>
              <Textarea
                rows={3}
                id="desc"
                placeholder="Add a description"
                className="bg-secondary"
                required
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(e.target.value)
                }
              />
            </div>
            {/* price and discount */}
            <div className="flex items-center justify-between gap-5 mx-4">
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
                    className="pl-10 font-medium bg-secondary"
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
                    className="pl-10 font-medium bg-secondary"
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
            <div className="flex items-center justify-between gap-5 mx-4">
              <div className="grid gap-2 flex-1">
                <Label htmlFor="text" className="font-bold">
                  Negotiable
                </Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-5 bg-secondary"
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
                      className="justify-between bg-secondary"
                    >
                      <span className="truncate w-25 md:w-30 lg:w-50 flex items-center">
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
            <div className="grid gap-2 mx-4">
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

            {/* Upload item images */}
            <div className="flex flex-col gap-5 w-full ">
              <div className="flex flex-col md:flex-row items-center gap-2 w-full px-2 md:gap-1 md:items-start md:justify-between">
                <div className="w-full flex flex-col gap-1 items-center">
                  {/* Thumbnail: 1 image Hidden file input */}
                  <span className="w-4/5">Thumbnail Image</span>
                  <input
                    type="file"
                    ref={thumbnailInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleThumbnailChange}
                  />

                  {/* Upload Button / Icon */}
                  <div
                    onClick={() => handleUploadClick("thumbnail")}
                    className="flex flex-col items-center justify-center rounded-md p-6 cursor-pointer bg-secondary hover:bg-primary/5 w-4/5 aspect-square"
                  >
                    {thumbnailPreview ? (
                      <img
                        src={thumbnailPreview}
                        alt="thumbnail preview"
                        className="rounded-md object-cover w-full aspect-square"
                      />
                    ) : (
                      <>
                        <DocumentUpload
                          variant="Bold"
                          className="!w-15 !h-15 fill-primary"
                        />
                        <span className="text-sm mt-2 text-primary font-medium">
                          Click to upload Thumbnail image
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="w-full flex flex-col gap-1 items-center">
                  {/* other images: 4 images max - Hidden file input */}
                  <span className="w-4/5">Other Images</span>
                  <input
                    type="file"
                    ref={filesInputRef}
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={files.length >= 5}
                  />

                  {/* Upload Button / Icon */}
                  <div
                    className={`flex flex-col items-center pt-3 rounded-md p-1 cursor-pointer bg-secondary hover:bg-primary/5 w-4/5 aspect-square gap-4 md:gap-0 ${previews.length > 0 ? "justify-start" : "justify-center"}`}
                  >
                    {previews.length > 0 ? (
                      <ImageSelector
                        previews={previews}
                        selectorFunction={removeFile}
                      />
                    ) : (
                      <DocumentUpload
                        variant="Bold"
                        className="!w-15 !h-15 fill-primary"
                      />
                    )}

                    <Button
                      type="button"
                      className="text-sm font-medium"
                      onClick={() => handleUploadClick("files")}
                      disabled={files.length > 3}
                    >
                      Click to upload images
                    </Button>
                  </div>

                  {/* Label */}
                  <Label className="text-sm text-muted-foreground text-center">
                    Max. upload of
                    <span className="text-primary font-semibold">
                      {4 - files.length}
                    </span>
                    images.
                  </Label>
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="w-70 self-center font-semibold text-lg hover:cursor-pointer"
              disabled={isAdding}
            >
              {isAdding ? "Adding Item..." : "Add Item"}
            </Button>
            <Toaster />
          </div>
        </form>
      </CardContent>
      <div className="bg-green-50"></div>
    </Card>
  );
}
