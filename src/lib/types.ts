export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA='textarea',
  PHONE_INPUT='phoneInput',
  CHECKBOX='checkbox',
  DATE_PICKER='datePicker',
  SELECT='select',
  SKELETON='skeleton'
}

export type ProductType = {
  approved: boolean;
  category: string;
  created: string;
  created_by: string;
  description: string;
  discount: string;
  id: string;
  images: string[];
  name: string;
  price: string;
  reviews: any[];
  slug: string;
  tag: string;
  updated: string;
  videos: any[];
};