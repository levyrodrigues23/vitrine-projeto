import { NavLink } from "react-router";
import PageHero from "../../components/layout/page-hero/page-hero";
import { Card, Section, Text, buttonVariants } from "../../components/ui";

export function ProjectsPage() {
  return (
    <>
      <PageHero
        title="Projetos"
        subtitle="Conheça os projetos do campus organizados por pesquisa, extensão e inovação."
      />
      <Section title="Como os projetos sao organizados">
        <Text as="h2" variant="body-lg" className="text-center md:text-left">
          Os projetos do Campus Itapaje sao divididos em tres categorias
          principais. Cada area reune iniciativas com objetivos especificos e
          permite uma navegacao mais clara para quem busca pesquisa, extensao ou
          inovacao.
        </Text>
      </Section>
      <Section title="Categorias" showSeparator={false}>
        <Text as="h2" variant="body-lg" className="text-center md:text-left">
          Acesse a categoria desejada para ver os projetos disponiveis.
        </Text>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6 space-y-4 text-center md:text-left">
            <Text as="h3" variant="body-lg-bold">
              Pesquisa
            </Text>
            <Text variant="body-md" className="text-gray-base">
              Estudos e investigacoes conduzidas por alunos e docentes.
            </Text>
            <NavLink
              to="/projetos/pesquisa"
              className={buttonVariants({ variant: "primary", size: "md" })}
            >
              Ver projetos de pesquisa
            </NavLink>
          </Card>
          <Card className="p-6 space-y-4 text-center md:text-left">
            <Text as="h3" variant="body-lg-bold">
              Extensao
            </Text>
            <Text variant="body-md" className="text-gray-base">
              Acoes e projetos voltados para a comunidade externa.
            </Text>
            <NavLink
              to="/projetos/extensao"
              className={buttonVariants({ variant: "secondary", size: "md" })}
            >
              Ver projetos de extensao
            </NavLink>
          </Card>
          <Card className="p-6 space-y-4 text-center md:text-left">
            <Text as="h3" variant="body-lg-bold">
              Inovacao
            </Text>
            <Text variant="body-md" className="text-gray-base">
              Solucoes aplicadas e prototipos com foco em impacto.
            </Text>
            <NavLink
              to="/projetos/inovacao"
              className={buttonVariants({ variant: "quaternary", size: "md" })}
            >
              Ver projetos de inovacao
            </NavLink>
          </Card>
        </div>
      </Section>
    </>
  );
}
