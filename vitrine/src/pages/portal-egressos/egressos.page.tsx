import PageHero from "../../components/layout/page-hero/page-hero";
import { Card, Icon, Section, Text } from "../../components/ui";
import Egress from "../../assets/icons/egresss.svg?react";

export function EgressosPage() {
  const courses = [
    {
      title: "Engenharia de Software",
      description: "Egressos atuando em empresas de tecnologia e startups.",
    },
    {
      title: "Sistemas de Informacao",
      description: "Profissionais em analise de dados e gestao de projetos.",
    },
    {
      title: "Redes de Computadores",
      description: "Atuacao em infraestrutura, seguranca e suporte tecnico.",
    },
  ];

  return (
    <>
      <PageHero
        title="Egressos por Curso"
        subtitle="Panorama dos egressos do campus e suas areas de atuacao."
      />
      <Section title="O que é Empreendedorismo?">
        <div className="flex md:flex-row flex-col bg-white p-4 items-center rounded-2xl text-shadow-olive-200 shadow-2xl">
          <Text className="pt-3 pl-3" as="h2" variant="body-lg">
            O <strong>empreendedorismo</strong> transforma ideias em solucoes e
            negocios sustentaveis, conectando conhecimento academico a desafios
            reais do territorio. No campus, isso acontece por meio de
            iniciativas, startups, desafios e programas de fomento que
            impulsionam a inovacao.
            <br />
            <br />A partir desse movimento, estudantes desenvolvem competencias
            como criatividade, validacao de mercado e trabalho em equipe,
            aproximando a universidade da comunidade e do ecossistema local.
          </Text>

          <Icon
            svg={Egress}
            className=" object-cover w-100 h-100 md:w-72 md:h-72 md:ml-6 "
          />
        </div>
      </Section>
      <Section title="Cursos e atuacoes" showSeparator={false}>
        <Text as="h2" variant="body-lg" className="text-center md:text-left">
          Selecao de cursos com exemplos de areas em que os egressos atuam.
        </Text>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card
              key={course.title}
              className="p-6 space-y-3 text-center md:text-left"
            >
              <Text as="h3" variant="body-lg-bold">
                {course.title}
              </Text>
              <Text variant="body-md" className="text-gray-base">
                {course.description}
              </Text>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
