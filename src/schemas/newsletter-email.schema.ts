import { z } from "zod";

export const newsletterEmailSchema = z.object({
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject must be less than 200 characters"),
  htmlContent: z.string().min(10, "Email content must be at least 10 characters"),
});

export type NewsletterEmailInput = z.infer<typeof newsletterEmailSchema>;
