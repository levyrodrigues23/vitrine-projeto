// eu provavelmente terei que relacionar artigos para cada congresso, então preciso pensar na melhor forma de fazer isso. 



import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


import {
  Button,
  FormField,
  FormPage,
  FormSectionCard,

  Input,
} from "../../components/ui";
import {useCreateCongress} from "../../hooks/congress/useCreateCongress.ts";
import type {CreateCongress} from "../../types/congress.types.ts";

const congressSchema = z.object({
  title: z.string().min(3, "Informe o título do congresso."),
  data: z.coerce.date(),
  description: z.string().min(20, "Descreva melhor o resumo."),
  url: z.string().min(3, "Informe o link do site do congresso."),
  local: z.string().min(3, "Informe o local onde ocorre/ocorreu o congresso."),
  tipo: z.enum(["andamento", "finalizado", "a ser publicado"]),
});

type CongressFormValues = z.infer<typeof congressSchema>;

const defaultValues: CongressFormValues = {
  title: "",
  data: new Date(),
  description: "",
  url: "",
  local: "",
  tipo: "andamento",
};

export function AdicionarCongressoPage() {
  const {execute, loading} = useCreateCongress();


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CongressFormValues>({
    resolver: zodResolver(congressSchema),
    defaultValues,
  });

  const onSubmit = (values:CongressFormValues) => {


    const congress: CreateCongress = {
      title: values.title,
      data: values.data.toISOString(),
      description: values.description,
      url: values.url,
      local: values.local,
      tipo: values.tipo,
    };

    execute(congress);
  }

  return (
      <FormPage
          title="Adicionar congresso"
          subtitle="Cadastro de congressos e simpósios com informações do evento."
      >
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <FormSectionCard
                  title="Dados do evento"
                  description="Informações principais do congresso."
              >
                  <div className="grid gap-5 md:grid-cols-2">
                      <FormField label="Título" required error={errors.title?.message}>
                          <Input
                              {...register("title")}
                              placeholder="Ex.: SBSI 2024"
                              className={errors.title ? "border-red/60 focus-visible:ring-red/30" : ""}
                          />
                      </FormField>

                      <FormField label="Data" required error={errors.data?.message}>
                          <Input
                              {...register("data")}
                              type="date"
                              className={errors.data ? "border-red/60 focus-visible:ring-red/30" : ""}
                          />
                      </FormField>

                      <FormField label="Local" required error={errors.local?.message}>
                          <Input
                              {...register("local")}
                              placeholder="Ex.: Fortaleza, CE"
                              className={errors.local ? "border-red/60 focus-visible:ring-red/30" : ""}
                          />
                      </FormField>

                      <FormField label="URL" required error={errors.url?.message}>
                          <Input
                              {...register("url")}
                              placeholder="https://..."
                              className={errors.url ? "border-red/60 focus-visible:ring-red/30" : ""}
                          />
                      </FormField>

                      <FormField label="Status" required error={errors.tipo?.message}>
                          <select {...register("tipo")} className="w-full border rounded-md px-3 py-2">
                              <option value="andamento">Em andamento</option>
                              <option value="finalizado">Finalizado</option>
                              <option value="a ser publicado">A ser publicado</option>
                          </select>
                      </FormField>
                  </div>
              </FormSectionCard>

              <FormSectionCard title="Descrição" description="Resumo do congresso.">
                  <FormField label="Descrição" required error={errors.description?.message}>
                      <Input
                          {...register("description")}
                          placeholder="Descreva o congresso..."
                          className={errors.description ? "border-red/60 focus-visible:ring-red/30" : ""}
                      />
                  </FormField>
              </FormSectionCard>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <Button
                      type="submit"
                      variant="primary"
                      className="px-6 py-3"
                      disabled={isSubmitting || loading}
                  >
                      Salvar congresso
                  </Button>
              </div>
          </form>
      </FormPage>
  );
}

