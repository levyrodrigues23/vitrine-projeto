import PageHero from "../../components/layout/page-hero/page-hero";
import { Card, Section, Text } from "../../components/ui";

export function EmpresaJrPage() {
  const projects = [
    {
      title: "Diagnóstico digital",
      description: "Mapeamento de processos para pequenas empresas locais.",
    },
    {
      title: "Identidade visual",
      description: "Projeto de comunicação para iniciativas comunitárias.",
    },
    {
      title: "Automação simples",
      description: "Planilhas e rotinas para melhorar a gestão de dados.",
    },
  ];

  return (
    <>
      <PageHero
        title="Empresa Jr"
        subtitle="Projetos de consultoria e experiências práticas com impacto local."
      />
      <Section
        title="Sobre a Empresa Jr"
        description="A Empresa Jr promove experiências práticas para alunos, oferecendo projetos de consultoria, tecnologia e apoio a negócios locais."
        align="center"
      />
      <Section
        title="Projetos recentes"
        description="Exemplos de entregas realizadas por equipes da Empresa Jr."
        showSeparator={false}
        align="center"
      >
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.title}
              className="flex flex-col items-center p-6 space-y-3 text-center md:items-start md:text-left"
            >
              <Text as="h3" variant="body-lg-bold">
                {project.title}
              </Text>
              <Text variant="body-md" className="text-gray-base">
                {project.description}
              </Text>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
