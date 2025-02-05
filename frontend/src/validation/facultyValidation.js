import { z } from "zod";

export const facultySchema = z.object({
  fullName: z.string().nonempty("Full Name is required"),
  department: z.enum(
    ["BCA", "BBA-CA"],
    "Department must be one of BCA, BBA-CA"
  ),
  designation: z.enum(
    ["Assistant Professor", "Associate Professor", "Professor"],
    "Designation must be one of Assistant Professor, Associate Professor, Professor"
  ),
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});
