import { z } from "zod";

export const SexEnum = z.enum(["FEMALE", "MALE", "OTHER"]);

export const imageUrlSchema = z
  .string()
  .optional()
  .refine(
    (url) =>
      !url ||
      url.includes("images.unsplash.com") ||
      url.includes("images.pexels.com"),
    {
      message:
        "Image URL must be from images.unsplash.com or images.pexels.com",
    }
  );

export const SignUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  sex: SexEnum,
  address: z.string().optional(),
  bio: z.string().optional(),
  phoneNumber: z.string().optional(),
  imageUrl: imageUrlSchema,
});
