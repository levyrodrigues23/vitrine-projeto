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

      <Section title={`O que é um projeto de ${activeCategory.toLowerCase()}?`} align="center">
        <div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-2xl md:flex-row md:items-center md:justify-between md:p-8">
          <Text
            className="text-center md:flex-1 md:text-left"
            as="h2"
            variant="body-lg"
          >
            {categoryMeta.description}
          </Text>
          <div className="mt-8 flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-blue/10 text-blue-dark md:ml-8 md:mt-0">
            <CategoryIcon className="h-16 w-16" />
          </div>
        </div>
      </Section>

      <Section title="Projetos da categoria" showSeparator={false} align="center">
        <NavLink
          to="/projetos"
          className="mb-8 inline-flex text-sm font-semibold text-blue-dark hover:underline"
        >
          ← Voltar para todos os projetos
        </NavLink>

        <label className="mx-auto mb-10 block w-full max-w-xl">
          <span className="mb-2 block text-left text-sm font-semibold text-gray-base-dark">
            Buscar nesta categoria
          </span>
          <Input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder={`Buscar em ${activeCategory}...`}
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
