import { useEffect, useMemo } from "react";
import PageHero from "../../components/layout/page-hero/page-hero";
import { Section, Text } from "../../components/ui";
import ProjectIcon from "../../assets/icons/projetos-icon.svg";
import { useProjects } from "../../hooks/useProjects";
import { ProjectCard, ProjectFilter } from "../../components/features";
import { useProjectStore } from "../../store/useProjectStore";

export function ProjectsPage() {
  const { projects, loading, error } = useProjects();
  const activeCategory = useProjectStore((state) => state.activeCategory);
  const searchQuery = useProjectStore((state) => state.searchQuery);
  const setActiveCategory = useProjectStore((state) => state.setActiveCategory);

  useEffect(() => {
    setActiveCategory("all");
  }, [setActiveCategory]);

  const filtered = useMemo(() => {
    const list =
      activeCategory === "all"
        ? projects
        : projects.filter((project) => project.category === activeCategory);
    const query = searchQuery.trim().toLowerCase();
    if (!query) return list;
    return list.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query)
    );
  }, [activeCategory, projects, searchQuery]);

  return (
    <>
      <PageHero
        title="Projetos"
        subtitle="Conheça os projetos do campus organizados por pesquisa, extensão e inovação."
      />

      <Section title="Como os projetos são organizados?" align="center">
        <div className="flex md:flex-row flex-col bg-white p-4 rounded-2xl text-shadow-olive-200 shadow-2xl">
          <Text className="pt-3 pl-3" as="h2" variant="body-lg">
            O <strong>Portal de Egressos</strong> tem o objetivo de mostrar as
            atividades e ações dos estudantes egressos do Campus, destacando
            suas trajetórias profissionais, acadêmicas e de pesquisa. O portal é
            um espaço para compartilhar notícias, histórias de sucesso,
            oportunidades de networking e recursos para os egressos,
            fortalecendo a conexão entre a instituição e seus ex-alunos. Através
            do portal, os egressos podem se manter informados sobre eventos,
            programas de desenvolvimento profissional e oportunidades de
            colaboração, promovendo uma comunidade ativa e engajada mesmo após a
            conclusão da graduação.
            <br />
          </Text>

          <img
            src={ProjectIcon}
            alt="Icone de uma pessoa com um diploma, simbolizando os egressos do campus."
            className=" w-100 h-100 md:w-72 md:h-72 md:ml-6 "
          />
        </div>
      </Section>
      <Section
        title="Todos os projetos"
        description="Veja aqui todos os projetos"
        align="center"
      >
        <ProjectFilter className="pt-4" />

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
