import { z } from "zod";

export const UserFormValidation = z
  .object({
    firstName: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 15 characters"),
    lastName: z
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
    institution: z
      .enum(["ins1", "ins2", "ins3"],{
        errorMap: () => ({ message: "Institution is required" }),
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
