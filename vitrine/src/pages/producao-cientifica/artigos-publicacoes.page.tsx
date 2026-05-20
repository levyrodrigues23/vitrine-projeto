import { NavLink } from "react-router";
import PageHero from "../../components/layout/page-hero/page-hero";
import { Card, Section, Text, buttonVariants } from "../../components/ui";

export default function ArtigosPublicacoesPage() {
  const papers = [
    {
      title: "Avaliacao de modelos de IA para educacao",
      authors: "Equipe de Pesquisa em Dados",
      year: "2024",
    },
    {
      title: "Solucoes digitais para gestao academica",
      authors: "Laboratorio de Sistemas",
      year: "2023",
    },
    {
      title: "Tecnologias para inclusao e acessibilidade",
      authors: "Grupo de Inovacao Educacional",
      year: "2023",
    },
  ];

  return (
    <>
      <PageHero
        title="Artigos e Publicacoes"
        subtitle="Trabalhos aceitos e publicados por estudantes e servidores do campus."
      />
      <Section title="Publicacoes recentes">
        <Text as="h2" variant="body-lg" className="text-center md:text-left">
          Selecao de artigos e publicacoes com foco nas linhas de pesquisa do
          campus e nos trabalhos aceitos em periodicos e coletaneas.
        </Text>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {papers.map((paper) => (
            <Card
              key={paper.title}
              className="p-6 space-y-3 text-center md:text-left"
            >
              <Text as="h3" variant="body-lg-bold">
                {paper.title}
              </Text>
              <Text variant="body-md" className="text-gray-base">
                {paper.authors}
              </Text>
              <Text variant="body-md" className="text-gray-base">
                Ano: {paper.year}
              </Text>
            </Card>
          ))}
        </div>
      </Section>
      <Section title="Voltar" showSeparator={false}>
        <NavLink
          to="/producao-cientifica"
          className={buttonVariants({ variant: "quaternary", size: "md" })}
        >
          Voltar para Producao Cientifica
        </NavLink>
      </Section>
    </>
  );
}
