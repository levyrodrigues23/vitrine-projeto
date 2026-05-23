import { z } from "zod";

export const graduateSchema = z.object({
  id: z.string(),
  name: z.string(),
  photo: z.string().optional(),
  course: z.string().optional(),
  graduationYear: z.number().int().optional(),
  currentPosition: z.string().optional(),
  company: z.string().optional(),
  testimonial: z.string().optional(),
  links: z.array(z.string()).optional(),
  location: z.string().optional(),
});

export type Graduate = z.infer<typeof graduateSchema>;

export default graduateSchema;
