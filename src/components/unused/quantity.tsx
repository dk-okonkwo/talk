"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Add, Minus } from "iconsax-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const [quantity, setQuantity] = useState(1);

function onClick(adjustment: number) {
  setQuantity(Math.max(1, Math.min(100, quantity + adjustment)));
}

<div className="grid gap-2 flex-1">
  <Label htmlFor="text" className="font-bold">
    Quantity
  </Label>
  <div className="relative">
    <Button
      size="icon"
      className="absolute left-0 top-0.5 h-8 w-8 bg-transparent shrink-0 rounded-full shadow-none hover:bg-transparent"
      onClick={() => onClick(-1)}
      onDoubleClick={() => onClick(-10)}
      disabled={quantity <= 1}
      type="button"
    >
      <Minus className=" h-4 w-4 stroke-muted-foreground/70" />
    </Button>
    <Separator orientation="vertical" className="!h-full absolute left-8" />
    <Input
      id="name"
      type="number"
      required
      placeholder=""
      className="text-center no-spinner font-medium"
      value={quantity}
      onChange={(e) =>
        setQuantity(Number(e.target.value) > 100 ? 100 : Number(e.target.value))
      }
    />
    <Button
      size="icon"
      className="absolute right-0 top-0.5 h-8 w-8 bg-transparent shadow-none shrink-0 rounded-full hover:bg-transparent"
      onClick={() => onClick(1)}
      onDoubleClick={() => onClick(10)}
      disabled={quantity >= 100}
      type="button"
    >
      <Add className=" h-4 w-4 stroke-muted-foreground" />
    </Button>
    <Separator
      orientation="vertical"
      className="!h-full absolute right-8 top-0"
    />
  </div>
</div>;
