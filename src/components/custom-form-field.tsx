import { Input } from "@/components/ui/input";
import { Eye, EyeSlash, type Icon } from "iconsax-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface TextFieldProps {
  FieldIcon: Icon;
  type: string;
}

export function CustomTextField({ FieldIcon, type }: TextFieldProps) {
  const [hiddenText, setHiddenText] = useState<boolean>(true);
  return (
    <div className="relative">
      <FieldIcon
        variant="Linear"
        className="w-5 h-5 stroke-secondary absolute top-2 left-2"
      />
      <Input
        type={type}
        placeholder={type.toUpperCase()}
        className="!bg-transparent rounded-sm border-secondary w-75 px-10 text-secondary placeholder:text-secondary text-sm focus:!outline-none focus:!ring-0"
      />
      {type === "password" && (
        <Button
          onClick={() => setHiddenText(!hiddenText)}
          variant="outline"
          className="absolute top-0 right-0 bg-transparent group border-none"
        >
          {hiddenText ? (
            <Eye
              variant="Linear"
              className="w-5 h-5 stroke-secondary group-hover:stroke-primary "
            />
          ) : (
            <EyeSlash
              variant="Linear"
              className="w-5 h-5 stroke-secondary group-hover:stroke-primary "
            />
          )}
        </Button>
      )}
    </div>
  );
}
