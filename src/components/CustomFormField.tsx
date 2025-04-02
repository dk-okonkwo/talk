import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
// import "react-phone-number-input/style.css";
// import PhoneInput from "react-phone-number-input";
import { Calendar } from "lucide-react";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormFieldType } from "@/lib/types";
// import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
// import { Checkbox } from "./ui/checkbox";

interface FormValues {
  [key: string]: any; // Replace `any` with specific types for stricter typing
}

interface CustomProps {
  control: Control<FormValues>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode; // Adjust field type if necessary
}

const RenderField = ({ props, field }: { props: CustomProps; field: any }) => {
  const { fieldType, iconSrc, iconAlt, dateFormat, showTimeSelect, renderSkeleton, children } =
    props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex border-2 border-gray-800 text-sm rounded-lg bg-gray-900">
          {iconSrc && (
            <img src={iconSrc} alt={iconAlt || "icon"} width={20} height={20} className="ml-2" />
          )}
          <FormControl>
            <Input {...field} className="border-0" />
          </FormControl>
        </div>
      );


    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea className="h-24 bg-gray-900 border-2 border-gray-800 remove-scrollbar" {...field} disabled={props.disabled} />
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
    <FormField
      control={control}
      name={name}
      render={({ field }) => (  
        <FormItem className="flex-1">
           <FormLabel>{label}</FormLabel>
          <RenderField field={field} props={props} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
