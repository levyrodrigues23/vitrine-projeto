import PageHero from "../../components/layout/page-hero/page-hero";
import { Card, Section, Text } from "../../components/ui";

export function EgressosPage() {
  const courses = [
    {
      title: "Engenharia de Software",
      description: "Egressos atuando em empresas de tecnologia e startups.",
    },
    {
      title: "Sistemas de Informacao",
      description: "Profissionais em analise de dados e gestao de projetos.",
    },
    {
      title: "Redes de Computadores",
      description: "Atuacao em infraestrutura, seguranca e suporte tecnico.",
    },
  ];

  return (
    <>
      <PageHero
        title="Egressos por Curso"
        subtitle="Panorama dos egressos do campus e suas areas de atuacao."
      />
      <Section title="Sobre os egressos" description="Esta pagina apresenta um panorama dos egressos por curso, destacando
          caminhos profissionais, mercados de atuacao e trajetorias academicas.">
        <Text as="h2" variant="body-lg" className="text-center md:text-left">
          
        </Text>
      </Section>
      <Section title="Cursos e atuacoes" showSeparator={false}>
        <Text as="h2" variant="body-lg" className="text-center md:text-left">
          Selecao de cursos com exemplos de areas em que os egressos atuam.
        </Text>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card
              key={course.title}
              className="p-6 space-y-3 text-center md:text-left"
            >
              <Text as="h3" variant="body-lg-bold">
                {course.title}
              </Text>
              <Text variant="body-md" className="text-gray-base">
                {course.description}
              </Text>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
