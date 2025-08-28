import { Categories, UserPostFormDefaultValues } from "@/lib/constants";
import { UserPostFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormField from "./CustomFormField";
import { FormFieldType } from "@/lib/types";
import { Button } from "./ui/button";
import { SelectItem } from "./ui/select";
import { Form, FormControl, FormItem, FormLabel } from "./ui/form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import FileUploader from "./FileUploader";
import { DollarSign, Percent } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "@tanstack/react-router";
import axios from "axios";
import { toast } from "sonner";

const tags = [
  "New",
  "Sale",
  "Handmade",
  "Popular",
  "Best Seller",
  "On Demand",
  "Limited Edition",
  "Refurbished",
  "Eco-Friendly",
  "Free Shipping",
];
const PostForm = ({
  setShowPostPage,
}: {
  setShowPostPage: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<String[]>([]);
  const router = useRouter();
  const form = useForm<z.infer<typeof UserPostFormValidation>>({
    resolver: zodResolver(UserPostFormValidation),
    defaultValues: UserPostFormDefaultValues,
  });

  async function onSubmit(values: z.infer<typeof UserPostFormValidation>) {
    setIsLoading(true);

    try {
      const accessToken = Cookies.get("access_token");
      if (!accessToken) {
        router.navigate({ to: "/login" });
        return;
      }

      const { primaryImage, secondaryImage, ...rest } = values;
      const formData = new FormData();

      // Append primitive fields
      formData.append("category", rest.category);
      formData.append("name", rest.name);
      formData.append("price", String(rest.price));
      formData.append("negotiable", String(rest.negotiable));
      formData.append("description", rest.description);
      formData.append("discount", String(rest.discount));
      formData.append("tag", selectedTags.toString());
      // Append tags (check backend format!)

      // Append images
      const allImages = [...primaryImage, ...secondaryImage];
      if (allImages.length === 0) {
        alert("Please upload at least one image.");
        setIsLoading(false);
        return;
      }
      allImages.forEach((file: File) => {
        formData.append("upload_images", file);
      });

      // Debug what’s actually being sent
      // for (const [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }

      const datares = await axios.post(
        "https://talk-l955.onrender.com/api/v1/products/marketplace/create-product/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (datares.status === 201) {
        toast.success("Post created successfully!");
        setShowPostPage(false);
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          Cookies.remove("access_token");
          router.navigate({ to: "/login" });
        } else {
          console.error(
            `API Error [${status}]:`,
            error.response?.data || error.message
          );
        }
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleTags = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      if (selectedTags.length >= 4) {
        alert("You can only select up to 4 tags.");
        return;
      }
      setSelectedTags([...selectedTags, tag]);
    }
  };
  return (
    <div className="">
      <h1 className="text-xl font-medium mb-4">Fill Post Details</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 max-w-lg flex flex-col justify-between w-full *:w-full "
        >
          <div className="space-y-5">
            <CustomFormField
              control={form.control}
              name="category"
              fieldType={FormFieldType.SELECT}
              placeholder="Category"
            >
              {Categories.map((cat, i) => (
                <SelectItem key={i} value={cat} className="cursor-pointer">
                  <p>{cat}</p>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              control={form.control}
              name="name"
              fieldType={FormFieldType.INPUT}
              placeholder="Enter Post Name"
            />
            <div className="flex gap-4">
              <CustomFormField
                control={form.control}
                name="price"
                fieldType={FormFieldType.INPUT}
                placeholder="Price"
                icon={<DollarSign />}
              />
              <CustomFormField
                control={form.control}
                name="discount"
                fieldType={FormFieldType.INPUT}
                placeholder="Discount"
                icon={<Percent />}
              />
            </div>

            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SKELETON}
              name="negotiable"
              renderSkeleton={(field) => (
                <FormItem className="space-y-3">
                  <FormLabel>Is this price negotiable ?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(val) => field.onChange(val === "true")}
                      value={field.value === true ? "true" : "false"}
                      className="flex flex-col"
                    >
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="true" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            ></CustomFormField>
            <div className="flex items-center gap-6 *:w-1/2 *:p-2 bg-center w-full">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.SKELETON}
                name="primaryImage"
                label="Primary Image"
                renderSkeleton={(field) => (
                  <FormControl>
                    <FileUploader
                      files={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                )}
              />
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.SKELETON}
                name="secondaryImage"
                label="Secondary Images"
                renderSkeleton={(field) => (
                  <FormControl>
                    <FileUploader
                      files={field.value}
                      onChange={field.onChange}
                      multiple
                    />
                  </FormControl>
                )}
              />
            </div>
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="description"
              placeholder="Describe your asset..."
            />
            <div>
              <h3 className="font-medium">Tags</h3>
              <div className="p-2  border rounded-md flex gap-x-2 gap-y-1 flex-wrap font-medium text-sm">
                {tags.map((tag, i) => {
                  let activeTag = false;
                  if (selectedTags.includes(tag)) activeTag = true;
                  return (
                    <div
                      key={i}
                      onClick={() => handleTags(tag)}
                      className={`px-2 py-1 cursor-pointer border ${activeTag ? "bg-main/30" : "bg-main/10"} rounded-lg`}
                    >
                      {tag}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <Button
              disabled={isLoading || selectedTags.length < 1}
              className={
                "text-base py-5 w-full tracking-wide text-white rounded-lg mt-3 bg-main hover:bg-main/90"
              }
            >
              {isLoading ? "Posting..." : "Post"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PostForm;

//  const accessToken = Cookies.get('access_token')

//     if (!accessToken) {
//       router.navigate({ to: '/login' })
//       return
//     }

//     console.log('Sending request...')
//     const {primaryImage,secondaryImage, ...rest}= values

//     const data = { ...rest,upload_images:[...primaryImage,...secondaryImage], tag: selectedTags.toString() };
//     const datares = await axios.post(
//       'https://talk-l955.onrender.com/api/v1/products/marketplace/create-product/',
//       data,
//       {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//       }
//     );

//     console.log("Fetched posts:", datares)
//     return datares.data
//   } catch (error: any) {
