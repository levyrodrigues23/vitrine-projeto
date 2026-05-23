import { NavLink } from "react-router";
import PageHero from "../../components/layout/page-hero/page-hero";
import { Card, Section, Text, buttonVariants } from "../../components/ui";
import Paper from "../../assets/icons/papers.svg";

export default function ProducaoCientificaPage() {
  return (
    <>
      <PageHero
        title="Produção científica"
        subtitle="Conheça os registros e resultados das pesquisas desenvolvidas no Campus Itapaje."
      />
      <Section title="| O que é a produção científica?">
        <div className="flex md:flex-row flex-col bg-white p-4 rounded-2xl text-shadow-olive-200 shadow-2xl">
          <Text className="pt-3 pl-3" as="h2" variant="body-lg">
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
            alt="Icone de pessoa lendo um artigo"
            className=" w-100 h-100 md:w-64 md:h-64 md:ml-6 "
          />
        </div>
        <Text
          as="h2"
          variant="body-lg"
          className="text-center md:text-left"
        ></Text>
      </Section>
      <Section title="Acessar categorias" showSeparator={false}>
        <Text as="h2" variant="body-lg" className="text-center md:text-left">
          Escolha uma das áreas abaixo para ver os registros completos da
          produção cientifica do campus.
        </Text>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className=" flex flex-col  p-6 space-y-4 text-center md:text-left">
            <Text as="h3" variant="body-lg-bold">
              Artigos e Publicacoes
            </Text>
            <Text variant="body-md" className="text-gray-base">
              Trabalhos aceitos e publicados por alunos e servidores do campus.
            </Text>
            <NavLink
              to="/producao-cientifica/artigos-publicacoes"
              className={buttonVariants({ variant: "primary", size: "md" })}
            >
              Ver artigos e publicacoes
            </NavLink>
          </Card>
          <Card className=" flex flex-col p-6 space-y-4 text-center md:text-left">
            <Text as="h3" variant="body-lg-bold">
              Congressos e Simposios
            </Text>
            <Text variant="body-md" className="text-gray-base">
              Registros de participacoes em congressos, simposios e eventos.
            </Text>
            <NavLink
              to="/producao-cientifica/congressos-simposios"
              className={buttonVariants({ variant: "secondary", size: "md" })}
            >
              Ver congressos e simposios
            </NavLink>
          </Card>
        </div>
      </Section>
    </>
  );
}
