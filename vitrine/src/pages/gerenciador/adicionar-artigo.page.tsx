import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  base: z.string().min(3, "Ex: Scopus, IEEE"),
  professorId: z.string().min(1, "Selecione o professor."),
  congressoId: z.string().min(1, "Selecione o congresso."),
});

type ArticleFormValues = z.infer<typeof articleSchema>;

const defaultValues: ArticleFormValues = {
  titulo: "",
  ano_de_publicacao: new Date().getFullYear(),
  descricao: "",
  keywords: "",
  autores: "",
  base: "",
  professorId: "",
  congressoId: "",
};

export function AdicionarArtigoPage() {
  const { execute, loading } = useCreateArtigo();
  const [submitted, setSubmitted] = useState<ArticleFormValues | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues,
  });

  const onSubmit = async (values: ArticleFormValues) => {
    setSubmitted(values);

    const paper = {
      titulo: values.titulo,
      ano_de_publicacao: values.ano_de_publicacao,
      descricao: values.descricao,
      keywords: values.keywords,
      autores: values.autores,
      base: values.base,
      professorId: values.professorId,
      congressoId: values.congressoId,
    };

    await execute(paper);
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
            <FormField label="Título" required error={errors.titulo?.message}>
              <Input {...register("titulo")} />
            </FormField>

            <FormField label="Ano" required error={errors.ano_de_publicacao?.message}>
              <Input
                type="number"
                {...register("ano_de_publicacao", {
                  valueAsNumber: true,
                })}
              />
            </FormField>

            <FormField label="Autores" required error={errors.autores?.message}>
              <Input {...register("autores")} />
            </FormField>

            <FormField label="Base" required error={errors.base?.message}>
              <Input {...register("base")} />
            </FormField>
          </div>
        </FormSectionCard>

        <FormSectionCard title="Relacionamentos">
          <div className="grid gap-5 md:grid-cols-2">
            <FormField label="Professor" required error={errors.professorId?.message}>
              <Input {...register("professorId")} />
            </FormField>

            <FormField label="Congresso" required error={errors.congressoId?.message}>
              <Input {...register("congressoId")} />
            </FormField>
          </div>
        </FormSectionCard>

        <FormSectionCard title="Descrição">
          <FormField label="Resumo" required error={errors.descricao?.message}>
            <FormTextarea {...register("descricao")} />
          </FormField>

          <FormField label="Palavras-chave" required error={errors.keywords?.message}>
            <Input {...register("keywords")} />
          </FormField>
        </FormSectionCard>

        {submitted && (
          <FormSectionCard title="Último envio">
            <p className="text-sm font-medium">{submitted.titulo}</p>
          </FormSectionCard>
        )}

        <div className="flex justify-end">
          <Button type="submit" variant="primary" disabled={loading}>
            Publicar artigo
          </Button>
        </div>
      </form>
    </FormPage>
  );
}