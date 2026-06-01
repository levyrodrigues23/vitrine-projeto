import { useEffect, useMemo } from "react";
import { useLocation } from "react-router";
import PageHero from "../../components/layout/page-hero/page-hero";
import { ProjectCard, ProjectFilter } from "../../components/features";
import { ProjectCategory } from "../../types/project.types";
import { useProjects } from "../../hooks/useProjects";
import { useProjectStore } from "../../store/useProjectStore";

function categoryFromPath(pathname: string): "all" | ProjectCategory {
  if (pathname.endsWith("/pesquisa")) return ProjectCategory.Pesquisa;
  if (pathname.endsWith("/extensao")) return ProjectCategory.Extensao;
  if (pathname.endsWith("/inovacao")) return ProjectCategory.Inovacao;
  return "all";
}

export function ProjectListPage() {
  const { pathname } = useLocation();
  const activeCategory = categoryFromPath(pathname);

  const { projects, loading, error } = useProjects();
  const storeActiveCategory = useProjectStore((state) => state.activeCategory);
  const searchQuery = useProjectStore((state) => state.searchQuery);
  const setActiveCategory = useProjectStore((state) => state.setActiveCategory);

  useEffect(() => {
    setActiveCategory(activeCategory);
  }, [activeCategory, setActiveCategory]);

  const filtered = useMemo(() => {
    const list =
      storeActiveCategory === "all"
        ? projects
        : projects.filter((p) => p.category === storeActiveCategory);
    const q = searchQuery.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.keywords?.some((k) => k.toLowerCase().includes(q)),
    );
  }, [projects, searchQuery, storeActiveCategory]);

  return (
    <>
      <PageHero
        title="Projetos"
        subtitle="Veja os projetos da categoria selecionada ou busque por palavra-chave."
      />
      <section
        className="mx-auto w-full max-w-6xl px-6 pb-16"
        aria-label="Catálogo de projetos"
      >
        <ProjectFilter className="pt-4" />

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
