import Hero from "../../components/layout/hero-section/hero";
import { useNavigate } from "react-router";
import { Section, Card, Text } from "../../components/ui";
import { ProjectCard, TeacherCard } from "../../components/features";
import { MOCK_PROJECTS, MOCK_TEACHERS } from "../../constants/mock-data";
import banner1 from "../../assets/images/teste1.jpg";
import banner2 from "../../assets/images/teste2.jpg";
import { NavLink } from "react-router";
import {
  Atom,
  Handshake,
  Lightbulb,
  BookOpen,
  ArrowRight,
} from "lucide-react";

export function HomePage() {
  const navigate = useNavigate();

  const handleSearchSubmit = (q: string) => {
    const url = `/projetos?busca=${encodeURIComponent(q)}`;
    navigate(url);
  };
  const featuredProjects = MOCK_PROJECTS.slice(0, 3);
  const moreProjects = MOCK_PROJECTS.slice(3, 6);

  const categories = [
    {
      label: "Pesquisa",
      icon: Atom,
      count: "24 projetos",
      to: "/projetos/pesquisa",
    },
    {
      label: "Extensão",
      icon: Handshake,
      count: "18 projetos",
      to: "/projetos/extensao",
    },
    {
      label: "Inovação",
      icon: Lightbulb,
      count: "12 projetos",
      to: "/projetos/inovacao",
    },
    {
      label: "Ensino",
      icon: BookOpen,
      count: "15 projetos",
      to: "/projetos",
    },
  ];

  return (
    <>
      <Hero
        staticTitle="Vitrine de"
        animatedWords={["Projetos.", "Pesquisas.", "Inovações.", "Extensão."]}
        subtitle="Pesquisa, inovação e extensão do Campus Itapajé em um só lugar."
        images={[banner1, banner2]}
        showSearch
        onSearchSubmit={handleSearchSubmit}
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
      </Section>

      <Section
        title="Explore por Categoria"
        description="Acesse os projetos por área de interesse e encontre mais rápido o que você procura."
        align="center"
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <NavLink key={category.label} to={category.to} className="block">
                <Card className="group flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-gray-base/15 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue/10 text-blue-dark transition group-hover:scale-105">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <Text as="h3" variant="body-lg-bold">
                      {category.label}
                    </Text>
                    <Text variant="body-md" className="text-gray-base">
                      {category.count}
                    </Text>
                  </div>
                </Card>
              </NavLink>
            );
          })}
        </div>
      </Section>

      <Section
        title="Mais Projetos"
        description="Outros registros que também merecem atenção e mostram a variedade da vitrine."
      >
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
      </Section>

      <Section
        title="Corpo Docente"
        description="Conheça os professores que lideram nossos projetos e pesquisas."
        align="center"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_TEACHERS.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              name={teacher.name}
              role={teacher.role || "Professor"}
              imageUrl={teacher.imageUrl || ""}
              githubUrl={teacher.githubUrl}
              lattesUrl={teacher.lattesUrl}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
