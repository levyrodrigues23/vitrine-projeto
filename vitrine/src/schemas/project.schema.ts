import { z } from "zod";

export const linkSchema = z.object({
  site: z.string().url().optional(),
  repo: z.string().url().optional(),
});

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string().optional(),
  summary: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  area: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  coordinatorId: z.string().optional(),
  teamIds: z.array(z.string()).optional(),
  partners: z.array(z.string()).optional(),
  links: linkSchema.optional(),
  featured: z.boolean().optional(),
});

export type Project = z.infer<typeof projectSchema>;

export default projectSchema;
