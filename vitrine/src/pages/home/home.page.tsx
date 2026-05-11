import Hero from "../../components/layout/hero-section/hero";
import { Card, Input, Section } from "../../components/ui";
import { ProjectCard } from "../../components/features";
import { MOCK_PROJECTS } from "../../constants/mock-data";
import banner1 from "../../assets/images/teste1.jpg";
import banner2 from "../../assets/images/teste2.jpg";
import Separator from "../../components/layout/separator/separator";
import { ProfessorCard } from "../../components/features/professor-card/professor-card";
import { MOCK_TEACHERS } from "../../constants/mock-data";

export function HomePage() {
  const featuredProjects = MOCK_PROJECTS.slice(0, 3);
  const featuredProfessors = MOCK_TEACHERS.slice(0, 4);

  return (
    <>
      <Hero
        title="Vitrine de Projetos"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        images={[banner1, banner2]}
      />

      

      <Section
        title="Projetos em Destaque"
        description="Veja nossos principais projetos feitos para a comunidade acadêmica."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              category={project.category}
              imageUrl={project.imageUrl}
            />
          ))}
        </div>
      </Section>

      

      <Section
        title="Professores"
        description="Veja os professores que fazem parte dos projetos."
      >
        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {featuredProfessors.map((professor)=>(
              <ProfessorCard
                key={professor.id}
                name={professor.name}
                imageUrl={professor.imageUrl}
              />
            ))}
          </div>
        
      </Section>

      

      <Section
        title="Notícias"
        description="Veja as últimas notícias que saíram na mídia sobre a UFC."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-green-base rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="h-40 bg-white/30 rounded mb-4" />
              <h3 className="font-semibold text-black mb-2">Notícia {i}</h3>
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
