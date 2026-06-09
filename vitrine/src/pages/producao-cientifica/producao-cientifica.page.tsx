import { NavLink } from "react-router";
import PageHero from "../../components/layout/page-hero/page-hero";
import { Card, Section, Text, buttonVariants } from "../../components/ui";
import Paper from "../../assets/icons/papers.svg";

export default function ProducaoCientificaPage() {
  return (
    <>
      <PageHero
        title="Produção científica"
        subtitle="Conheça os registros e resultados das pesquisas desenvolvidas no Campus Itapajé."
      />
      <Section title="O que é a produção científica?" align="center">
        <div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-2xl md:flex-row md:items-start md:p-8">
          <Text
            className="text-center md:text-left"
            as="h2"
            variant="body-lg"
          >
            Uma <strong>produção científica</strong> é o resultado de um
            processo de pesquisa, onde são gerados novos conhecimentos,
            descobertas ou soluções para problemas específicos. Ela pode se
            manifestar de diversas formas, como artigos publicados em revistas
            acadêmicas, apresentações em congressos, patentes, livros e outros
            tipos de publicações.
            <br />
            <br />A produção científica é fundamental para o avanço do
            conhecimento em diferentes áreas e contribui para o desenvolvimento
            da sociedade, influenciando políticas públicas, práticas
            profissionais e inovações tecnológicas.
          </Text>

          <img
            src={Paper}
            alt="Ilustração de pessoa lendo um artigo"
            className="mt-8 w-56 object-contain md:ml-8 md:mt-0 md:w-72"
          />
        </div>
      </Section>
      <Section
        title="Acessar categorias"
        description="Escolha uma das áreas abaixo para ver os registros completos da produção científica do campus."
        showSeparator={false}
        align="center"
      >
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="flex flex-col items-center p-6 space-y-4 text-center md:items-start md:text-left">
            <Text as="h3" variant="body-lg-bold">
              Artigos e Publicações
            </Text>
            <Text variant="body-md" className="text-gray-base">
              Trabalhos aceitos e publicados por alunos e servidores do campus.
            </Text>
            <NavLink
              to="/producao-cientifica/artigos-publicacoes"
              className={buttonVariants({ variant: "primary", size: "md" })}
            >
              Ver artigos e publicações
            </NavLink>
          </Card>
          <Card className="flex flex-col items-center p-6 space-y-4 text-center md:items-start md:text-left md:justify-between">
            <div className="space-y-4">
              <Text as="h3" variant="body-lg-bold">
                Congressos e Simpósios
              </Text>
              <Text variant="body-md" className="text-gray-base">
                Registros de participações em congressos, simpósios e eventos.
              </Text>
            </div>
            <NavLink
              to="/producao-cientifica/congressos-simposios"
              className={buttonVariants({ variant: "primary", size: "md" })}
            >
              Ver congressos e simpósios
            </NavLink>
          </Card>
        </div>
      </Section>
    </>
  );
}
