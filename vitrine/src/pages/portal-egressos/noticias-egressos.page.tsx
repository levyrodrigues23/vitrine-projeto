import PageHero from "../../components/layout/page-hero/page-hero";
import { Card, Section, Text } from "../../components/ui";

export function NoticiasEgressosPage() {
  const news = [
    {
      title: "Egresso participa de pesquisa internacional",
      description:
        "Ex-aluno integra grupo de pesquisa em universidade parceira.",
      date: "Mar 2026",
    },
    {
      title: "Projeto de egresso vira negocio local",
      description:
        "Solucao criada no campus se transforma em servico regional.",
      date: "Fev 2026",
    },
    {
      title: "Egressa assume lideranca em empresa de tecnologia",
      description: "Trajetoria profissional reconhecida em evento regional.",
      date: "Jan 2026",
    },
  ];

  return (
    <>
      <PageHero
        title="Noticias dos Egressos"
        subtitle="Destaques e noticias sobre atuacoes de egressos do campus."
      />
      <Section title="Destaques">
        <Text as="h2" variant="body-lg" className="text-center md:text-left">
          Noticias pontuais sobre atuacoes cientificas, profissionais e projetos
          realizados por egressos do Campus Itapaje.
        </Text>
      </Section>
      <Section title="Noticias recentes" showSeparator={false}>
        <Text as="h2" variant="body-lg" className="text-center md:text-left">
          Selecao de noticias e destaques recentes da comunidade de egressos.
        </Text>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <Card
              key={item.title}
              className="p-6 space-y-3 text-center md:text-left"
            >
              <Text as="h3" variant="body-lg-bold">
                {item.title}
              </Text>
              <Text variant="body-md" className="text-gray-base">
                {item.description}
              </Text>
              <Text variant="body-md" className="text-gray-base">
                {item.date}
              </Text>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
