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
  FormSelect,
  FormTextarea,
  Input,
} from "../../components/ui";

const startupSchema = z.object({
  name: z.string().min(3, "Informe o nome da startup."),
  sector: z.enum(["tecnologia", "agro", "saude", "educacao"]),
  summary: z.string().min(20, "Descreva melhor a proposta."),
  stage: z.enum(["ideia", "validacao", "piloto"]),
  businessModel: z.string().min(3, "Informe o modelo de negócio."),
  responsible: z.string().min(3, "Informe o responsável ou equipe."),
  problem: z.string().min(20, "Explique melhor o problema."),
  metrics: z.string().min(10, "Preencha ao menos uma métrica inicial."),
  year: z.coerce.number().int().min(2000, "Ano inválido."),
  imageUrl: z.string().url("Informe uma URL válida.").or(z.literal("")),
});

type StartupFormValues = z.infer<typeof startupSchema>;

const defaultValues: StartupFormValues = {
  name: "",
  sector: "tecnologia",
  summary: "",
  stage: "ideia",
  businessModel: "",
  responsible: "",
  problem: "",
  metrics: "",
  year: new Date().getFullYear(),
  imageUrl: "",
};

export function AdicionarStartupPage() {
  const [submitted, setSubmitted] = useState<StartupFormValues | null>(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StartupFormValues>({
    resolver: zodResolver(startupSchema),
    defaultValues,
  });

  const onSubmit = (values: StartupFormValues) => setSubmitted(values);

  return (
    <FormPage
      title="Adicionar startup"
      subtitle="Cadastro de ideia, estágio de validação e área de atuação para iniciativas empreendedoras."
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <FormSectionCard
          title="Identidade da startup"
          description="Nome, setor e proposta básica da iniciativa."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              label="Nome da startup"
              required
              error={errors.name?.message}
            >
              <Input
                {...register("name")}
                placeholder="Ex.: AgroData"
                className={
                  errors.name ? "border-red/60 focus-visible:ring-red/30" : ""
                }
              />
            </FormField>
            <FormField
              label="Setor principal"
              required
              error={errors.sector?.message}
            >
              <FormSelect
                {...register("sector")}
                className={
                  errors.sector ? "border-red/60 focus-visible:ring-red/30" : ""
                }
              >
                <option value="tecnologia">Tecnologia</option>
                <option value="agro">Agro</option>
                <option value="saude">Saúde</option>
                <option value="educacao">Educação</option>
              </FormSelect>
            </FormField>
          </div>
          <FormField
            label="Resumo da proposta"
            required
            className="mt-5"
            error={errors.summary?.message}
          >
            <FormTextarea
              {...register("summary")}
              placeholder="Descreva a solução, o público e o valor gerado."
              className={
                errors.summary ? "border-red/60 focus-visible:ring-red/30" : ""
              }
            />
          </FormField>
        </FormSectionCard>

        <FormSectionCard
          title="Validação e estágio"
          description="Selecione visualmente o ponto em que a startup se encontra."
        >
          <Controller
            control={control}
            name="stage"
            render={({ field }) => (
              <FormChoiceGrid
                name={field.name}
                title="Escolha o estágio atual"
                value={field.value}
                onChange={field.onChange}
                error={errors.stage?.message}
                choices={[
                  {
                    value: "ideia",
                    title: "Ideia",
                    description: "Conceito inicial ainda em estruturação.",
                    badge: "Começo",
                    accent: "blue",
                  },
                  {
                    value: "validacao",
                    title: "Validação",
                    description:
                      "Teste de hipótese, protótipo e feedback de usuários.",
                    badge: "Atenção",
                    accent: "green",
                  },
                  {
                    value: "piloto",
                    title: "Piloto",
                    description:
                      "Uso controlado com primeiros parceiros ou clientes.",
                    badge: "Avançado",
                    accent: "yellow",
                  },
                ]}
              />
            )}
          />

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <FormField
              label="Modelo de negócio"
              required
              error={errors.businessModel?.message}
            >
              <Input
                {...register("businessModel")}
                placeholder="Assinatura, marketplace, serviço, etc."
                className={
                  errors.businessModel
                    ? "border-red/60 focus-visible:ring-red/30"
                    : ""
                }
              />
            </FormField>
            <FormField
              label="Responsável / equipe"
              required
              error={errors.responsible?.message}
            >
              <Input
                {...register("responsible")}
                placeholder="Nome do estudante ou grupo"
                className={
                  errors.responsible
                    ? "border-red/60 focus-visible:ring-red/30"
                    : ""
                }
              />
            </FormField>
          </div>
        </FormSectionCard>

        <FormSectionCard
          title="Acompanhamento futuro"
          description="Campos de suporte para evolução do card e possíveis indicadores."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              label="Problema que resolve"
              required
              error={errors.problem?.message}
            >
              <FormTextarea
                {...register("problem")}
                placeholder="Explique a dor principal que motivou a startup."
                className={
                  errors.problem
                    ? "border-red/60 focus-visible:ring-red/30"
                    : ""
                }
              />
            </FormField>
            <FormField
              label="Métricas iniciais"
              required
              error={errors.metrics?.message}
            >
              <FormTextarea
                {...register("metrics")}
                placeholder="Usuários, testes, parceiros, validações ou próximas metas."
                className={
                  errors.metrics
                    ? "border-red/60 focus-visible:ring-red/30"
                    : ""
                }
              />
            </FormField>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <FormField
              label="Ano de criação"
              required
              error={errors.year?.message}
            >
              <Input
                {...register("year")}
                type="number"
                placeholder="2025"
                className={
                  errors.year ? "border-red/60 focus-visible:ring-red/30" : ""
                }
              />
            </FormField>
            <FormField
              label="Imagem / identidade visual"
              error={errors.imageUrl?.message}
            >
              <Input
                {...register("imageUrl")}
                placeholder="URL do logo ou capa"
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
            description="Resumo do payload que o formulário gerou depois da validação."
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
                  Setor
                </p>
                <p className="mt-2 text-sm font-semibold text-black">
                  {submitted.sector}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-base">
                  Estágio
                </p>
                <p className="mt-2 text-sm font-semibold text-black">
                  {submitted.stage}
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
            Publicar startup
          </Button>
        </div>
      </form>
    </FormPage>
  );
}
