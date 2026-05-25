import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button, FormChoiceGrid, FormField, FormPage, FormSectionCard, FormSelect, FormTextarea, Input, InputCheckbox } from "../../components/ui";

const egressoSchema = z.object({
  fullName: z.string().min(3, "Informe o nome completo."),
  email: z.string().email("Informe um e-mail válido."),
  phone: z.string().min(8, "Informe um telefone válido."),
  graduationYear: z.coerce.number().int().min(2000, "Ano inválido."),
  course: z.enum(["sistemas", "software", "redes", "outro"]),
  status: z.enum(["ativo", "empreendendo", "pesquisando", "transicao"]),
  area: z.enum(["tecnologia", "gestao", "educacao"]),
  summary: z.string().min(20, "Escreva um resumo mais completo."),
  cityState: z.string().min(2, "Informe cidade e estado."),
  linkedin: z.string().url("Informe uma URL válida.").or(z.literal("")),
  publicProfile: z.boolean(),
});

type EgressoFormValues = z.infer<typeof egressoSchema>;

const defaultValues: EgressoFormValues = {
  fullName: "",
  email: "",
  phone: "",
  graduationYear: new Date().getFullYear(),
  course: "sistemas",
  status: "ativo",
  area: "tecnologia",
  summary: "",
  cityState: "",
  linkedin: "",
  publicProfile: true,
};

