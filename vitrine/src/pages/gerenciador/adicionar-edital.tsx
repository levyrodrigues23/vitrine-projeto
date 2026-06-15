
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { Artigo } from "../../types/papers.types";

import {
  Button,
  FormField,
  FormPage,
  FormSectionCard,
  FormTextarea,
  Input,
} from "../../components/ui";
import { useCreateArtigo } from "../../hooks/paper";

const articleSchema = z.object({
  titulo: z.string().min(3, "Informe o título do artigo."),
  ano_de_publicacao: z.coerce.number().int().min(2000, "Ano inválido."),
  descricao: z.string().min(20, "Descreva melhor o resumo."),
  keywords: z.string().min(3, "Adicione palavras-chave."),
  autores: z.string().min(3, "Informe os autores."),
  base: z
    .string()
    .min(3, "Descreva a base onde ele foi publicado. Ex: Scopus, IEEE"),
  professor: z.string().min(3, "Informe o professor responsável."),
  congresso: z.string().min(3, "Informe o congresso responsável."),
});

type ArticleFormValues = z.infer<typeof articleSchema>;

const defaultValues: ArticleFormValues = {
  titulo: "",
  ano_de_publicacao: new Date().getFullYear(),
  descricao: "",
  keywords: "",
  autores: "",
  base: "",
  professor: "",
  congresso: "",
};

export function AdicionarArtigoPage() {
  const {execute, loading} = useCreateArtigo();
  const [submitted, setSubmitted] = useState<ArticleFormValues | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues,
  });

  const onSubmit = (values: ArticleFormValues) => {
    setSubmitted(values);

    const paper: Artigo = {
      titulo: values.titulo,
      ano_de_publicacao: values.ano_de_publicacao,
      descricao: values.descricao,
      keywords: values.keywords,
      autores: values.autores,
      base: values.base,
      professor: values.professor,
      congresso: values.congresso,
    }

   
  };

  return (
    <FormPage
      title="Adicionar artigo"
      subtitle="Cadastro de publicações científicas com autoria, veículo e vínculo com linhas de pesquisa."
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <FormSectionCard
          title="Dados da publicação"
          description="Informações principais do artigo científico."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              label="Título do artigo"
              required
              error={errors.titulo?.message}
            >
              <Input
                {...register("titulo")}
                placeholder="Ex.: Tecnologias para inclusão e acessibilidade"
                className={
                  errors.titulo
                    ? "border-red/60 focus-visible:ring-red/30"
                    : ""
                }
              />
            </FormField>

            <FormField
              label="Ano de publicação"
              required
              error={errors.ano_de_publicacao?.message}
            >
              <Input
                {...register("ano_de_publicacao", {
                  valueAsNumber: true,
                })}
                type="number"
                placeholder="2025"
                className={
                  errors.ano_de_publicacao
                    ? "border-red/60 focus-visible:ring-red/30"
                    : ""
                }
              />
            </FormField>

            <FormField
              label="Autores"
              required
              error={errors.autores?.message}
            >
              <Input
                {...register("autores")}
                placeholder="Autor 1, Autor 2, Autor 3"
                className={
                  errors.autores
                    ? "border-red/60 focus-visible:ring-red/30"
                    : ""
                }
              />
            </FormField>

            <FormField
              label="Professor responsável"
              required
              error={errors.professor?.message}
            >
              <Input
                {...register("professor")}
                placeholder="Nome do professor responsável"
                className={
                  errors.professor
                    ? "border-red/60 focus-visible:ring-red/30"
                    : ""
                }
              />
            </FormField>
          </div>
        </FormSectionCard>

        <FormSectionCard
          title="Publicação"
          description="Informações sobre onde o artigo foi publicado."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              label="Congresso"
              required
              error={errors.congresso?.message}
            >
              <Input
                {...register("congresso")}
                placeholder="Ex.: SBSI, SBES, WebMedia..."
                className={
                  errors.congresso
                    ? "border-red/60 focus-visible:ring-red/30"
                    : ""
                }
              />
            </FormField>

            <FormField
              label="Base de publicação"
              required
              error={errors.base?.message}
            >
              <Input
                {...register("base")}
                placeholder="IEEE, Scopus, ACM, Springer..."
                className={
                  errors.base
                    ? "border-red/60 focus-visible:ring-red/30"
                    : ""
                }
              />
            </FormField>
          </div>
        </FormSectionCard>

        <FormSectionCard
          title="Descrição"
          description="Resumo e palavras-chave do artigo."
        >
          <FormField
            label="Resumo"
            required
            error={errors.descricao?.message}
          >
            <FormTextarea
              {...register("descricao")}
              placeholder="Descreva os objetivos, metodologia e resultados do artigo."
              className={
                errors.descricao
                  ? "border-red/60 focus-visible:ring-red/30"
                  : ""
              }
            />
          </FormField>

          <FormField
            label="Palavras-chave"
            required
            className="mt-5"
            error={errors.keywords?.message}
          >
            <Input
              {...register("keywords")}
              placeholder="IA, Educação, Inclusão Digital..."
              className={
                errors.keywords
                  ? "border-red/60 focus-visible:ring-red/30"
                  : ""
              }
            />
          </FormField>
        </FormSectionCard>

        {submitted && (
          <FormSectionCard
            title="Último envio"
            description="Resumo dos dados enviados."
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-base">
                  Título
                </p>
                <p className="mt-2 text-sm font-semibold text-black">
                  {submitted.titulo}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-base">
                  Autores
                </p>
                <p className="mt-2 text-sm font-semibold text-black">
                  {submitted.autores}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-base">
                  Congresso
                </p>
                <p className="mt-2 text-sm font-semibold text-black">
                  {submitted.congresso}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-base">
                  Ano
                </p>
                <p className="mt-2 text-sm font-semibold text-black">
                  {submitted.ano_de_publicacao}
                </p>
              </div>
            </div>
          </FormSectionCard>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            type="submit"
            variant="quaternary"
            className="px-6 py-3"
            disabled={isSubmitting}
          >
            Salvar rascunho
          </Button>

          <Button
            type="submit"
            variant="primary"
            className="px-6 py-3"
            disabled={isSubmitting}
          >
            Publicar artigo
          </Button>
        </div>
      </form>
    </FormPage>
  );
}

