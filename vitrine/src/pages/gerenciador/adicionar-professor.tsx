import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Button,
  FormChoiceGrid,
  FormField,
  FormPage,
  FormSectionCard,
  FormTextarea,
  Input,
} from "../../components/ui";
import { useCreateTeacher } from "../../hooks/teacher";
import type { Teacher } from "../../types/teachers.types";

const professorSchema = z.object({
  name: z.string().min(3, "Informe o nome do professor."),
  description: z.string().min(20, "Descreva melhor o professor."),
  email: z.string().email("Informe um email válido."),
  lattes: z.string().url("Informe uma URL válida."),
  area: z.string().min(3, "Informe a área de atuação."),
  grau: z.enum(["graduacao", "posGraduacao", "mestrado", "doutorado"]),
  imageUrl: z.custom<FileList>().optional(),
});

type ProfessorFormValues = z.infer<typeof professorSchema>;

const defaultValues: ProfessorFormValues = {
  name: "",
  description: "",
  email: "",
  lattes: "",
  area: "",
  grau: "graduacao",
  imageUrl: undefined,
};

export function AdicionarProfessorPage() {
  const [submitted, setSubmitted] =
    useState<ProfessorFormValues | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { execute, loading } = useCreateTeacher();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfessorFormValues>({
    resolver: zodResolver(professorSchema),
    defaultValues,
  });

  const onSubmit = async (values: ProfessorFormValues) => {
    setSubmitError(null);

    const teacher: Teacher = {
      id: crypto.randomUUID(),
      name: values.name,
      description: values.description,
      email: values.email,
      lattes: values.lattes,
      area: values.area,
      grau: values.grau,
      imageUrl: values.imageUrl?.[0] ? URL.createObjectURL(values.imageUrl[0]) : undefined ,
    };

    const result = await execute(teacher);

    if (result.success == false) {
      setSubmitError(result.error);
      return;
    }

    setSubmitted(values);
  };

  return (
    <FormPage
      title="Adicionar professor"
      subtitle="Cadastro de professor com nome, descrição, email, lattes, área e grau."
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {submitError ? (
          <div className="rounded-2xl border border-red/20 bg-red/5 p-4 text-sm text-red">
            {submitError}
          </div>
        ) : null}

        <FormSectionCard
          title="Identidade do professor"
          description="Nome, descrição, email, lattes, área e grau."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              label="Nome do professor"
              required
              error={errors.name?.message}
            >
              <Input
                {...register("name")}
                placeholder="Nome do professor"
                className={
                  errors.name
                    ? "border-red/60 focus-visible:ring-red/30"
                    : ""
                }
              />
            </FormField>
          </div>

          <FormField
            label="Descrição do professor"
            required
            className="mt-5"
            error={errors.description?.message}
          >
            <FormTextarea
              {...register("description")}
              placeholder="Descreva o professor, suas áreas de atuação e suas principais contribuições."
              className={
                errors.description
                  ? "border-red/60 focus-visible:ring-red/30"
                  : ""
              }
            />
          </FormField>
        </FormSectionCard>

        <FormSectionCard
          title="Formação acadêmica"
          description="Selecione o grau acadêmico do professor."
        >
          <Controller
            control={control}
            name="grau"
            render={({ field }) => (
              <FormChoiceGrid
                name={field.name}
                title="Escolha o grau do professor"
                value={field.value}
                onChange={field.onChange}
                error={errors.grau?.message}
                choices={[
                  {
                    value: "graduacao",
                    title: "Graduação",
                    description: "Professor com graduação.",
                    badge: "Início",
                    accent: "blue",
                  },
                  {
                    value: "posGraduacao",
                    title: "Pós-graduação",
                    description: "Professor com pós-graduação.",
                    badge: "Especialização",
                    accent: "green",
                  },
                  {
                    value: "mestrado",
                    title: "Mestrado",
                    description: "Professor com título de mestre.",
                    badge: "Avançado",
                    accent: "yellow",
                  },
                  {
                    value: "doutorado",
                    title: "Doutorado",
                    description: "Professor com título de doutor.",
                    badge: "Máximo",
                    accent: "yellow",
                  },
                ]}
              />
            )}
          />

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <FormField
              label="Área de atuação"
              required
              error={errors.area?.message}
            >
              <Input
                {...register("area")}
                placeholder="Ex.: Desenvolvimento Web"
                className={
                  errors.area
                    ? "border-red/60 focus-visible:ring-red/30"
                    : ""
                }
              />
            </FormField>
          </div>
        </FormSectionCard>

        <FormSectionCard
          title="Contato e currículo"
          description="Informações de contato e currículo Lattes."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              label="Email do professor"
              required
              error={errors.email?.message}
            >
              <Input
                {...register("email")}
                placeholder="email@exemplo.com"
                className={
                  errors.email
                    ? "border-red/60 focus-visible:ring-red/30"
                    : ""
                }
              />
            </FormField>

            <FormField
              label="Lattes do professor"
              required
              error={errors.lattes?.message}
            >
              <Input
                {...register("lattes")}
                placeholder="https://lattes.cnpq.br/1234567890"
                className={
                  errors.lattes
                    ? "border-red/60 focus-visible:ring-red/30"
                    : ""
                }
              />
            </FormField>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <FormField
              label="Imagem do professor"
              error={errors.imageUrl?.message}
            >
              <Input
                type="file"
                {...register("imageUrl")}
                className={
                  errors.imageUrl
                    ? "border-red/60 focus-visible:ring-red/30"
                    : ""
                }
              />
            </FormField>
          </div>
        </FormSectionCard>

        {submitted ? (
          <FormSectionCard
            title="Último envio"
            description="Resumo do professor enviado."
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-base">
                  Nome
                </p>
                <p className="mt-2 text-sm font-semibold text-black">
                  {submitted.name}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-base">
                  Descrição
                </p>
                <p className="mt-2 text-sm font-semibold text-black">
                  {submitted.description}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-base">
                  Email
                </p>
                <p className="mt-2 text-sm font-semibold text-black">
                  {submitted.email}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-base">
                  Lattes
                </p>
                <p className="mt-2 text-sm font-semibold text-black">
                  {submitted.lattes}
                </p>
              </div>
            </div>
          </FormSectionCard>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            type="submit"
            variant="quaternary"
            className="px-6 py-3"
            disabled={isSubmitting || loading}
          >
            Salvar rascunho
          </Button>

          <Button
            type="submit"
            variant="primary"
            className="px-6 py-3"
            disabled={isSubmitting || loading}
          >
            Publicar professor
          </Button>
        </div>
      </form>
    </FormPage>
  );
}