import Hero from "../../components/layout/hero-section/hero";
import { Section } from "../../components/ui";
import { ProjectCard } from "../../components/features";
import { MOCK_PROJECTS } from "../../constants/mock-data";
import banner1 from "../../assets/images/teste1.jpg";
import banner2 from "../../assets/images/teste2.jpg";
import { ProfessorCard } from "../../components/features/professor-card/professor-card";
import { MOCK_TEACHERS } from "../../constants/mock-data";

export function HomePage() {
  const featuredProjects = MOCK_PROJECTS.slice(0, 3);
  const featuredProfessors = MOCK_TEACHERS.slice(0, 4);

  return (
    <>
      <Hero
        title="Vitrine de Projetos"
        subtitle="Pesquisa, inovacao e extensao do Campus Itapaje em um so lugar. Encontre projetos, areas e professores e acompanhe os resultados."
        images={[banner1, banner2]}
        showSearch
        showSeparator
      />

      <Section
        title="Projetos em Destaque"
        description="Veja nossos principais projetos feitos para a comunidade acadêmica."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
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
      </Section>

      <Section
        title="Atalhos por categoria"
        description="Encontre projetos por categoria e área de interesse."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {featuredProfessors.map((professor) => (
            <ProfessorCard
              key={professor.id}
              name={professor.name}
              imageUrl={professor.imageUrl}
            />
          ))}
        </div>
      </Section>

      <Section
        title="Projetos em destaque"
        description="Confira os projetos mais recentes e populares em nosso campus!"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-green-base rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="h-40 bg-white/30 rounded mb-4" />
              <h3 className="font-semibold text-black mb-2">Projeto {i}</h3>
              <p className="text-sm text-gray-base">
                Conteúdo será carregado em breve...
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
