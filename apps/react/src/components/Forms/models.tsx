import { z } from "zod";

export const linkCreationSchema = z.object({
  url: z
    .string()
    .min(1, "URL is required")
    .max(2000, "URL should be between 1 and 200 characters")
    .url({
      message: "Please enter a valid URL. It should start with https://.",
    }),
  slug: z
    .string()
    .min(3, "Slug should be between 3 and 24 characters")
    .max(24, "Slug should be between 3 and 24 characters")
    .refine((value) => /^[a-zA-Z0-9-_]+$/.test(value), {
      message: "Slug can only contain alphanumeric characters, '-' and '_'",
    }),
  description: z
    .string()
    .max(500, "Description should be between 1 and 500 characters")
    .optional(),
});

export type LinkCreationData = z.infer<typeof linkCreationSchema>;

export const linkCreationDefaultValues: LinkCreationData = {
  url: "",
  slug: "",
  description: "",
};

export const editLinkSchema = z.object({
  url: z
    .string()
    .min(1, "URL is required")
    .max(2000, "URL should be between 1 and 200 characters")
    .url({
      message: "Please enter a valid URL. It should start with https://.",
    }),
  description: z
    .string()
    .max(500, "Description should be between 1 and 500 characters")
    .optional(),
});

export type EditLinkData = z.infer<typeof editLinkSchema>;
