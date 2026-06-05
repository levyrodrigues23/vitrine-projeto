import { useMemo } from "react";
import Hero from "../../components/layout/hero-section/hero";
import { Section, Card, Text } from "../../components/ui";
import { ProjectCard } from "../../components/features";
import { useProjects } from "../../hooks/project";
import { PROJECT_CATEGORIES } from "../../constants/project-categories";
import {
  countProjectsByCategory,
  formatCategoryProjectCount,
} from "../../utils/project-utils";
import banner1 from "../../assets/images/teste1.jpg";
import banner2 from "../../assets/images/teste2.jpg";
import { NavLink } from "react-router";
import { ArrowRight } from "lucide-react";

export function HomePage() {
  const { projects, loading, error } = useProjects();

  const featuredProjects = projects.slice(0, 3);
  const moreProjects = projects.slice(3, 6);

  const categoryCounts = useMemo(
    () => countProjectsByCategory(projects),
    [projects],
  );

  return (
    <>
      <Hero
        staticTitle="Vitrine de"
        animatedWords={["Projetos.", "Pesquisas.", "Inovações.", "Extensão."]}
        subtitle="Pesquisa, inovação e extensão do Campus Itapajé em um só lugar."
        images={[banner1, banner2]}
        showSearch
        searchItems={projects}
      />

      <Section
        title="Projetos em Destaque"
        description="Conheça alguns dos nossos principais projetos desenvolvidos no campus."
        align="left"
      >
        <div className="mb-5 flex items-center justify-end">
          <NavLink
            to="/projetos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-dark transition hover:gap-3"
          >
            Ver todos <ArrowRight className="h-4 w-4" />
          </NavLink>
        </div>

        {loading ? (
          <p className="text-gray-base">Carregando projetos em destaque...</p>
        ) : error ? (
          <p className="text-red-500">Erro ao carregar os projetos.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                to={`/projetos/${project.id}`}
                title={project.title}
                description={project.description}
                category={project.category}
                imageUrl={project.imageUrl}
              />
            ))}
          </div>
        )}
      </Section>

      <Section
        title="Explore por Categoria"
        description="Acesse os projetos por área de interesse e encontre mais rápido o que você procura."
        align="center"
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {PROJECT_CATEGORIES.map((meta) => {
            const Icon = meta.icon;
            const count = error ? 0 : (categoryCounts[meta.category] ?? 0);

            return (
              <Card
                key={meta.label}
                className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-gray-base/15 bg-white p-6 text-center shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue/10 text-blue-dark">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <Text as="h3" variant="body-lg-bold">
                    {meta.label}
                  </Text>
                  <Text variant="body-md" className="text-gray-base">
                    {formatCategoryProjectCount(count, meta.label)}
                  </Text>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section
        title="Mais Projetos"
        description="Outros registros que também merecem atenção e mostram a variedade da vitrine."
      >
        {loading ? (
          <p className="text-gray-base">Carregando mais projetos...</p>
        ) : error ? (
          <p className="text-red-500">Erro ao carregar os projetos.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {moreProjects.map((project) => (
              <ProjectCard
                key={project.id}
                to={`/projetos/${project.id}`}
                title={project.title}
                description={project.description}
                category={project.category}
                imageUrl={project.imageUrl}
              />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
