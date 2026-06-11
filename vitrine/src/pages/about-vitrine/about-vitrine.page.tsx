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
        "Desenvolvemos soluções criativas e baseadas em evidências científicas para os desafios da região.",
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
        title="O que é a Vitrine de Projetos?"
      >
        <div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-2xl md:flex-row md:items-start md:p-8">
          <Text
            className="text-center md:text-left"
            as="h2"
            variant="body-lg"
          >
            A <strong>Vitrine de Projetos</strong> é o espaço oficial do
            Campus Itapajé para reunir, organizar e divulgar as iniciativas de
            pesquisa, inovação e extensão. Aqui você encontra projetos
            desenvolvidos por alunos e professores, com foco em impacto local,
            soluções aplicadas e formação prática. O objetivo é dar
            visibilidade ao que é produzido no campus e facilitar o acesso da
            comunidade acadêmica e externa aos resultados, contatos e
            oportunidades geradas por esses trabalhos.
            <br />
            <br />A vitrine funciona como um catálogo digital, onde cada
            projeto é registrado com título, resumo, área, equipe e
            resultados. Assim, fica mais fácil pesquisar por tema, descobrir
            projetos relacionados e acompanhar o que está em andamento. O
            conteúdo é atualizado pelos responsáveis, garantindo informações
            atuais e organizadas.
          </Text>

          <img
            src={ArticlePerson}
            alt="Ilustração de pessoa analisando artigos"
            className="mt-8 w-56 object-contain md:ml-8 md:mt-0 md:w-72"
          />
        </div>
      </Section>

      <Section title="Nossos valores" showSeparator={true} align="center">
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {valores.map((valor) => (
            <Card
              key={valor.title}
              className="flex flex-col items-center p-6 space-y-3 text-center md:items-start md:text-left"
            >
              <div className="flex flex-col items-center gap-3 md:flex-row md:justify-start">
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
            <div></div>
      <Section
        align="center"
        title="Conheça nossos projetos"
        description="Explore a variedade de projetos desenvolvidos e descubra como a universidade está transformando conhecimento em impacto real."
        showSeparator={false}
        className="flex flex-col space-y-12 justify-center items-center"
      >
      <Button
       onClick={() => navigate("/projetos")} 
      >Ver Projetos</Button>
      </Section>
    </>
  );
}
