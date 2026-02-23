import { z } from 'zod';

// Contact form validation schema
export const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" })
    .regex(/^[a-zA-Z\s\-'\.]+$/, { message: "Name contains invalid characters" }),
  
  email: z.string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  
  phone: z.string()
    .trim()
    .optional()
    .refine((val) => !val || /^[\+]?[0-9\s\-\(\)]{7,20}$/.test(val), {
      message: "Please enter a valid phone number"
    }),
  
  department: z.string()
    .trim()
    .optional(),
  
  subject: z.string()
    .trim()
    .min(1, { message: "Subject is required" })
    .max(200, { message: "Subject must be less than 200 characters" }),
  
  message: z.string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(2000, { message: "Message must be less than 2000 characters" })
});

// News article validation schema
export const newsSchema = z.object({
  title: z.string()
    .trim()
    .min(1, { message: "Title is required" })
    .max(200, { message: "Title must be less than 200 characters" }),
  
  content: z.string()
    .trim()
    .min(10, { message: "Content must be at least 10 characters" })
    .max(50000, { message: "Content is too long" }),
  
  category: z.string()
    .trim()
    .min(1, { message: "Category is required" })
    .max(50, { message: "Category must be less than 50 characters" }),
  
  status: z.enum(['draft', 'published']),
  
  excerpt: z.string()
    .trim()
    .max(500, { message: "Excerpt must be less than 500 characters" })
    .optional(),
  
  featured_image_url: z.string()
    .url({ message: "Please enter a valid URL" })
    .optional()
    .or(z.literal(""))
});

// Event validation schema
export const eventSchema = z.object({
  title: z.string()
    .trim()
    .min(1, { message: "Title is required" })
    .max(200, { message: "Title must be less than 200 characters" }),
  
  description: z.string()
    .trim()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(5000, { message: "Description is too long" }),
  
  location: z.string()
    .trim()
    .max(200, { message: "Location must be less than 200 characters" })
    .optional(),
  
  event_date: z.string()
    .min(1, { message: "Event date is required" }),
  
  end_date: z.string()
    .optional(),
  
  category: z.string()
    .trim()
    .max(50, { message: "Category must be less than 50 characters" })
    .optional(),
  
  organizer: z.string()
    .trim()
    .max(100, { message: "Organizer must be less than 100 characters" })
    .optional(),
  
  max_participants: z.number()
    .int()
    .min(1, { message: "Maximum participants must be at least 1" })
    .max(100000, { message: "Maximum participants is too high" })
    .optional(),
  
  registration_required: z.boolean(),
  
  status: z.enum(['upcoming', 'ongoing', 'completed', 'cancelled']),
  
  featured_image_url: z.string()
    .url({ message: "Please enter a valid URL" })
    .optional()
    .or(z.literal(""))
});

// Authentication validation schemas
export const signInSchema = z.object({
  email: z.string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  
  password: z.string()
    .min(1, { message: "Password is required" })
    .max(1000, { message: "Password is too long" })
});

export const signUpSchema = z.object({
  email: z.string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100, { message: "Password must be less than 100 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  
  fullName: z.string()
    .trim()
    .min(1, { message: "Full name is required" })
    .max(100, { message: "Full name must be less than 100 characters" })
    .regex(/^[a-zA-Z\s\-'\.]+$/, { message: "Full name contains invalid characters" })
});

// Utility function to sanitize HTML input
export const sanitizeHtml = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

// Type exports
export type ContactFormData = z.infer<typeof contactSchema>;
export type NewsFormData = z.infer<typeof newsSchema>;
export type EventFormData = z.infer<typeof eventSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;