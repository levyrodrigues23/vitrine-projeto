import { z } from "zod";

export const eventSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  startAt: z.string().datetime(),
  endAt: z.string().datetime().optional(),
  location: z.string().optional(),
  organization: z.string().optional(),
  link: z.string().url().optional(),
  image: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type Event = z.infer<typeof eventSchema>;

export default eventSchema;
