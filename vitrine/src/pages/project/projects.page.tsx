import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import PageHero from "../../components/layout/page-hero/page-hero";
import { Section, Text } from "../../components/ui";
import ProjectIcon from "../../assets/icons/projetos-icon.svg";
import { useProjects } from "../../hooks/project";
import {
  ProjectCard,
  ProjectFilter,
  ProjectCategoryNavCard,
} from "../../components/features";
import { useProjectStore } from "../../store/useProjectStore";
import { PROJECT_CATEGORIES } from "../../constants/project-categories";
import {
  countProjectsByCategory,
  filterProjects,
} from "../../utils/project-utils";

export function ProjectsPage() {
  const { projects, loading, error } = useProjects();
  const [searchParams] = useSearchParams();
  const activeCategory = useProjectStore((state) => state.activeCategory);
  const searchQuery = useProjectStore((state) => state.searchQuery);
  const setActiveCategory = useProjectStore((state) => state.setActiveCategory);
  const setSearchQuery = useProjectStore((state) => state.setSearchQuery);

  useEffect(() => {
    setActiveCategory("all"); 
    setSearchQuery("");
  }, [setActiveCategory, setSearchQuery]);

  useEffect(() => {
    const busca = searchParams.get("busca");
    if (busca) {
      setSearchQuery(busca);
    }
  }, [searchParams, setSearchQuery]);

  const categoryCounts = useMemo(
    () => countProjectsByCategory(projects),
    [projects],
  );

  const filtered = useMemo(
    () => filterProjects(projects, activeCategory, searchQuery),
    [activeCategory, projects, searchQuery],
  );

  return (
    <>
      <PageHero
        title="Projetos"
        subtitle="Conheça os projetos do campus organizados por pesquisa, extensão e inovação."
      />

      <Section
        title="Explore por categoria"
        description="Selecione uma área para ver uma página exclusiva com informações e projetos da categoria."
        align="center"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECT_CATEGORIES.map((meta) => (
            <ProjectCategoryNavCard
              key={meta.slug}
              meta={meta}
              count={categoryCounts[meta.category] ?? 0}
            />
          ))}
        </div>
      </Section>

      <Section title="Como os projetos são organizados?" align="center">
        <div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-2xl md:flex-row md:items-start md:p-8">
          <Text
            className="text-center md:text-left"
            as="h2"
            variant="body-lg"
          >
            Os projetos do campus são classificados em três eixos:{" "}
            <strong>pesquisa</strong>, <strong>extensão</strong> e{" "}
            <strong>inovação</strong>. Cada eixo representa uma forma diferente
            de aplicar o conhecimento acadêmico — seja gerando ciência, atuando
            junto à comunidade ou desenvolvendo soluções tecnológicas.
          </Text>

          <img
            src={ProjectIcon}
            alt="Ilustração representando a organização dos projetos acadêmicos"
            className="mt-8 w-56 object-contain md:ml-8 md:mt-0 md:w-72"
          />
        </div>
      </Section>

      <Section
        title="Todos os projetos"
        description="Busque e filtre todos os projetos cadastrados na vitrine."
        align="center"
      >
        <ProjectFilter className="mb-10" />

        {loading ? (
          <p className="text-center text-gray-base">Carregando projetos...</p>
        ) : error ? (
          <p className="text-center text-red-500">
            Erro ao carregar os projetos.
          </p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-base">
            Nenhum projeto encontrado com esses critérios.
          </p>
        ) : (
          <ul className="grid list-none gap-6 p-0 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((projeto) => (
              <li key={projeto.id} className="min-h-80">
                <ProjectCard
                  to={`/projetos/${projeto.id}`}
                  title={projeto.title}
                  description={projeto.description}
                  category={projeto.category}
                  imageUrl={projeto.imageUrl}
                />
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
