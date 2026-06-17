import { Navigate, useNavigate, useParams } from "react-router";
import { Badge, Button, Text } from "../../components/ui";
import { WorksDone } from "../../components/features/trabalhos-feitos/trabalhos-feitos";
import Separator from "../../components/layout/separator/separator";
import { useDeleteProject, useProject } from "../../hooks/project";
import { useAuthStore } from "../../store/useAuthStore";


export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { project, loading, error } = useProject(id);
  const { execute: deleteProject, loading: isDeleting } = useDeleteProject();
  const user = useAuthStore((state) => state.user);

  const canEdit =
    !!user &&
    (user.role === "admin" || user.role === "gerenciador");

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



  return (
    <main className="flex flex-col">
      <section className="relative isolate flex min-h-[500px] w-full flex-col justify-end overflow-hidden pb-16 pt-32 md:min-h-[600px] md:pb-24">
        <img
          src={project.imageUrl}
          alt={`Imagem de destaque do projeto ${project.title}`}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 -z-10"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 60%, transparent 100%), linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-4 px-6">
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
              {user?.role === "admin" ? (
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

        {project.responsible && (
          <>
            <Separator spacing="lg" />
            <section className="space-y-4" aria-labelledby="project-responsible">
              <Text
                as="h2"
                id="project-responsible"
                variant="title-3"
                className="text-black"
              >
                Responsável
              </Text>
              <div className="rounded-2xl border border-gray-base/20 bg-white/90 p-8 shadow-sm">
                <Text as="p" variant="body-md" className="text-gray-base">
                  {project.responsible}
                </Text>
              </div>
            </section>
          </>
        )}

        {project.worksDone?.length ? (
          <>
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
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {project.worksDone.map((work, index) => (
                  <WorksDone key={`${work.title}-${index}`} {...work} />
                ))}
              </div>
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}
