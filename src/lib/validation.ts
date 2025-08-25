import { z } from "zod";

export const UserFormValidation = z
  .object({
    first_name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 15 characters"),
    last_name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 15 characters"),
    phone: z
      .string()
      .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
    email: z.string().email("Invalid email address"),
    gender: z.enum(["male", "female", "other"],{
      errorMap: () => ({ message: "Gender is required" }),
    }),
    level: z.enum(["100", "200", "300", "400", "500", "graduate"],{
        errorMap: () => ({ message: "Institution is required" }),
      }),
    // institution: z.enum(["institute 1", "institute 2", "institute 3", "institute 4"],{
    //     errorMap: () => ({ message: "Institution is required" }),
    //   }),
    institution: z.string().min(2, "Institution must be at least 2 characters").max(50, "Institution must be at most 50 characters"),
    state: z.string().min(2, "State must be at least 2 characters"),
    isStudent: z.enum(["Yes", "No"],{
        errorMap: () => ({ message: "Consent is required" }),
      }),

    policy:z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
    password: z.string().min(8, "Password must be at least 8 characters").max(20, "Password must be at most 20 characters"),
    confirmPassword: z.string(),
   
  })

export const UserSignInFormValidation = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters").max(20, "Password must be at most 20 characters"),
    rememberMeConsent: z.boolean()
  })


  
export const UserPostFormValidation = z
  .object({
    category: z.enum(["products", "services", "taka"], {
      errorMap: () => ({ message: "Category is required" }),
    }),
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 15 characters"),
    price: z
      .string()
      .min(2, "Price must be at least 2 characters")
      .max(50, "Price must be at most 15 characters"),
    negotiable:z.boolean(),
    primaryImage: z.custom<File[]>(),
    secondaryImage: z.custom<File[]>(),
    description: z
      .string()
      .min(2, "Description must be at least 2 characters")
      .max(50, "Description must be at most 15 characters"),
    discount: z
      .string()
      .min(1, "Discount must be at least 1 characters")
      .max(2, "Discount must be at most 2 characters"),
  })
