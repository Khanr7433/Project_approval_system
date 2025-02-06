import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  synopsis: z.any().refine((file) => file instanceof File, {
    message: "Synopsis is required",
  }),
});
