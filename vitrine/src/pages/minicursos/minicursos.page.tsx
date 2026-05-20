import { useMemo, useState } from "react";
import PageHero from "../../components/layout/page-hero/page-hero";
import {
  Badge,
  Card,
  Section,
  Text,
  buttonVariants,
} from "../../components/ui";

export function MinicursosPage() {
  const [filter, setFilter] = useState<"all" | "interno" | "externo">("all");
  const courses = [
    {
      title: "Introducao ao desenvolvimento web",
      type: "interno",
      description: "Conteudo introdutorio para alunos do campus.",
      period: "Junho de 2026",
    },
    {
      title: "Analise de dados para iniciantes",
      type: "externo",
      description: "Minicurso aberto para comunidade externa.",
      period: "Julho de 2026",
    },
    {
      title: "Ferramentas de design para projetos",
      type: "interno",
      description: "Apoio visual para projetos academicos e extensionistas.",
      period: "Agosto de 2026",
    },
  ];

  const filtered = useMemo(() => {
    if (filter === "all") return courses;
    return courses.filter((course) => course.type === filter);
  }, [filter, courses]);

  return (
    <>
      <PageHero
        title="Minicursos"
        subtitle="Cursos de curta duracao para publico interno e externo do campus."
      />
      <Section title="Sobre os minicursos">
        <Text as="h2" variant="body-lg" className="text-center md:text-left">
          Esta pagina lista as ofertas de minicursos do Campus Itapaje. As
          atividades podem ser destinadas ao publico interno (alunos e
          servidores) ou ao publico externo, com indicacao do tipo em cada
          minicurso.
        </Text>
      </Section>
      <Section title="Filtrar por tipo" showSeparator={false}>
        <Text as="h2" variant="body-lg" className="text-center md:text-left">
          Escolha o tipo de publico para visualizar os minicursos disponiveis.
        </Text>
        <div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={buttonVariants({
              variant: filter === "all" ? "primary" : "secondary",
              size: "md",
            })}
          >
            Todos
          </button>
          <button
            type="button"
            onClick={() => setFilter("interno")}
            className={buttonVariants({
              variant: filter === "interno" ? "primary" : "secondary",
              size: "md",
            })}
          >
            Publico interno
          </button>
          <button
            type="button"
            onClick={() => setFilter("externo")}
            className={buttonVariants({
              variant: filter === "externo" ? "primary" : "secondary",
              size: "md",
            })}
          >
            Publico externo
          </button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <Card
              key={course.title}
              className="p-6 space-y-3 text-center md:text-left"
            >
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Text as="h3" variant="body-lg-bold">
                  {course.title}
                </Text>
                <Badge variant="secondary" className="ml-0">
                  {course.type === "interno" ? "Interno" : "Externo"}
                </Badge>
              </div>
              <Text variant="body-md" className="text-gray-base">
                {course.description}
              </Text>
              <Text variant="body-md" className="text-gray-base">
                Periodo: {course.period}
              </Text>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
