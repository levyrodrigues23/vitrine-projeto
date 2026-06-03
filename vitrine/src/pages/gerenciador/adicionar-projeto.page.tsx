import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useCreateProject } from "../../hooks/useCreateProject";
import { useUpdateProject } from "../../hooks/useUpdateProject";
import { useDeleteProject } from "../../hooks/useDeleteProject";
import { useProject } from "../../hooks/useProject";
import type { Project } from "../../types/project.types";
import { useParams, useNavigate, Navigate } from "react-router";

import { useAuthStore } from "../../store/useAuthStore";

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
  description: z.string().min(20, "Descreva melhor o projeto."),
  imageFile: z.custom<FileList>().optional(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

const defaultValues: ProjectFormValues = {
  category: "inovação",
  title: "",
  description: "",
  imageFile: undefined,
};


const CATEGORY_MAP: Record<ProjectFormValues["category"], Project["category"]> =
{
  inovação: "Inovação",
  extensão: "Extensão",
  pesquisa: "Pesquisa",
};

export function AdicionarProjetoPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const [submitted, setSubmitted] = useState<ProjectFormValues | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { execute: createExecute, loading: isCreating } = useCreateProject();
  const { execute: updateExecute, loading: isUpdating } = useUpdateProject();
  const { execute: deleteExecute, loading: isDeleting } = useDeleteProject();
  const { project, loading: isFetching } = useProject(id);

  const isLoading = isCreating || isUpdating || isFetching || isDeleting;

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  useEffect(() => {
    if (project) {
      reset({
        category: (project.category.toLowerCase() === "inovação" ? "inovação" :
        project.category.toLowerCase() === "extensão" ? "extensão" :
        "pesquisa") as ProjectFormValues["category"],
        title: project.title,
        description: project.description || "",
      });
    }
  }, [project, reset]);

  const handleDelete = async () => {
    if (!id || !window.confirm("Tem certeza que deseja excluir este projeto?")) return;
    
    const result = await deleteExecute(id);
    if (result.success) {
      navigate("/projetos");
    } else {
      setSubmitError(result.error);
    }
  };

  const onSubmit = async (values: ProjectFormValues) => {
    setSubmitError(null);

    const projectData = {
      title: values.title,
      description: values.description,
      category: CATEGORY_MAP[values.category],
      authorId: user?.id,
    };

    let result;
    if (id) {
      result = await updateExecute(id, projectData, values.imageFile?.[0]);
    } else {
      result = await createExecute(projectData, values.imageFile?.[0]);
    }

    if (!result.success) {
      setSubmitError(result.error);
      return;
    }

    setSubmitted(values);

    if (id) {
      navigate(`/projetos/${id}`);
    }
  };

  if (isFetching) {
    return <div className="p-10 text-center">Carregando dados do projeto...</div>;
  }

  // Restrição de acesso em modo de edição
  if (id && project && user) {
    if (user.role !== "admin" && project.authorId !== user.id) {
      return <Navigate to="/gerenciador" replace />;
    }
  }

  return (
    <FormPage
      title={id ? "Editar projeto" : "Adicionar projeto"}
      subtitle={
        id
          ? "Altere as informações do projeto e salve para atualizar a vitrine."
          : "Fluxo visual para registrar projetos com escolha explícita entre inovação, extensão e pesquisa."
      }
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
          description="Campos base para título e contexto do projeto."
        >
          <div className="grid gap-5 md:grid-cols-1">
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
          description="Campos de apoio para a apresentação visual."
        >
          <div className="grid gap-5 md:grid-cols-1">
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
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
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
            </div>
          </FormSectionCard>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          {id && (
            <Button
              type="button"
              variant="tertiary"
              className="bg-red text-white hover:bg-red/90 px-6 py-3"
              disabled={isSubmitting || isLoading}
              onClick={handleDelete}
            >
              Excluir Projeto
            </Button>
          )}
          <Button
            type="button"
            variant="quaternary"
            className="px-6 py-3"
            disabled={isSubmitting || isLoading}
            onClick={() => {
              if (id) navigate(`/projetos/${id}`);
            }}
          >
            {id ? "Cancelar" : "Salvar rascunho"}
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="px-6 py-3"
            disabled={isSubmitting || isLoading}
          >
            {id ? "Salvar Alterações" : "Publicar projeto"}
          </Button>
        </div>
      </form>
    </FormPage>
  );
}
