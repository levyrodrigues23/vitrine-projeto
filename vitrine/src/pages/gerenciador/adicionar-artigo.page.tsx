import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Button,
  FormField,
  FormPage,
  FormSectionCard,
  FormSelect,
  FormTextarea,
  Input,
} from "../../components/ui";

const articleSchema = z.object({
  title: z.string().min(3, "Informe o título do artigo."),
  year: z.coerce.number().int().min(2000, "Ano inválido."),
  authors: z.string().min(3, "Informe os autores."),
  publicationType: z.enum(["artigo", "congresso", "capitulo", "coletanea"]),
  venue: z.string().min(3, "Informe o periódico ou evento."),
  link: z.string().url("Informe uma URL válida.").or(z.literal("")),
  summary: z.string().min(20, "Descreva melhor o resumo."),
  researchLine: z.string().min(3, "Informe a linha de pesquisa."),
  keywords: z.string().min(3, "Adicione palavras-chave."),
});

type ArticleFormValues = z.infer<typeof articleSchema>;

const defaultValues: ArticleFormValues = {
  title: "",
  year: new Date().getFullYear(),
  authors: "",
  publicationType: "artigo",
  venue: "",
  link: "",
  summary: "",
  researchLine: "",
  keywords: "",
};

export function AdicionarArtigoPage() {
  const [submitted, setSubmitted] = useState<ArticleFormValues | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues,
  });

  const onSubmit = (values: ArticleFormValues) => setSubmitted(values);

  return (
    <FormPage
      title="Adicionar artigo"
      subtitle="Cadastro de publicações científicas com autoria, veículo e vínculo com linhas de pesquisa."
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <FormSectionCard
          title="Dados da publicação"
          description="Preencha primeiro os dados que identificam o artigo em catálogo."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              label="Título do artigo"
              required
              error={errors.title?.message}
            >
              <Input
                {...register("title")}
                placeholder="Ex.: Tecnologias para inclusão e acessibilidade"
                className={
                  errors.title ? "border-red/60 focus-visible:ring-red/30" : ""
                }
              />
            </FormField>
            <FormField label="Ano" required error={errors.year?.message}>
              <Input
                {...register("year")}
                type="number"
                placeholder="2024"
                className={
                  errors.year ? "border-red/60 focus-visible:ring-red/30" : ""
                }
              />
            </FormField>
            <FormField label="Autores" required error={errors.authors?.message}>
              <Input
                {...register("authors")}
                placeholder="Equipe de Pesquisa, nome 2, nome 3"
                className={
                  errors.authors
                    ? "border-red/60 focus-visible:ring-red/30"
                    : ""
                }
              />
            </FormField>
            <FormField
              label="Tipo de publicação"
              required
              error={errors.publicationType?.message}
            >
              <FormSelect
                {...register("publicationType")}
                className={
                  errors.publicationType
                    ? "border-red/60 focus-visible:ring-red/30"
                    : ""
                }
              >
                <option value="artigo">Artigo</option>
                <option value="congresso">Congresso / Simpósio</option>
                <option value="capitulo">Capítulo de livro</option>
                <option value="coletanea">Coletânea</option>
              </FormSelect>
            </FormField>
          </div>
        </FormSectionCard>

        <FormSectionCard
          title="Informações complementares"
          description="Dados que ajudam na exibição do card e na navegação futura."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              label="Periódico / Evento"
              required
              error={errors.venue?.message}
            >
              <Input
                {...register("venue")}
                placeholder="Nome da revista, evento ou coletânea"
                className={
                  errors.venue ? "border-red/60 focus-visible:ring-red/30" : ""
                }
              />
            </FormField>
            <FormField label="Link de acesso" error={errors.link?.message}>
              <Input
                {...register("link")}
                placeholder="https://..."
                className={
                  errors.link ? "border-red/60 focus-visible:ring-red/30" : ""
                }
              />
            </FormField>
          </div>

          <FormField
            label="Resumo curto"
            required
            className="mt-5"
            error={errors.summary?.message}
          >
            <FormTextarea
              {...register("summary")}
              placeholder="Descreva a pesquisa e o principal resultado em poucas linhas."
              className={
                errors.summary ? "border-red/60 focus-visible:ring-red/30" : ""
              }
            />
          </FormField>
        </FormSectionCard>

        <FormSectionCard
          title="Catalogação visual"
          description="Bloco de apoio para organizar a publicação por linhas e palavras-chave."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              label="Linha de pesquisa"
              required
              error={errors.researchLine?.message}
            >
              <Input
                {...register("researchLine")}
                placeholder="Ex.: Sistemas inteligentes"
                className={
                  errors.researchLine
                    ? "border-red/60 focus-visible:ring-red/30"
                    : ""
                }
              />
            </FormField>
            <FormField
              label="Palavras-chave"
              required
              error={errors.keywords?.message}
            >
              <Input
                {...register("keywords")}
                placeholder="educação, IA, inclusão"
                className={
                  errors.keywords
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
                  Autores
                </p>
                <p className="mt-2 text-sm font-semibold text-black">
                  {submitted.authors}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-base">
                  Tipo
                </p>
                <p className="mt-2 text-sm font-semibold text-black">
                  {submitted.publicationType}
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
