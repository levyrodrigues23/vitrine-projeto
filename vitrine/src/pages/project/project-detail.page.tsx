import { Navigate, useParams } from "react-router";
import { Badge, Text } from "../../components/ui";
import { MOCK_TEACHERS } from "../../constants/mock-data";
import { WorksDone } from "../../components/features/trabalhos-feitos/trabalhos-feitos";
import Separator from "../../components/layout/separator/separator";
import { ProfessorCard } from "../../components/features/professor-card/professor-card";
import { useProjects } from "../../hooks/useProjects";

const objectives = [
  {
    id: "01",
    title: "Objetivo geral",
    description:
      "Consolidar entregas alinhadas às diretrizes do projeto e ao público-alvo definido pela equipe.",
  },
  {
    id: "02",
    title: "Objetivos específicos",
    description:
      "Produzir materiais, validar resultados com a comunidade e documentar aprendizados.",
  },
  {
    id: "03",
    title: "Resultados esperados",
    description:
      "Relatórios, protótipos ou publicações que demonstrem o impacto da iniciativa.",
  },
  {
    id: "04",
    title: "Sustentabilidade",
    description:
      "Plano de continuidade para manter a solução após o ciclo inicial de execução.",
  },
];

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { projects, loading, error } = useProjects();
  const project = projects.find((p) => p.id === id);

  if (loading) {
    return <p className="text-center text-gray-base">Carregando...</p>;
  }

  if (error) {
    return <p className="text-center text-gray-base">Erro: {error}</p>;
  }

  if (!project) {
    return <Navigate to="/projetos" replace />;
  }

  const heroImage =
    project.imageUrl ??
    "https://www.sintufce.org.br/wp-content/uploads/2024/10/Itapaje-scaled.jpg";

  return (
    <div className="flex flex-col">
      <section className="relative isolate min-h-[420px] overflow-hidden">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />
        <div className="absolute inset-0" aria-hidden />
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-16 md:py-24">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="ml-0 px-3 py-1 text-xs">
              {project.category}
            </Badge>
            {project.keywords?.map((keyword) => (
              <Badge
                key={keyword}
                variant="outline"
                className="ml-0 border-white/60 px-3 py-1 text-xs text-white"
              >
                {keyword}
              </Badge>
            ))}
          </div>
          <Text as="h1" variant="title-2" className="max-w-3xl text-white">
            {project.title}
          </Text>
          <Text as="p" variant="body-lg" className="max-w-2xl text-white/80">
            {project.description}
          </Text>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl space-y-12 px-6 py-12">
        <section className="space-y-4" data-aos="fade-up">
          <Text as="h2" variant="title-3" className="text-black">
            | Descrição do projeto
          </Text>
          <div className="rounded-2xl border border-gray-base/20 bg-white/90 p-8 shadow-sm">
            <Text variant="body-md" className="text-gray-base">
              {project.description}
            </Text>
          </div>
        </section>

        <Separator spacing="lg" />

        <section className="space-y-6" data-aos="fade-up">
          <Text as="h2" variant="title-3" className="text-black">
            | Objetivos
          </Text>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {objectives.map((objective) => (
              <div
                key={objective.id}
                className="space-y-2 rounded-2xl border border-gray-base/20 bg-white p-5 shadow-sm"
              >
                <Text
                  as="span"
                  variant="body-md-bold"
                  className="text-gray-base-dark"
                >
                  {objective.id}
                </Text>
                <Text as="h3" variant="body-lg-bold" className="text-black">
                  {objective.title}
                </Text>
                <Text variant="body-md">{objective.description}</Text>
              </div>
            ))}
          </div>
        </section>

        <Separator spacing="lg" />

        <section className="space-y-6" data-aos="fade-up">
          <Text as="h2" variant="title-3" className="text-black">
            | Professores envolvidos
          </Text>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {MOCK_TEACHERS.map((teacher) => (
              <ProfessorCard
                key={teacher.id}
                name={teacher.name}
                imageUrl={teacher.imageUrl}
              />
            ))}
          </div>
        </section>

        <Separator spacing="lg" />

        <section className="space-y-6" data-aos="fade-up">
          <Text as="h2" variant="title-3" className="text-black">
            | Trabalhos feitos
          </Text>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {project.worksDone?.map((work, index) => (
              <WorksDone key={index} {...work} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
