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
    registrationNumber: z
      .string()
      .min(3, "Registration Number must be at least 3 character")
      .max(30, "Registration Number must be at most 30 characters"),
    password: z.string().min(8, "Password must be at least 8 characters").max(20, "Password must be at most 20 characters"),
    confirmPassword: z.string(),
    termsConditionsConsent: z
      .boolean()
      .refine((value) => value === true, {
        message: "You must consent to treatment in order to proceed",
      }),
  })

export type UserFormValues = z.infer<typeof UserFormValidation>;
