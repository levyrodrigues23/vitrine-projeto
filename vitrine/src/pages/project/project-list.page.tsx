import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router";
import PageHero from "../../components/layout/page-hero/page-hero";
import { Input, Section, Text } from "../../components/ui";
import { ProjectCard } from "../../components/features";
import { ProjectCategory } from "../../types/project.types";
import { useProjects } from "../../hooks/project";
import {
  CATEGORY_EXPLANATION,
  PROJECT_CATEGORIES,
} from "../../constants/project-categories";
import { filterProjects } from "../../utils/project-utils";

function categoryFromPath(pathname: string): ProjectCategory | null {
  if (pathname.endsWith("/pesquisa")) return ProjectCategory.Pesquisa;
  if (pathname.endsWith("/extensao")) return ProjectCategory.Extensao;
  if (pathname.endsWith("/inovacao")) return ProjectCategory.Inovacao;
  return null;
}

export function ProjectListPage() {
  const { pathname } = useLocation();
  const activeCategory = categoryFromPath(pathname);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { projects, loading, error } = useProjects();

  const categoryMeta = PROJECT_CATEGORIES.find(
    (meta) => meta.category === activeCategory,
  );

  const filtered = useMemo(() => {
    if (!activeCategory) return [];
    return filterProjects(projects, activeCategory, searchQuery);
  }, [projects, activeCategory, searchQuery]);

  if (!activeCategory || !categoryMeta) {
    return (
      <Section title="Categoria não encontrada" align="center">
        <NavLink to="/projetos" className="font-semibold text-blue-dark">
          ← Voltar para todos os projetos
        </NavLink>
      </Section>
    );
  }

  const CategoryIcon = categoryMeta.icon;

  return (
    <>
      <PageHero
        title={`Projetos de ${activeCategory}`}
        subtitle={CATEGORY_EXPLANATION[activeCategory]}
      />

      <Section align="center">
        <NavLink
          to="/projetos"
          className="mb-6 inline-flex text-sm font-semibold text-blue-dark hover:underline"
        >
          ← Voltar para todos os projetos
        </NavLink>

        <div className="mb-10 flex flex-col items-center gap-4 rounded-2xl border border-gray-base/15 bg-white p-6 text-center shadow-sm md:flex-row md:text-left">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue/10 text-blue-dark">
            <CategoryIcon className="h-7 w-7" />
          </div>
          <div>
            <Text as="h2" variant="body-lg-bold">
              O que é um projeto de {activeCategory.toLowerCase()}?
            </Text>
            <Text variant="body-md" className="mt-2 text-gray-base">
              {categoryMeta.description}
            </Text>
          </div>
        </div>

        <label className="mx-auto mb-10 block w-full max-w-xl">
          <span className="mb-2 block text-left text-sm font-semibold text-gray-base-dark">
            Buscar nesta categoria
          </span>
          <Input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Digite algo"
            aria-label={`Buscar projetos de ${activeCategory}`}
            className="h-11 bg-white"
          />
        </label>

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
      </Section>
    </>
  );
}
