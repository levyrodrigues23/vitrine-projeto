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

const producaoTecnicaSchema = z.object({
  title: z.string().min(3, "Informe o título da produção."),
  type: z.enum(["software", "patente", "relatorio", "manual", "outro"]),
  year: z.coerce.number().int().min(2000, "Ano inválido."),
  authors: z.string().min(3, "Informe os autores ou responsáveis."),
  description: z.string().min(20, "Descreva melhor a produção."),
  link: z.string().url("Informe uma URL válida.").or(z.literal("")),
  keywords: z.string().min(3, "Adicione palavras-chave."),
});

type ProducaoTecnicaFormValues = z.infer<typeof producaoTecnicaSchema>;

const defaultValues: ProducaoTecnicaFormValues = {
  title: "",
  type: "software",
  year: new Date().getFullYear(),
  authors: "",
  description: "",
  link: "",
  keywords: "",
};

export function AdicionarProducaoTecnicaPage() {
  const [submitted, setSubmitted] = useState<ProducaoTecnicaFormValues | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProducaoTecnicaFormValues>({
    resolver: zodResolver(producaoTecnicaSchema),
    defaultValues,
  });

  const onSubmit = async (values: ProducaoTecnicaFormValues) => {
    setSubmitted(values);
  };

  return (
    <FormPage
      title="Adicionar produção técnica"
      subtitle="Registro de softwares, patentes, relatórios técnicos e outros produtos oriundos de pesquisa e extensão."
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <FormSectionCard
          title="Identificação"
          description="Dados principais que identificam a produção no catálogo."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              label="Título da produção"
              required
              error={errors.title?.message}
            >
              <Input
                {...register("title")}
                placeholder="Ex.: Sistema de monitoramento ambiental"
                className={
                  errors.title ? "border-red/60 focus-visible:ring-red/30" : ""
                }
              />
            </FormField>
            <FormField
              label="Tipo de produção"
              required
              error={errors.type?.message}
            >
              <FormSelect
                {...register("type")}
                className={
                  errors.type ? "border-red/60 focus-visible:ring-red/30" : ""
                }
              >
                <option value="software">Software / Aplicativo</option>
                <option value="patente">Patente / Registro</option>
                <option value="relatorio">Relatório técnico</option>
                <option value="manual">Manual / Guia técnico</option>
                <option value="outro">Outro</option>
              </FormSelect>
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
            <FormField
              label="Autores / Responsáveis"
              required
              error={errors.authors?.message}
            >
              <Input
                {...register("authors")}
                placeholder="Nome 1, Nome 2..."
                className={
                  errors.authors
                    ? "border-red/60 focus-visible:ring-red/30"
                    : ""
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
        </FormSectionCard>

        <FormSectionCard
          title="Descrição e impacto"
          description="Detalhe o que foi produzido e qual é a aplicação ou impacto esperado."
        >
          <div className="space-y-5">
            <FormField
              label="Descrição"
              required
              hint="Explique o que é a produção e como foi desenvolvida."
              error={errors.description?.message}
            >
              <FormTextarea
                {...register("description")}
                placeholder="Descreva a produção, metodologia e tecnologias envolvidas."
                className={
                  errors.description
                    ? "border-red/60 focus-visible:ring-red/30"
                    : ""
                }
              />
            </FormField>
            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                label="Palavras-chave"
                required
                error={errors.keywords?.message}
              >
                <Input
                  {...register("keywords")}
                  placeholder="IA, sustentabilidade, inclusão..."
                  className={
                    errors.keywords
                      ? "border-red/60 focus-visible:ring-red/30"
                      : ""
                  }
                />
              </FormField>
            </div>
          </div>
        </FormSectionCard>

        {submitted ? (
          <FormSectionCard
            title="Último envio"
            description="Resumo do payload gerado após a validação."
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
                  Tipo
                </p>
                <p className="mt-2 text-sm font-semibold text-black">
                  {submitted.type}
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
            Publicar produção
          </Button>
        </div>
      </form>
    </FormPage>
  );
}
