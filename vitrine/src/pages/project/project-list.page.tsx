import { useEffect, useMemo } from "react";
import { useLocation } from "react-router";
import PageHero from "../../components/layout/page-hero/page-hero";
import { ProjectCard } from "../../components/features";
import { ProjectCategory } from "../../types/project.types";
import { useProjects } from "../../hooks/useProjects";

function categoryFromPath(pathname: string): "all" | ProjectCategory {
  if (pathname.endsWith("/pesquisa")) return ProjectCategory.Pesquisa;
  if (pathname.endsWith("/extensao")) return ProjectCategory.Extensao;
  if (pathname.endsWith("/inovacao")) return ProjectCategory.Inovacao;
  return "all";
}

const CATEGORY_EXPLANATION: Record<ProjectCategory, string> = {
  [ProjectCategory.Pesquisa]:
    "A pesquisa no campus é focada em produzir conhecimento científico e tecnológico aplicável às necessidades da região, promovendo inovação e a formação de pesquisadores de excelência.",
  [ProjectCategory.Extensao]:
    "Nossos projetos de extensão conectam o conhecimento acadêmico com a comunidade, promovendo ações que geram impacto social, cultural e econômico direto na vida das pessoas.",
  [ProjectCategory.Inovacao]:
    "O pilar de inovação busca criar soluções criativas e tecnológicas para problemas reais, fomentando o empreendedorismo e parcerias com o setor produtivo local.",
};

export function ProjectListPage() {
  const { pathname } = useLocation();
  const activeCategory = categoryFromPath(pathname);

  const { projects, loading, error } = useProjects();

  const filtered = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <>
      <PageHero
        title={`Projetos de ${activeCategory}`}
        subtitle={
          activeCategory !== "all" 
            ? CATEGORY_EXPLANATION[activeCategory] 
            : "Conheça nossos projetos."
        }
      />
      <section
        className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10"
        aria-label={`Catálogo de projetos de ${activeCategory}`}
      >

        {loading ? (
          <p className="text-center text-gray-base">Carregando...</p>
        ) : error ? (
          <p className="text-center text-gray-base">Erro: {error}</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-base">
            Nenhum projeto encontrado com esses critérios.
          </p>
        ) : (
          <ul className="grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <li key={project.id} className="min-h-80">
                <ProjectCard
                  to={`/projetos/${project.id}`}
                  title={project.title}
                  description={project.description}
                  category={project.category}
                  imageUrl={project.imageUrl}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
