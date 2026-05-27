import { useMemo, useState } from "react";
import { NavLink, useLocation, useSearchParams } from "react-router";
import PageHero from "../../components/layout/page-hero/page-hero";
import { ProjectCard } from "../../components/features";
import { BlockHelp, Input, Text } from "../../components/ui";
import { ProjectCategory } from "../../types/project.types";
import { useProjects } from "../../hooks/useProjects";

const CATEGORY_LINKS: {
  id: "all" | ProjectCategory;
  label: string;
  to: string;
}[] = [
  { id: "all", label: "Todos", to: "/projetos" },
  { id: ProjectCategory.Pesquisa, label: "Pesquisa", to: "/projetos/pesquisa" },
  { id: ProjectCategory.Extensao, label: "Extensão", to: "/projetos/extensao" },
  { id: ProjectCategory.Inovacao, label: "Inovação", to: "/projetos/inovacao" },
];

function categoryFromPath(pathname: string): "all" | ProjectCategory {
  if (pathname.endsWith("/pesquisa")) return ProjectCategory.Pesquisa;
  if (pathname.endsWith("/extensao")) return ProjectCategory.Extensao;
  if (pathname.endsWith("/inovacao")) return ProjectCategory.Inovacao;
  return "all";
}

export function ProjectListPage() {
  const { pathname } = useLocation();
  const activeCategory = categoryFromPath(pathname);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("busca") ?? "";
  const [query, setQuery] = useState(initialQuery);

  const { projects, loading, error } = useProjects();

  const filtered = useMemo(() => {
    const list =
      activeCategory === "all"
        ? projects
        : projects.filter((p) => p.category === activeCategory);
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.keywords?.some((k) => k.toLowerCase().includes(q)),
    );
  }, [activeCategory, query, projects]);

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
        <div className="mb-6 flex flex-col items-center gap-2 text-center sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3">
          <Text as="h2" variant="title-3" className="text-black">
            Catálogo
          </Text>
          <BlockHelp
            topicLabel="catálogo e filtros"
            explanation="Use as categorias para ver só pesquisa, extensão ou inovação. A busca filtra por título, descrição ou palavras-chave dos projetos."
          />
        </div>

        <div
          className="mb-8 flex flex-wrap justify-center gap-2"
          role="toolbar"
          aria-label="Filtrar projetos por categoria"
        >
          {CATEGORY_LINKS.map(({ id, label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={id === "all"}
              className={({ isActive }) =>
                `rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-dark ${
                  isActive
                    ? "border-blue-dark bg-blue-dark text-white"
                    : "border-gray-base/25 bg-white text-black hover:border-blue/40"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearchParams(query ? { busca: query } : {});
          }}
          className="mx-auto mb-10 block max-w-xl"
        >
          <label>
            <span className="mb-2 block text-left text-sm font-semibold text-gray-base-dark">
              Buscar
            </span>
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Digite algo"
              aria-label="Buscar projetos por nome ou palavra-chave"
              className="h-11 bg-white"
            />
          </label>
        </form>

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
