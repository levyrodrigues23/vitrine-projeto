import { z } from "zod";

export const projectCategorySchema = z.enum([
  "Inovação",
  "Extensão",
  "Pesquisa",
]);

export type ProjectCategoryValue = z.infer<typeof projectCategorySchema>;

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export const imageFileSchema = z
  .custom<File>((val) => val instanceof File, {
    message: "Selecione um arquivo de imagem.",
  })
  .refine((f) => f.size <= MAX_IMAGE_SIZE, "A imagem deve ter no máximo 5MB.")
  .refine(
    (f) => ALLOWED_IMAGE_TYPES.includes(f.type),
    "Formato não permitido. Use JPEG, PNG, WEBP ou GIF.",
  );

export const workDoneFormSchema = z.object({
  title: z.string().min(2, "Informe um título com ao menos 2 caracteres."),
  category: z.string().min(2, "Informe uma categoria ou keyword."),
  description: z
    .string()
    .min(10, "A descrição deve ter ao menos 10 caracteres."),
  imageFile: imageFileSchema.optional(),
});

export const projectFormSchema = z.object({
  category: z.enum(["inovação", "extensão", "pesquisa"]),
  title: z.string().min(3, "O título deve ter ao menos 3 caracteres."),
  responsible: z.string().min(3, "Informe o responsável pelo projeto."),
  description: z
    .string()
    .min(20, "A descrição deve ter ao menos 20 caracteres."),
  imageFile: imageFileSchema.optional(),
  worksDone: z.array(workDoneFormSchema),
});

export type WorkDoneFormValues = z.infer<typeof workDoneFormSchema>;
export type ProjectFormValues = z.infer<typeof projectFormSchema>;

export const workDoneSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  imageUrl: z.string(),
});

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: projectCategorySchema,
  imageUrl: z.string().optional(),
  responsible: z.string().optional(),
  worksDone: z.array(workDoneSchema).optional(),
});

export type Project = z.infer<typeof projectSchema>;

export default projectSchema;
