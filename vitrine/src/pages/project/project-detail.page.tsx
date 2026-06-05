import { Navigate, useNavigate, useParams } from "react-router";
import { Badge, Button, Text } from "../../components/ui";
import { TeacherCard } from "../../components/features";
import { WorksDone } from "../../components/features/trabalhos-feitos/trabalhos-feitos";
import Separator from "../../components/layout/separator/separator";
import { MOCK_TEACHERS } from "../../constants/mock-data";
import { useDeleteProject, useProject } from "../../hooks/project";
import { useAuthStore } from "../../store/useAuthStore";

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
  const navigate = useNavigate();
  const { project, loading, error } = useProject(id);
  const { execute: deleteProject, loading: isDeleting } = useDeleteProject();
  const user = useAuthStore((state) => state.user);

  const handleDelete = async () => {
    if (!id || !window.confirm("Tem certeza que deseja excluir este projeto?")) {
      return;
    }

    const result = await deleteProject(id);
    if (result.success) {
      navigate("/projetos");
      return;
    }

    alert(result.error ?? "Erro ao excluir projeto");
  };

  if (loading) {
    return (
      <p className="py-12 text-center text-gray-base" role="status">
        Carregando projeto...
      </p>
    );
  }

  if (error) {
    return (
      <p className="py-12 text-center text-gray-base" role="alert">
        Erro: {error}
      </p>
    );
  }

  if (!project) {
    return <Navigate to="/projetos" replace />;
  }

  const heroImage =
    project.imageUrl ??
    "https://www.sintufce.org.br/wp-content/uploads/2024/10/Itapaje-scaled.jpg";
  const canEdit = user && (user.role === "admin" || project.authorId === user.id);

  return (
    <main className="flex flex-col">
      <section className="relative isolate min-h-105 overflow-hidden">
        <img
          src={heroImage}
          alt={`Imagem de destaque do projeto ${project.title}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.48), rgba(0, 0, 0, 0.22))",
          }}
        />
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-16 md:py-24">
          <Badge variant="secondary" className="ml-0 w-fit px-3 py-1 text-xs">
            {project.category}
          </Badge>
          <Text as="h1" variant="title-2" className="max-w-3xl text-white">
            {project.title}
          </Text>
          <Text as="p" variant="body-lg" className="max-w-2xl text-white/85">
            {project.description}
          </Text>

          {canEdit ? (
            <div
              className="mt-6 flex flex-col gap-3 sm:flex-row"
              aria-label="Ações administrativas do projeto"
            >
              <Button
                variant="primary"
                onClick={() => navigate(`/gerenciador/projetos/${project.id}/editar`)}
              >
                Editar projeto
              </Button>
              {user.role === "admin" ? (
                <Button
                  variant="tertiary"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Excluindo..." : "Excluir projeto"}
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl space-y-12 px-6 py-12">
        <section className="space-y-4" aria-labelledby="project-description">
          <Text
            as="h2"
            id="project-description"
            variant="title-3"
            className="text-black"
          >
            Descrição do projeto
          </Text>
          <div className="rounded-2xl border border-gray-base/20 bg-white/90 p-8 shadow-sm">
            <Text as="p" variant="body-md" className="text-gray-base">
              {project.description}
            </Text>
          </div>
        </section>

        <Separator spacing="lg" />

        <section className="space-y-6" aria-labelledby="project-objectives">
          <Text
            as="h2"
            id="project-objectives"
            variant="title-3"
            className="text-black"
          >
            Objetivos
          </Text>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {objectives.map((objective) => (
              <article
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
                <Text as="p" variant="body-md">
                  {objective.description}
                </Text>
              </article>
            ))}
          </div>
        </section>

        <Separator spacing="lg" />

        <section className="space-y-6" aria-labelledby="project-teachers">
          <Text
            as="h2"
            id="project-teachers"
            variant="title-3"
            className="text-black"
          >
            Professor responsável
          </Text>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {MOCK_TEACHERS.slice(0, 2).map((teacher) => (
              <TeacherCard
                key={teacher.id}
                name={teacher.name}
                role={teacher.role || "Professor"}
                imageUrl={teacher.imageUrl || ""}
                githubUrl={teacher.githubUrl}
                lattesUrl={teacher.lattesUrl}
              />
            ))}
          </div>
        </section>

        <Separator spacing="lg" />

        <section className="space-y-6" aria-labelledby="project-works">
          <Text
            as="h2"
            id="project-works"
            variant="title-3"
            className="text-black"
          >
            Trabalhos feitos
          </Text>
          {project.worksDone?.length ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {project.worksDone.map((work, index) => (
                <WorksDone key={`${work.title}-${index}`} {...work} />
              ))}
            </div>
          ) : (
            <Text as="p" variant="body-md" className="text-gray-base">
              Nenhum trabalho vinculado a este projeto ainda.
            </Text>
          )}
        </section>
      </div>
    </main>
  );
}
