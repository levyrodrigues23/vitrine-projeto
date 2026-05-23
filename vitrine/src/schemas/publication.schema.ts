import { z } from "zod";

export const publicationSchema = z.object({
  id: z.string(),
  title: z.string(),
  authors: z.array(z.string()).optional(),
  venue: z.string().optional(),
  year: z.number().int().optional(),
  type: z.string().optional(),
  doiOrUrl: z.string().optional(),
  summary: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type Publication = z.infer<typeof publicationSchema>;

export default publicationSchema;
