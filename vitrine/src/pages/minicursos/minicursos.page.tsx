import { useMemo, useState } from "react";
import PageHero from "../../components/layout/page-hero/page-hero";
import {
  Badge,
  Card,
  Section,
  Text,
  buttonVariants,
} from "../../components/ui";
import Minicurso from "../../assets/icons/mini-course.svg"
import { useMinicourses } from "../../hooks/minicourse/useMinicourses";


export function MinicursosPage() {
  const [filter, setFilter] = useState<"all" | "interno" | "externo">("all");
  const { minicourses, loading, error } = useMinicourses();

  const filtered = useMemo(() => {
    if (filter === "all") return minicourses;
    return minicourses.filter((course) => course.publico === filter);
  }, [filter, minicourses]);

  return (
    <>
      <PageHero
        title="Minicursos"
        subtitle="Cursos de curta duracao para publico interno e externo do campus."
      />
      <Section title="Sobre os minicursos" align="center">
        <div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-2xl md:flex-row md:items-start md:p-8">
          <Text
            className="text-center md:text-left"
            as="h2"
            variant="body-lg"
          >
            Os <strong>Minicursos</strong> têm o objetivo de capacitar a comunidade com conhecimentos práticos e focados. Eles abrangem áreas diversas como tecnologia, gestão e inovação, servindo como uma ponte entre o ambiente acadêmico e as necessidades do mercado.
            <br />
            <br />
            Essas formações de curta duração são ideais tanto para estudantes que buscam aperfeiçoamento extracurricular, quanto para a comunidade externa que quer desenvolver novas habilidades essenciais.
          </Text>

          <img
            src={Minicurso}
            alt="Ilustração de pessoa com diploma simbolizando cursos e formação"
            className="mt-8 w-56 object-contain md:ml-8 md:mt-0 md:w-72"
          />
        </div>
      </Section>
      <Section
        title="Filtrar por tipo"
        description="Escolha o tipo de publico para visualizar os minicursos disponiveis."
        showSeparator={false}
        align="center"
      >
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
          {loading ? (
            <p>Carregando minicursos...</p>
          ) : error ? (
            <p>Erro ao carregar minicursos</p>
          ) : filtered.length === 0 ? (
            <p>Nenhum minicurso encontrado</p>
          ) : (
            filtered.map((course) => (
              <Card
                key={course.id}
                className="flex flex-col items-center p-6 space-y-3 text-center md:items-start md:text-left"
              >
                <div className="flex flex-col items-center gap-2 md:flex-row md:justify-start">
                  <Text as="h3" variant="body-lg-bold">
                    {course.title}
                  </Text>
                  <Badge variant="secondary" className="ml-0">
                    {course.publico === "interno" ? "Interno" : "Externo"}
                  </Badge>
                </div>
                <Text variant="body-md" className="text-gray-base">
                  {course.description}
                </Text>
                <Text variant="body-md" className="text-gray-base">
                  Organizadores: {course.organizers}
                </Text>
              </Card>
            ))
          )}
        </div>
      </Section>
    </>
  );
}
