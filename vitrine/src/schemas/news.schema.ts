import { z } from "zod";

export const newsSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string().optional(),
  content: z.string().optional(),
  publishedAt: z.string().datetime().optional(),
  image: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type News = z.infer<typeof newsSchema>;

export default newsSchema;
