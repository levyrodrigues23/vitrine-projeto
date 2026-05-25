import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button, FormChoiceGrid, FormField, FormPage, FormSectionCard, FormSelect, FormTextarea, Input } from "../../components/ui";

const projectSchema = z.object({
  category: z.enum(["inovacao", "extensao", "pesquisa"]),
  title: z.string().min(3, "Informe um título com pelo menos 3 caracteres."),
  area: z.enum(["sistemas", "software", "redes", "outro"]),
  keywords: z.string().min(3, "Inclua ao menos uma palavra-chave."),
  responsible: z.string().min(3, "Informe o responsável pelo projeto."),
  summary: z.string().min(20, "Descreva melhor o projeto."),
  year: z.coerce.number().int("Ano inválido.").min(2000, "Ano muito antigo."),
  status: z.enum(["andamento", "concluido", "validacao"]),
  imageUrl: z.string().optional().or(z.literal("")),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

const defaultValues: ProjectFormValues = {
  category: "inovacao",
  title: "",
  area: "sistemas",
  keywords: "",
  responsible: "",
  summary: "",
  year: new Date().getFullYear(),
  status: "andamento",
  imageUrl: "",
};

export function AdicionarProjetoPage() {
  const [submitted, setSubmitted] = useState<ProjectFormValues | null>(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  const onSubmit = (values: ProjectFormValues) => {
    setSubmitted(values);
  };

  return (
    <FormPage
      title="Adicionar projeto"
      subtitle="Fluxo visual para registrar projetos com escolha explícita entre inovação, extensão e pesquisa."
      eyebrow="Gerenciador de projetos"
      metrics={[
        { label: "Linha do projeto", value: "3 opções", detail: "A categoria fica clara antes da entrada dos demais dados." },
        { label: "Campos principais", value: "Título + resumo", detail: "Estrutura compatível com cards, listagens e página detalhada." },
        { label: "Organização", value: "Padronizada", detail: "Pronto para trabalhar com contexto e estado depois." },
      ]}
      sideTitle="Decisão principal da página"
      sideDescription="O card destacado separa o projeto antes do formulário, deixando evidente se ele pertence a inovação, extensão ou pesquisa."
      sideNotes={[
        { title: "Inovação", description: "Projetos com validação de solução, produto ou serviço." },
        { title: "Extensão", description: "Iniciativas conectadas à comunidade e a demandas do território." },
        { title: "Pesquisa", description: "Estudos, experimentos e produção científica aplicada." },
      ]}
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <FormSectionCard title="Classificação do projeto" description="A seleção abaixo define a trilha de cadastro e facilita o uso futuro em filtros.">
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
                  { value: "inovacao", title: "Inovação", description: "Soluções, protótipos e validação de ideias.", badge: "Aplicada", accent: "blue" },
                  { value: "extensao", title: "Extensão", description: "Projetos de impacto social e aproximação com a comunidade.", badge: "Território", accent: "green" },
                  { value: "pesquisa", title: "Pesquisa", description: "Produção acadêmica, investigação e experimentação.", badge: "Acadêmica", accent: "yellow" },
                ]}
              />
            )}
          />
        </FormSectionCard>

        <FormSectionCard title="Informações do projeto" description="Campos base para título, contexto e resumo do projeto.">
          <div className="grid gap-5 md:grid-cols-2">
            <FormField label="Título do projeto" required error={errors.title?.message}>
              <Input {...register("title")} placeholder="Ex.: Plataforma de Monitoramento de Cultivos" className={errors.title ? "border-red/60 focus-visible:ring-red/30" : ""} />
            </FormField>
            <FormField label="Área principal" required error={errors.area?.message}>
              <FormSelect {...register("area")} className={errors.area ? "border-red/60 focus-visible:ring-red/30" : ""}>
                <option value="sistemas">Sistemas de Informação</option>
                <option value="software">Engenharia de Software</option>
                <option value="redes">Redes de Computadores</option>
                <option value="outro">Outro</option>
              </FormSelect>
            </FormField>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <FormField label="Palavras-chave" hint="Separe por vírgula para facilitar filtros posteriores." error={errors.keywords?.message}>
              <Input {...register("keywords")} placeholder="IA, agricultura, automação" className={errors.keywords ? "border-red/60 focus-visible:ring-red/30" : ""} />
            </FormField>
            <FormField label="Responsável / Orientador" error={errors.responsible?.message}>
              <Input {...register("responsible")} placeholder="Nome do professor ou equipe" className={errors.responsible ? "border-red/60 focus-visible:ring-red/30" : ""} />
            </FormField>
          </div>

          <FormField label="Resumo do projeto" className="mt-5" error={errors.summary?.message}>
            <FormTextarea {...register("summary")} placeholder="Explique objetivo, contexto, público-alvo e estágio atual." className={errors.summary ? "border-red/60 focus-visible:ring-red/30" : ""} />
          </FormField>
        </FormSectionCard>

        <FormSectionCard title="Detalhes operacionais" description="Campos de apoio para a apresentação visual e futura integração com o contexto.">
          <div className="grid gap-5 md:grid-cols-3">
            <FormField label="Ano de início" error={errors.year?.message}>
              <Input {...register("year")} type="number" placeholder="2025" className={errors.year ? "border-red/60 focus-visible:ring-red/30" : ""} />
            </FormField>
            <FormField label="Status" error={errors.status?.message}>
              <FormSelect {...register("status")} className={errors.status ? "border-red/60 focus-visible:ring-red/30" : ""}>
                <option value="andamento">Em andamento</option>
                <option value="concluido">Concluído</option>
                <option value="validacao">Em validação</option>
              </FormSelect>
            </FormField>
            <FormField label="Imagem de destaque" error={errors.imageUrl?.message}>
              <Input {...register("imageUrl")} placeholder="URL da capa ou mídia" className={errors.imageUrl ? "border-red/60 focus-visible:ring-red/30" : ""} />
            </FormField>
          </div>
        </FormSectionCard>

        {submitted ? (
          <FormSectionCard title="Último envio" description="Resumo do payload que o formulário gerou depois da validação.">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-base">Título</p>
                <p className="mt-2 text-sm font-semibold text-black">{submitted.title}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-base">Categoria</p>
                <p className="mt-2 text-sm font-semibold text-black">{submitted.category}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-base">Status</p>
                <p className="mt-2 text-sm font-semibold text-black">{submitted.status}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-base">Ano</p>
                <p className="mt-2 text-sm font-semibold text-black">{submitted.year}</p>
              </div>
            </div>
          </FormSectionCard>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button type="submit" variant="quaternary" className="px-6 py-3" disabled={isSubmitting}>Salvar rascunho</Button>
          <Button type="submit" variant="primary" className="px-6 py-3" disabled={isSubmitting}>Publicar projeto</Button>
        </div>
      </form>
    </FormPage>
  );
}
