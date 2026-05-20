import PageHero from "../../components/layout/page-hero/page-hero";
import { Card, Section, Text } from "../../components/ui";

export function EditaisPage() {
  const calls = [
    {
      title: "Edital de Inovacao 2026",
      description: "Apoio financeiro para projetos com impacto local.",
    },
    {
      title: "Programa de Pre-Aceleracao",
      description: "Mentorias e suporte para validar modelos de negocio.",
    },
    {
      title: "Desafio Campus Aberto",
      description: "Oportunidades para solucao de problemas da comunidade.",
    },
  ];

  return (
    <>
      <PageHero
        title="Editais e Oportunidades"
        subtitle="Chamadas e oportunidades de fomento para projetos do campus."
      />
      <Section title="Sobre os editais">
        <Text as="h2" variant="body-lg" className="text-center md:text-left">
          Aqui voce encontra editais, chamadas e oportunidades de fomento para
          projetos de empreendedorismo. Acompanhe prazos, requisitos e linhas de
          apoio disponiveis.
        </Text>
      </Section>
      <Section title="Oportunidades em destaque" showSeparator={false}>
        <Text as="h2" variant="body-lg" className="text-center md:text-left">
          Selecao de oportunidades abertas para equipes do campus.
        </Text>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {calls.map((call) => (
            <Card
              key={call.title}
              className="p-6 space-y-3 text-center md:text-left"
            >
              <Text as="h3" variant="body-lg-bold">
                {call.title}
              </Text>
              <Text variant="body-md" className="text-gray-base">
                {call.description}
              </Text>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
