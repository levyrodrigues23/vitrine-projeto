import { z } from "zod";

export const socialLinkSchema = z.object({
  label: z.string().optional(),
  url: z.string().url(),
});

export const teacherSchema = z.object({
  id: z.string(),
  name: z.string(),
  photo: z.string().optional(),
  shortBio: z.string().optional(),
  department: z.string().optional(),
  researchAreas: z.array(z.string()).optional(),
  email: z.string().email().optional(),
  lattes: z.string().optional(),
  orcid: z.string().optional(),
  socialLinks: z.array(socialLinkSchema).optional(),
});

export type Teacher = z.infer<typeof teacherSchema>;

export default teacherSchema;
