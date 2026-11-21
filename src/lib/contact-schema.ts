import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100, "Keep your name under 100 characters."),
  email: z.string().trim().email("Enter a valid email address."),
  subject: z.string().trim().min(3, "Add a short subject.").max(150, "Keep the subject under 150 characters."),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a little more (at least 10 characters).")
    .max(1000, "Keep your message under 1000 characters."),
})

export type ContactInput = z.infer<typeof contactSchema>

export const MESSAGE_MAX = 1000
