import { NavLink } from "react-router";
import { Card, Text, buttonVariants } from "../../components/ui";
import { useAuthStore } from "../../store/useAuthStore";
import { useProjects } from "../../hooks/useProjects";

const actions = [
  {
    title: "Projeto",
    description: "Pesquisa, extensão ou inovação.",
    to: "/gerenciador/projetos",
    icon: "📁",
    color: "bg-blue/8 border-blue/15 hover:border-blue/30",
    badge: "from-blue/20 to-blue/5",
  },
  {
    title: "Egresso",
    description: "Trajetória e área de atuação.",
    to: "/gerenciador/egressos",
    icon: "🎓",
    color: "bg-white border-gray-200 hover:border-gray-300",
    badge: "from-green-base/20 to-green-base/5",
  },
  {
    title: "Artigo",
    description: "Publicações e produções científicas.",
    to: "/gerenciador/artigos",
    icon: "📄",
    color: "bg-white border-gray-200 hover:border-gray-300",
    badge: "from-yellow/20 to-yellow/5",
  },
  {
    title: "Startup",
    description: "Ideias e iniciativas empreendedoras.",
    to: "/gerenciador/startups",
    icon: "🚀",
    color: "bg-white border-gray-200 hover:border-gray-300",
    badge: "from-red/20 to-red/5",
  },
  {
    title: "Produção Técnica",
    description: "Softwares, patentes e relatórios.",
    to: "/gerenciador/producao-tecnica",
    icon: "⚙️",
    color: "bg-blue-dark/8 border-blue-dark/15 hover:border-blue-dark/30",
    badge: "from-blue-dark/20 to-blue-dark/5",
  },
];

export function GerenciadorPage() {
  const user = useAuthStore((state) => state.user);
  const { projects, loading } = useProjects();
  
  const userProjects = projects.filter((p) => p.authorId === user?.id);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:py-14">
      <div className="mb-10 space-y-1">
        <Text
          as="p"
          variant="body-sm-bold"
          className="uppercase tracking-widest text-gray-base"
        >
          Painel de gestão
        </Text>
        <Text as="h1" variant="title-1" className="text-black">
          Olá, {user?.name?.split(" ")[0] ?? "Gerenciador"}.
        </Text>
        <Text as="p" variant="body-md" className="text-gray-base">
          Selecione o tipo de conteúdo que deseja cadastrar.
        </Text>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map((action) => (
          <Card
            key={action.title}
            className={`group flex flex-col justify-between gap-6 border p-6 transition-all duration-200 ${action.color}`}
          >
            <div className="space-y-3">
              <div
                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br text-2xl ${action.badge}`}
              >
                {action.icon}
              </div>
              <div className="space-y-1">
                <Text as="h3" variant="body-lg-bold" className="text-black">
                  {action.title}
                </Text>
                <Text className="text-gray-base">
                  {action.description}
                </Text>
              </div>
            </div>
            <NavLink
              to={action.to}
              className={`${buttonVariants({ variant: "primary", size: "md" })} w-full justify-center`}
            >
              Adicionar
            </NavLink>
          </Card>
        ))}
      </div>

      <div className="mt-12 space-y-4">
        <Text as="h2" variant="title-3" className="text-black">
          Meus Projetos Publicados
        </Text>
        {loading ? (
          <Text variant="body-sm">Carregando projetos...</Text>
        ) : userProjects.length === 0 ? (
          <Text variant="body-sm" className="text-gray-500">
            Nenhum projeto encontrado no seu usuário.
          </Text>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {userProjects.map((project) => (
              <Card
                key={project.id}
                className="flex items-center justify-between border p-4"
              >
                <div>
                  <Text variant="body-md-bold">{project.title}</Text>
                  <Text variant="body-sm" className="text-gray-500">
                    {project.category}
                  </Text>
                </div>
                <div className="flex gap-4">
                  <NavLink
                    to={`/projetos/${project.id}`}
                    className="text-sm font-medium text-gray-600 hover:underline"
                  >
                    Ver
                  </NavLink>
                  <NavLink
                    to={`/gerenciador/projetos/${project.id}/editar`}
                    className="text-sm font-medium text-blue hover:underline"
                  >
                    Editar
                  </NavLink>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
