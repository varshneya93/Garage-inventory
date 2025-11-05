import { z } from "zod";
import { Status } from "@prisma/client";

export const createProjectSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(200, "Slug too long")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
  description: z.string().max(500, "Description too long").optional(),
  content: z.string().optional(),
  status: z.nativeEnum(Status).default(Status.DRAFT),
  featured: z.boolean().default(false),
  sortOrder: z.number().int().min(0).default(0),
  publishedAt: z.string().datetime().optional(),
  tags: z.array(z.string()).default([]),
  categories: z.array(z.string()).default([]),
  images: z
    .array(
      z.object({
        url: z.string().url("Invalid image URL"),
        alt: z.string().optional(),
        sortOrder: z.number().int().min(0).default(0),
      })
    )
    .default([]),
});

export const updateProjectSchema = createProjectSchema.partial().omit({ slug: true });

export const projectQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  status: z.nativeEnum(Status).optional(),
  featured: z.coerce.boolean().optional(),
  category: z.string().optional(),
  tag: z.string().optional(),
  search: z.string().optional(),
});

export const createBlogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(200, "Slug too long")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
  excerpt: z.string().max(500, "Excerpt too long").optional(),
  content: z.string().min(1, "Content is required"),
  status: z.nativeEnum(Status).default(Status.DRAFT),
  featured: z.boolean().default(false),
  publishedAt: z.string().datetime().optional(),
  tags: z.array(z.string()).default([]),
  categories: z.array(z.string()).default([]),
});

export const updateBlogPostSchema = createBlogPostSchema.partial().omit({ slug: true });

export const blogQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  status: z.nativeEnum(Status).optional(),
  featured: z.coerce.boolean().optional(),
  category: z.string().optional(),
  tag: z.string().optional(),
  search: z.string().optional(),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  email: z.string().email("Invalid email address"),
  subject: z.string().max(200, "Subject too long").optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message too long"),
});

export const updateInquirySchema = z.object({
  status: z.enum(["NEW", "READ", "RESPONDED", "CLOSED"]),
  response: z.string().min(1, "Response is required").optional(),
});

export const inquiryQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  status: z.enum(["NEW", "READ", "RESPONDED", "CLOSED"]).optional(),
  search: z.string().optional(),
});

// Security-focused validation schemas

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password too long")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character");

export const emailSchema = z
  .string()
  .email("Invalid email address")
  .max(255, "Email too long")
  .transform((email) => email.toLowerCase().trim());

export const urlSchema = z
  .string()
  .url("Invalid URL")
  .max(2048, "URL too long")
  .refine(
    (url) => {
      try {
        const parsed = new URL(url);
        return ['http:', 'https:'].includes(parsed.protocol);
      } catch {
        return false;
      }
    },
    { message: "Only HTTP and HTTPS URLs are allowed" }
  );

export const fileUploadSchema = z.object({
  name: z.string().min(1).max(255),
  type: z.string().refine(
    (type) => {
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
        'image/svg+xml',
      ];
      return allowedTypes.includes(type);
    },
    { message: "Invalid file type" }
  ),
  size: z.number().max(10 * 1024 * 1024, "File size must be less than 10MB"),
});

export const sanitizedStringSchema = z
  .string()
  .transform((str) => str.trim())
  .refine(
    (str) => !/<script|javascript:|on\w+=/i.test(str),
    { message: "Input contains potentially dangerous content" }
  );

export const themeSettingsSchema = z.object({
  name: z.string().min(1).max(100),
  colors: z.record(z.string()),
  fonts: z.object({
    heading: z.string().optional(),
    body: z.string().optional(),
  }).optional(),
  customCss: z.string().max(50000, "Custom CSS too large").optional(),
  isActive: z.boolean().default(false),
});

export const integrationConfigSchema = z.object({
  github: z.object({
    username: z.string().optional(),
    token: z.string().optional(),
  }).optional(),
  twitter: z.object({
    username: z.string().optional(),
    bearerToken: z.string().optional(),
  }).optional(),
  linkedin: z.object({
    profileId: z.string().optional(),
    accessToken: z.string().optional(),
  }).optional(),
  analytics: z.object({
    googleAnalyticsId: z.string().optional(),
    plausibleDomain: z.string().optional(),
  }).optional(),
});
