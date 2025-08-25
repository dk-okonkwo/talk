import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { FormFieldType } from "@/lib/types";
import { Eye, EyeOff } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: React.ReactNode;
  type?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ props, field }: { props: CustomProps; field: any }) => {
  const { fieldType, icon, children, renderSkeleton } = props;

  const showPasswordRef = React.useRef(false);
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    showPasswordRef.current = !showPasswordRef.current;
    // Force re-render
    field.onChange(field.value);
  };

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex px-2 items-center py-1 bg-[#EDEFF2] border focus-within:border-black/50 rounded-sm text-sm  ">
          <div className=" *:size-5 opacity-50">{icon}</div>
          <FormControl className="flex justify-between items-center">
            <Input
              className="border-none shadow-none focus-visible:ring-0"
              type={(showPassword && "text") || props.type || "text"}
              {...field}
              placeholder={props.placeholder}
            />
          </FormControl>
          {props.type === "password" && (
            <button
              type="button"
              onClick={() => {
                toggleShowPassword();
                setShowPassword(showPasswordRef.current);
              }}
              className="*:size-4 "
            >
              {showPasswordRef.current ? <EyeOff /> : <Eye />}
            </button>
          )}
        </div>
      );

    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="ml-1 flex items-center gap-2 justify-start ">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label
              className="text-sm text-pretty text-start "
              htmlFor={props.name}
            >
              {props.label}
            </label>
          </div>
        </FormControl>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="NG"
            international
            value={field.value}
            onChange={field.onChange}
            countryCallingCodeEditable
            className="bg-[#EDEFF2] border focus-within:border-black/50 px-3 py-2.5  rounded-lg  [&_.PhoneInputCountrySelect]:rounded-lg [&_.PhoneInputCountrySelect]:bg-[#222] [&_.PhoneInputCountrySelect]:text-white"
          />
        </FormControl>
      );

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className=" w-full  text-sm flex justify-start bg-[#EDEFF2] focus-within:border-black/50">
              <div className="ml-2 *:size-5  ">{icon}</div>
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent className="border-black/20">
              {children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            className="h-24 bg-[#EDEFF2] border focus-within:border-black/50 rounded-sm text-sm"
            {...field}
          />
        </FormControl>
      );

    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;

    default:
      return null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, name, label } = props;
  return (
    <div className="space-y-1.5">
      {props.fieldType !== FormFieldType.CHECKBOX && <Label>{label}</Label>}
      <FormField
        control={control as any}
        name={name}
        render={({ field }) => (
          <FormItem className="flex-1">
            <RenderField field={field} props={props} />
            <FormMessage className="text-start" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CustomFormField;
