import PageHero from "../../components/layout/page-hero/page-hero";
import { Card, Section, Text } from "../../components/ui";

export function EmpresaJrPage() {
  const projects = [
    {
      title: "Diagnostico digital",
      description: "Mapeamento de processos para pequenas empresas locais.",
    },
    {
      title: "Identidade visual",
      description: "Projeto de comunicacao para iniciativas comunitarias.",
    },
    {
      title: "Automacao simples",
      description: "Planilhas e rotinas para melhorar a gestao de dados.",
    },
  ];

  return (
    <>
      <PageHero
        title="Empresa Jr"
        subtitle="Projetos de consultoria e experiencias praticas com impacto local."
      />
      <Section title="Sobre a Empresa Jr">
        <Text as="h2" variant="body-lg" className="text-center md:text-left">
          A Empresa Jr promove experiencias praticas para alunos, oferecendo
          projetos de consultoria, tecnologia e apoio a negocios locais.
        </Text>
      </Section>
      <Section title="Projetos recentes" showSeparator={false}>
        <Text as="h2" variant="body-lg" className="text-center md:text-left">
          Exemplos de entregas realizadas por equipes da Empresa Jr.
        </Text>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.title}
              className="p-6 space-y-3 text-center md:text-left"
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
