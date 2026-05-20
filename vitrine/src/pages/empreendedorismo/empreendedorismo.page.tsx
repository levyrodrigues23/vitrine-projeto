import { NavLink } from "react-router";
import PageHero from "../../components/layout/page-hero/page-hero";
import { Card, Section, Text, buttonVariants } from "../../components/ui";

export function EmpreendedorismoPage() {
  return (
    <>
      <PageHero
        title="Empreendedorismo"
        subtitle="Startups, editais, fomento e iniciativas que conectam formacao ao ecossistema de inovacao."
      />
      <Section title="Empreendedorismo no campus">
        <Text as="h2" variant="body-lg" className="text-center md:text-left">
          Esta area apresenta os projetos e oportunidades ligados ao
          empreendedorismo do Campus Itapaje. O objetivo e apoiar ideias que
          possam virar negocios, fortalecer a cultura de inovacao e aproximar
          estudantes, professores e parceiros do ecossistema local.
        </Text>
      </Section>
      <Section title="Acessar categorias" showSeparator={false}>
        <Text as="h2" variant="body-lg" className="text-center md:text-left">
          Escolha uma categoria para conhecer iniciativas, editais e projetos
          ligados ao empreendedorismo no campus.
        </Text>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6 space-y-4 text-center md:text-left">
            <Text as="h3" variant="body-lg-bold">
              Startups do Campus
            </Text>
            <Text variant="body-md" className="text-gray-base">
              Ideias em fase de validacao e projetos em evolucao.
            </Text>
            <NavLink
              to="/empreendedorismo/startups"
              className={buttonVariants({ variant: "primary", size: "md" })}
            >
              Ver startups
            </NavLink>
          </Card>
          <Card className="p-6 space-y-4 text-center md:text-left">
            <Text as="h3" variant="body-lg-bold">
              Editais e Oportunidades
            </Text>
            <Text variant="body-md" className="text-gray-base">
              Chamadas, fomento e oportunidades para novos projetos.
            </Text>
            <NavLink
              to="/empreendedorismo/editais"
              className={buttonVariants({ variant: "secondary", size: "md" })}
            >
              Ver editais
            </NavLink>
          </Card>
          <Card className="p-6 space-y-4 text-center md:text-left">
            <Text as="h3" variant="body-lg-bold">
              Empresa Jr
            </Text>
            <Text variant="body-md" className="text-gray-base">
              Projetos de consultoria e experiencias praticas.
            </Text>
            <NavLink
              to="/empreendedorismo/empresa-jr"
              className={buttonVariants({ variant: "quaternary", size: "md" })}
            >
              Ver Empresa Jr
            </NavLink>
          </Card>
        </div>
      </Section>
    </>
  );
}