export function AdicionarEgressoPage() {
  const [submitted, setSubmitted] = useState<EgressoFormValues | null>(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EgressoFormValues>({
    resolver: zodResolver(egressoSchema),
    defaultValues,
  });

  const onSubmit = (values: EgressoFormValues) => setSubmitted(values);

  return (
    <FormPage
      title="Adicionar egresso"
      subtitle="Cadastro visual para registrar trajetória, formação e área de atuação dos egressos do campus."
      eyebrow="Portal de egressos"
      metrics={[
        { label: "Campos principais", value: "3 blocos", detail: "Dados pessoais, formação e vínculo público." },
        { label: "Perfil esperado", value: "Institucional", detail: "Estrutura limpa para manter consistência entre perfis." },
        { label: "Visual", value: "Editorial", detail: "Cartões, respiros e destaque para leitura rápida." },
      ]}
      sideTitle="Como pensar esse formulário"
      sideDescription="A tela separa informação básica, carreira e visibilidade pública. O objetivo é evitar formulários longos sem organização visual."
      sideNotes={[
        { title: "Dados essenciais", description: "Nome, curso, ano de conclusão e contato institucional." },
        { title: "Área de atuação", description: "Tecnologia, gestão, pesquisa, educação ou outro campo." },
        { title: "Perfil público", description: "Resumo curto para exibição em cards e páginas da vitrine." },
      ]}
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <FormSectionCard title="Dados pessoais" description="Primeiro bloco da ficha com dados de identificação.">
          <div className="grid gap-5 md:grid-cols-2">
            <FormField label="Nome completo" required error={errors.fullName?.message}>
              <Input {...register("fullName")} placeholder="Ex.: Maria Silva" className={errors.fullName ? "border-red/60 focus-visible:ring-red/30" : ""} />
            </FormField>
            <FormField label="E-mail institucional" required error={errors.email?.message}>
              <Input {...register("email")} type="email" placeholder="maria.silva@exemplo.edu.br" className={errors.email ? "border-red/60 focus-visible:ring-red/30" : ""} />
            </FormField>
            <FormField label="Telefone / WhatsApp" required error={errors.phone?.message}>
              <Input {...register("phone")} placeholder="(85) 99999-9999" className={errors.phone ? "border-red/60 focus-visible:ring-red/30" : ""} />
            </FormField>
            <FormField label="Ano de conclusão" required error={errors.graduationYear?.message}>
              <Input {...register("graduationYear")} type="number" placeholder="2024" className={errors.graduationYear ? "border-red/60 focus-visible:ring-red/30" : ""} />
            </FormField>
          </div>
        </FormSectionCard>

        <FormSectionCard title="Formação e atuação" description="Campos ligados ao vínculo acadêmico e à trajetória profissional.">
          <div className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <FormField label="Curso" required error={errors.course?.message}>
                <FormSelect {...register("course")} className={errors.course ? "border-red/60 focus-visible:ring-red/30" : ""}>
                  <option value="sistemas">Sistemas de Informação</option>
                  <option value="software">Engenharia de Software</option>
                  <option value="redes">Redes de Computadores</option>
                  <option value="outro">Outro</option>
                </FormSelect>
              </FormField>
              <FormField label="Status de atuação" required error={errors.status?.message}>
                <FormSelect {...register("status")} className={errors.status ? "border-red/60 focus-visible:ring-red/30" : ""}>
                  <option value="ativo">Ativo no mercado</option>
                  <option value="empreendendo">Empreendendo</option>
                  <option value="pesquisando">Em pesquisa</option>
                  <option value="transicao">Em transição</option>
                </FormSelect>
              </FormField>
            </div>

            <Controller
              control={control}
              name="area"
              render={({ field }) => (
                <FormChoiceGrid
                  name={field.name}
                  title="Área de atuação"
                  description="Use a seleção visual para facilitar a leitura do perfil do egresso."
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.area?.message}
                  choices={[
                    { value: "tecnologia", title: "Tecnologia", description: "Desenvolvimento, dados e infraestrutura.", badge: "Mais comum", accent: "blue" },
                    { value: "gestao", title: "Gestão", description: "Coordenação, processos e liderança.", badge: "Estratégico", accent: "green" },
                    { value: "educacao", title: "Educação", description: "Docência, formação e apoio pedagógico.", badge: "Social", accent: "yellow" },
                  ]}
                />
              )}
            />

            <FormField label="Resumo profissional" required hint="Texto curto para o card público do egresso." error={errors.summary?.message}>
              <FormTextarea {...register("summary")} placeholder="Conte em poucas linhas onde atua, o que faz e quais competências se destacam." className={errors.summary ? "border-red/60 focus-visible:ring-red/30" : ""} />
            </FormField>
          </div>
        </FormSectionCard>

        <FormSectionCard title="Visibilidade pública" description="Defina como o egresso aparece na vitrine e em buscas internas.">
          <div className="grid gap-5 md:grid-cols-2">
            <FormField label="Cidade / Estado" required error={errors.cityState?.message}>
              <Input {...register("cityState")} placeholder="Ex.: Itapajé - CE" className={errors.cityState ? "border-red/60 focus-visible:ring-red/30" : ""} />
            </FormField>
            <FormField label="LinkedIn / Portfólio" error={errors.linkedin?.message}>
              <Input {...register("linkedin")} placeholder="https://linkedin.com/in/..." className={errors.linkedin ? "border-red/60 focus-visible:ring-red/30" : ""} />
            </FormField>
          </div>
          <div className="mt-5 rounded-2xl border border-gray-base/10 bg-gray-50 p-4">
            <div className="flex items-start gap-3 rounded-2xl border border-gray-base/10 bg-white p-4">
              <InputCheckbox {...register("publicProfile")} className="mt-1" />
              <span>
                <span className="block text-sm font-semibold text-black">Perfil ativo na vitrine</span>
                <span className="block text-sm text-gray-base">Permite exibir esse egresso em cards e resultados de busca.</span>
              </span>
            </div>
          </div>
        </FormSectionCard>

        {submitted ? (
          <FormSectionCard title="Último envio" description="Resumo do payload que o formulário gerou depois da validação.">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-base">Nome</p>
                <p className="mt-2 text-sm font-semibold text-black">{submitted.fullName}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-base">Curso</p>
                <p className="mt-2 text-sm font-semibold text-black">{submitted.course}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-base">Área</p>
                <p className="mt-2 text-sm font-semibold text-black">{submitted.area}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-base">Ano</p>
                <p className="mt-2 text-sm font-semibold text-black">{submitted.graduationYear}</p>
              </div>
            </div>
          </FormSectionCard>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button type="submit" variant="quaternary" className="px-6 py-3" disabled={isSubmitting}>Salvar rascunho</Button>
          <Button type="submit" variant="primary" className="px-6 py-3" disabled={isSubmitting}>Publicar egresso</Button>
        </div>
      </form>
    </FormPage>
  );
}
