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
    university: z.string().min(2, "Institution must be at least 2 characters"),
    state: z.string().min(2, "State must be at least 2 characters"),
    registration_number: z
      .string()
      .min(2, "Registration number must be at least 2 characters"),

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
