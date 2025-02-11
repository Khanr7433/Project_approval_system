import { z } from "zod";

export const projectSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "Title is required" })
    .min(5, { message: "Title should be at least 5 characters long" }),
  description: z
    .string()
    .nonempty({ message: "Description is required" })
    .min(25, { message: "Description should be at least 25 characters long" }),
  teamMembers: z
    .array(z.string().email({ message: "Invalid email" }))
    .max(3, { message: "Max 3 team members are allowed" }),
  synopsis: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Synopsis is required" })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size should be less than 5MB",
    })
    .refine((file) => file.type === "application/pdf", {
      message: "File type should be PDF",
    }),
});
