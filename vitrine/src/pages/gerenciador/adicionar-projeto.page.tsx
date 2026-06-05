import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useNavigate, useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  useCreateProject,
  useDeleteProject,
  useProject,
  useUpdateProject,
} from "../../hooks/project";
import { buildReviewEmailUrl } from "../../lib/review-email";
import { useAuthStore } from "../../store/useAuthStore";
import type { Project } from "../../types/project.types";

import {
  Button,
  FormChoiceGrid,
  FormField,
  FormPage,
  FormSectionCard,
  FormTextarea,
  Input,
} from "../../components/ui";

const projectSchema = z.object({
  category: z.enum(["inovação", "extensão", "pesquisa"]),
  title: z.string().min(3, "Informe um título com pelo menos 3 caracteres."),
  description: z
    .string()
    .min(20, "Descreva melhor o projeto para a página individual."),
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
  const isManagerReview = user?.role === "gerenciador";

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
    if (!project) return;

    reset({
      category:
        project.category === "Inovação"
          ? "inovação"
          : project.category === "Extensão"
            ? "extensão"
            : "pesquisa",
      title: project.title,
      description: project.description || "",
      imageFile: undefined,
    });
  }, [project, reset]);

  const handleDelete = async () => {
    if (!id || !window.confirm("Tem certeza que deseja excluir este projeto?")) {
      return;
    }

    const result = await deleteExecute(id);
    if (result.success) {
      navigate("/projetos");
      return;
    }

    setSubmitError(result.error ?? "Erro ao excluir projeto");
  };

  const onSubmit = async (values: ProjectFormValues) => {
    setSubmitError(null);

    const projectData = {
      title: values.title,
      description: values.description,
      category: CATEGORY_MAP[values.category],
      authorId: user?.id,
    };

    if (isManagerReview) {
      const emailUrl = buildReviewEmailUrl({
        contentType: "projeto",
        action: id ? "update" : "create",
        manager: user,
        payload: {
          id,
          ...projectData,
          imageFileName: values.imageFile?.[0]?.name ?? null,
        },
      });

      setSubmitted(values);
      window.location.href = emailUrl;
      return;
    }

    const result = id
      ? await updateExecute(id, projectData, values.imageFile?.[0])
      : await createExecute(projectData, values.imageFile?.[0]);

    if (!result.success) {
      setSubmitError(result.error ?? "Erro ao salvar projeto");
      return;
    }

    setSubmitted(values);

    if (id) {
      navigate(`/projetos/${id}`);
    }
  };

  if (isFetching) {
    return (
      <p className="p-10 text-center text-gray-base" role="status">
        Carregando dados do projeto...
      </p>
    );
  }

  if (id && project && user) {
    if (user.role !== "admin" && project.authorId !== user.id) {
      return <Navigate to="/gerenciador" replace />;
    }
  }

  return (
    <FormPage
      title={id ? "Editar projeto" : "Adicionar projeto"}
      subtitle={
        isManagerReview
          ? "Preencha o formulário para enviar um payload de revisão aos administradores."
          : "Preencha as informações para publicar ou atualizar o projeto na vitrine."
      }
    >
      <form
        className="space-y-6"
        onSubmit={handleSubmit(onSubmit)}
        aria-label={id ? "Formulário de edição de projeto" : "Formulário de novo projeto"}
      >
        {submitError ? (
          <div
            className="rounded-2xl border border-red/20 bg-red/5 p-4 text-sm text-red"
            role="alert"
          >
            {submitError}
          </div>
        ) : null}

        {isManagerReview ? (
          <div
            className="rounded-2xl border border-blue/20 bg-blue/5 p-4 text-sm text-gray-base"
            role="status"
          >
            Como gerenciador, seu envio será aberto em um e-mail para os admins
            revisarem e aprovarem antes da publicação.
          </div>
        ) : null}

        <FormSectionCard
          title="Classificação do projeto"
          description="A seleção define a trilha usada nos filtros e na listagem pública."
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
          description="O card usa uma prévia desse texto; a página individual mostra a descrição completa."
        >
          <FormField
            label="Título do projeto"
            required
            error={errors.title?.message}
          >
            <Input
              {...register("title")}
              placeholder="Ex.: Plataforma de monitoramento de cultivos"
              className={
                errors.title ? "border-red/60 focus-visible:ring-red/30" : ""
              }
            />
          </FormField>

          <FormField
            label="Descrição completa"
            required
            className="mt-5"
            hint="Escreva para a página do projeto; a listagem pública exibirá somente as primeiras linhas."
            error={errors.description?.message}
          >
            <FormTextarea
              {...register("description")}
              placeholder="Explique objetivo, contexto, público-alvo, estágio atual e resultados esperados."
              className={
                errors.description
                  ? "border-red/60 focus-visible:ring-red/30"
                  : ""
              }
            />
          </FormField>
        </FormSectionCard>

        <FormSectionCard
          title="Imagem de destaque"
          description="Imagem exibida no card e no topo da página individual."
        >
          <FormField label="Arquivo de imagem" error={errors.imageFile?.message}>
            <Input
              {...register("imageFile")}
              type="file"
              accept="image/*"
              className={
                errors.imageFile
                  ? "border-red/60 focus-visible:ring-red/30"
                  : ""
              }
            />
          </FormField>
        </FormSectionCard>

        {submitted ? (
          <FormSectionCard
            title="Último envio"
            description={
              isManagerReview
                ? "Payload preparado para revisão por e-mail."
                : "Resumo do payload salvo depois da validação."
            }
          >
            <div className="grid gap-4 md:grid-cols-2">
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
          {id && user?.role === "admin" ? (
            <Button
              type="button"
              variant="tertiary"
              className="px-6 py-3"
              disabled={isSubmitting || isLoading}
              onClick={handleDelete}
            >
              Excluir projeto
            </Button>
          ) : null}
          <Button
            type="button"
            variant="quaternary"
            className="px-6 py-3"
            disabled={isSubmitting || isLoading}
            onClick={() => navigate(id ? `/projetos/${id}` : "/gerenciador")}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="px-6 py-3"
            disabled={isSubmitting || isLoading}
          >
            {isManagerReview
              ? "Enviar para revisão"
              : id
                ? "Salvar alterações"
                : "Publicar projeto"}
          </Button>
        </div>
      </form>
    </FormPage>
  );
}
