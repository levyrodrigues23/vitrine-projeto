import { z } from "zod";

export const projectCategorySchema = z.enum([
  "Inovação",
  "Extensão",
  "Pesquisa",
]);

export const workDoneSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: projectCategorySchema,
  imageUrl: z.string().optional(),
});

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: projectCategorySchema,
  imageUrl: z.string().optional(),
  worksDone: z.array(workDoneSchema).optional(),
});

export type Project = z.infer<typeof projectSchema>;

export default projectSchema;
