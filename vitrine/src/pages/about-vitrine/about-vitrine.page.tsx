import PageHero from "../../components/layout/page-hero/page-hero";
import { Button, Card, Section, Text } from "../../components/ui";
import ArticlePerson from "../../assets/icons/article-person.svg";
import { useNavigate } from "react-router";

export function AboutVitrinePage() {
  const navigate = useNavigate();
  const valores = [
    {
      icon: "🔬",
      title: "Inovação",
      description:
        "Desenvolvemos soluções criativas e baseadas em evidências científicas para os desafios da regiao.",
    },
    {
      icon: "🤝",
      title: "Colaboração",
      description:
        "Trabalhamos em parceria com a comunidade, empresas e outras instituições.",
    },
    {
      icon: "🌱",
      title: "Sustentabilidade",
      description:
        "Promovemos o desenvolvimento sustentável e responsável da região.",
    },
  ];
  return (
    <>
      <PageHero
        title="Sobre a Vitrine"
        subtitle="Conheça o propósito deste portal e como o campus organiza a visibilidade dos projetos."
      />
      <Section 
      align="center"
      title="| O que é a Vitrine de Projetos?">
        <Text as="h2" variant="body-lg" className="text-center md:text-left">
          <div className="flex md:flex-row flex-col bg-white p-4 rounded-2xl text-shadow-olive-200 shadow-2xl">
            <Text className="pt-3 pl-3" as="h2" variant="body-lg">
              A <strong>Vitrine de Projetos</strong> é o espaco oficial do
              Campus Itapaje para reunir, organizar e divulgar as iniciativas de
              pesquisa, inovacao e extensao. Aqui voce encontra projetos
              desenvolvidos por alunos e professores, com foco em impacto local,
              solucoes aplicadas e formacao pratica. O objetivo e dar
              visibilidade ao que e produzido no campus e facilitar o acesso da
              comunidade academica e externa aos resultados, contatos e
              oportunidades geradas por esses trabalhos.
              <br />
              <br />A vitrine funciona como um catalogo digital, onde cada
              projeto e registrado com titulo, resumo, area, equipe e
              resultados. Assim, fica mais facil pesquisar por tema, descobrir
              projetos relacionados e acompanhar o que esta em andamento. O
              conteudo e atualizado pelos responsaveis, garantindo informacoes
              atuais e organizadas.
            </Text>

            <img
              src={ArticlePerson}
              alt="Icone de pessoa lendo um artigo"
              className=" w-100 h-100 md:w-64 md:h-64 md:ml-6 "
            />
          </div>
        </Text>
      </Section>

      <Section title="Nossos valores" showSeparator={true} align="center">
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {valores.map((valor) => (
            <Card
              key={valor.title}
              className="p-6 space-y-3 text-center md:text-left"
            >
              <div className="flex items-center justify-center gap-3 md:justify-start">
                <span className="text-2xl" aria-hidden>
                  {valor.icon}
                </span>
                <Text as="h3" variant="body-lg-bold">
                  {valor.title}
                </Text>
              </div>
              <Text variant="body-md" className="text-gray-base">
                {valor.description}
              </Text>
            </Card>
          ))}
        </div>
      </Section>
      <Section
        align="center"
        title="Conheça nossos projetos"
        description="Explore a variedade de projetos desenvolvidos e descubra como a universidade está transformando conhecimento em impacto real."
        showSeparator={false}
      >
      <Button
       onClick={() => navigate("/projetos")} 
      >Ver Projetos</Button>
      </Section>
    </>
  );
}
