import PageHero from "../../components/layout/page-hero/page-hero";
import { Card, Section, Text } from "../../components/ui";

export function StartupsPage() {
  const startups = [
    {
      title: "Projeto Atlas",
      description:
        "Plataforma para mapear oportunidades e conectar estudantes.",
    },
    {
      title: "AgroData",
      description:
        "Solucao para apoio a produtores com analise de dados locais.",
    },
    {
      title: "Saude Conecta",
      description: "Aplicativo de suporte a campanhas de saude comunitaria.",
    },
  ];

  return (
    <>
      <PageHero
        title="Startups do Campus"
        subtitle="Projetos em fase de validacao e iniciativas com potencial de negocio."
      />
      <Section title="Sobre as startups">
        <Text as="h2" variant="body-lg" className="text-center md:text-left">
          Esta pagina apresenta startups e iniciativas nascidas no Campus
          Itapaje. Sao projetos em desenvolvimento que buscam validacao,
          parcerias e apoio para crescimento.
        </Text>
      </Section>
      <Section title="Projetos em andamento" showSeparator={false}>
        <Text as="h2" variant="body-lg" className="text-center md:text-left">
          Veja alguns exemplos de startups em fase inicial ou em evolucao.
        </Text>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {startups.map((startup) => (
            <Card
              key={startup.title}
              className="p-6 space-y-3 text-center md:text-left"
            >
              <Text as="h3" variant="body-lg-bold">
                {startup.title}
              </Text>
              <Text variant="body-md" className="text-gray-base">
                {startup.description}
              </Text>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
