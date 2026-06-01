import { useState } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useCreateProject } from "../../hooks/useCreateProject";
import type { Project } from "../../types/project.types";

import {
  Button,
  FormChoiceGrid,
  FormField,
  FormPage,
  FormSectionCard,
  FormSelect,
  FormTextarea,
  Input,
} from "../../components/ui";

const projectSchema = z.object({
  category: z.enum(["inovação", "extensão", "pesquisa"]),
  title: z.string().min(3, "Informe um título com pelo menos 3 caracteres."),
  area: z.enum(["sistemas", "software", "redes", "outro"]),
  keywords: z.string().min(3, "Inclua ao menos uma palavra-chave."),
  responsible: z.string().min(3, "Informe o responsável pelo projeto."),
  description: z.string().min(20, "Descreva melhor o projeto."),
  year: z.coerce.number().int("Ano inválido.").min(2000, "Ano muito antigo."),
  status: z.enum(["andamento", "concluido", "validacao"]),
  imageFile: z.custom<FileList>().optional(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

const defaultValues: ProjectFormValues = {
  category: "inovação",
  title: "",
  area: "sistemas",
  keywords: "",
  responsible: "",
  description: "",
  year: new Date().getFullYear(),
  status: "andamento",
  imageFile: undefined,
};

const CATEGORY_MAP: Record<ProjectFormValues["category"], Project["category"]> =
  {
    inovação: "Inovação",
    extensão: "Extensão",
    pesquisa: "Pesquisa",
  };

export function AdicionarProjetoPage() {
  const [submitted, setSubmitted] = useState<ProjectFormValues | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { execute, loading } = useCreateProject();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  const onSubmit = async (values: ProjectFormValues) => {
    setSubmitError(null);

    const project: Project = {
      id: crypto.randomUUID(),
      title: values.title,
      description: values.description,
      category: CATEGORY_MAP[values.category],
      area: values.area,
      keywords: values.keywords
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      responsible: values.responsible.trim(),
      year: values.year,
      status: values.status,
    };

    const result = await execute(project, values.imageFile?.[0]);

    if (!result.success) {
      setSubmitError(result.error);
      return;
    }

    setSubmitted(values);
  };

  return (
    <FormPage
      title="Adicionar projeto"
      subtitle="Fluxo visual para registrar projetos com escolha explícita entre inovação, extensão e pesquisa."
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {submitError ? (
          <div className="rounded-2xl border border-red/20 bg-red/5 p-4 text-sm text-red">
            {submitError}
          </div>
        ) : null}

        <FormSectionCard
          title="Classificação do projeto"
          description="A seleção abaixo define a trilha de cadastro e facilita o uso futuro em filtros."
        >
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <FormChoiceGrid
                name={field.name}
                title="Escolha a categoria institucional"
                value={field.value}
                onChange={field.onChange}
                error={errors.category?.message}
                choices={[
                  {
                    value: "inovação",
                    title: "Inovação",
                    description: "Soluções, protótipos e validação de ideias.",
                    badge: "Aplicada",
                    accent: "blue",
                  },
                  {
                    value: "extensão",
                    title: "Extensão",
                    description:
                      "Projetos de impacto social e aproximação com a comunidade.",
                    badge: "Território",
                    accent: "green",
                  },
                  {
                    value: "pesquisa",
                    title: "Pesquisa",
                    description:
                      "Produção acadêmica, investigação e experimentação.",
                    badge: "Acadêmica",
                    accent: "yellow",
                  },
                ]}
              />
            )}
          />
        </FormSectionCard>

        <FormSectionCard
          title="Informações do projeto"
          description="Campos base para título, contexto e resumo do projeto."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              label="Título do projeto"
              required
              error={errors.title?.message}
            >
              <Input
                {...register("title")}
                placeholder="Ex.: Plataforma de Monitoramento de Cultivos"
                className={
                  errors.title ? "border-red/60 focus-visible:ring-red/30" : ""
                }
              />
            </FormField>
            <FormField
              label="Área principal"
              required
              error={errors.area?.message}
            >
              <FormSelect
                {...register("area")}
                className={
                  errors.area ? "border-red/60 focus-visible:ring-red/30" : ""
                }
              >
                <option value="sistemas">Sistemas de Informação</option>
                <option value="software">Engenharia de Software</option>
                <option value="redes">Redes de Computadores</option>
                <option value="outro">Outro</option>
              </FormSelect>
            </FormField>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <FormField
              label="Palavras-chave"
              hint="Separe por vírgula para facilitar filtros posteriores."
              error={errors.keywords?.message}
            >
              <Input
                {...register("keywords")}
                placeholder="IA, agricultura, automação"
                className={
                  errors.keywords
                    ? "border-red/60 focus-visible:ring-red/30"
                    : ""
                }
              />
            </FormField>
            <FormField
              label="Responsável / Orientador"
              error={errors.responsible?.message}
            >
              <Input
                {...register("responsible")}
                placeholder="Nome do professor ou equipe"
                className={
                  errors.responsible
                    ? "border-red/60 focus-visible:ring-red/30"
                    : ""
                }
              />
            </FormField>
          </div>

          <FormField
            label="Resumo do projeto"
            className="mt-5"
            error={errors.description?.message}
          >
            <FormTextarea
              {...register("description")}
              placeholder="Explique objetivo, contexto, público-alvo e estágio atual."
              className={
                errors.description
                  ? "border-red/60 focus-visible:ring-red/30"
                  : ""
              }
            />
          </FormField>
        </FormSectionCard>

        <FormSectionCard
          title="Detalhes operacionais"
          description="Campos de apoio para a apresentação visual e futura integração com o contexto."
        >
          <div className="grid gap-5 md:grid-cols-3">
            <FormField label="Ano de início" error={errors.year?.message}>
              <Input
                {...register("year")}
                type="number"
                placeholder="2025"
                className={
                  errors.year ? "border-red/60 focus-visible:ring-red/30" : ""
                }
              />
            </FormField>
            <FormField label="Status" error={errors.status?.message}>
              <FormSelect
                {...register("status")}
                className={
                  errors.status ? "border-red/60 focus-visible:ring-red/30" : ""
                }
              >
                <option value="andamento">Em andamento</option>
                <option value="concluido">Concluído</option>
                <option value="validacao">Em validação</option>
              </FormSelect>
            </FormField>
            <FormField
              label="Imagem de destaque"
              error={errors.imageFile?.message}
            >
              <Input
                {...register("imageFile")}
                type="file"
                placeholder="Selecione uma imagem"
                className={
                  errors.imageFile
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
            description="Resumo do payload que o formulário gerou depois da validação."
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-base">
                  Título
                </p>
                <p className="mt-2 text-sm font-semibold text-black">
                  {submitted.title}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-base">
                  Categoria
                </p>
                <p className="mt-2 text-sm font-semibold text-black">
                  {submitted.category}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-base">
                  Status
                </p>
                <p className="mt-2 text-sm font-semibold text-black">
                  {submitted.status}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-base">
                  Ano
                </p>
                <p className="mt-2 text-sm font-semibold text-black">
                  {submitted.year}
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
            Publicar projeto
          </Button>
        </div>
      </form>
    </FormPage>
  );
}
