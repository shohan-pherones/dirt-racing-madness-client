import { z } from "zod";
import { imageUrlSchema } from "./signUpSchema";

export const CreateEventSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: imageUrlSchema,
  dateTime: z.string(),
  location: z.string().min(1, "Location is required"),
  capacity: z.coerce
    .number()
    .int()
    .min(1, "Capacity must be a positive integer"),
});
