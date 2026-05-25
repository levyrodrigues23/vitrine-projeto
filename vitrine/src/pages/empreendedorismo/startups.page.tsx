import PageHero from "../../components/layout/page-hero/page-hero";
import {  Section, Text } from "../../components/ui";
import Startup from "../../assets/icons/startups.svg";
import { ProjectCard } from "../../components/features";


export function StartupsPage() {
  const startups = [
    {
      title: "Projeto Atlas",
      description:
        "Plataforma para mapear oportunidades e conectar estudantes.",
        category: "inteligencia artificial",
        area: "tecnologia",
        icon: Startup,
       
    },
    {
      title: "AgroData",
      description:
        "Solucao para apoio a produtores com analise de dados locais.",
        category: "analise de dados",
        area: "agricultura",
        icon: Startup,
    },
    {
      title: "Saude Conecta",
      description: "Aplicativo de suporte a campanhas de saude comunitaria.",
      category: "saude",
      area: "saude",
      icon: Startup,
    },
  ];

  return (
    <>
      <PageHero
        title="Startups do Campus"
        subtitle="Projetos em fase de validacao e iniciativas com potencial de negocio."
      />
      <Section title="O que é uma startup?" align="center">
    <div className="flex md:flex-row flex-col bg-white p-4 items-center rounded-2xl text-shadow-olive-200 shadow-2xl">
          <Text className="pt-3 pl-3" as="h2" variant="body-lg">
            As <strong>startups</strong> do campus sao iniciativas em fase de
            validacao, onde estudantes e docentes transformam ideias em solucoes
            com potencial de impacto. Esses projetos exploram desafios locais e buscam criar negocios sustentaveis, conectando a universidade ao ecossistema de inovacao. A vitrine destaca essas iniciativas, mostrando o processo de desenvolvimento e as historias por tras das ideias em evolucao.
          </Text>

          <img

            src={Startup}
            alt="Icone de marcador representando oportunidades de empreendedorismo"
            className=" object-cover w-100 h-100 md:w-72 md:h-72 md:ml-6 "
          />
        </div>
      </Section>
      <div className="flex flex-row justify-center mx-16 my-20 mb-40">
        <div className="flex flex-col space-y-7">
        <Text variant="title-2"> Startups que expandem </Text>
        <Text variant="body-lg" className="max-w-2xl">
          Startups que foram criadas com um propósito principal de expandir, crescer e trazer impacto para a sociedade
        </Text>
        </div>
          <img

            src={Startup}
            alt="Icone de marcador representando oportunidades de empreendedorismo"
            className=" object-cover w-100 h-100 md:w-72 md:h-72 md:ml-40 "
          />
      </div>
      <Section title="Startups em andamento" showSeparator={false} align="center">
    
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {startups.map((startup) => (
            <div>
           <ProjectCard
              title={startup.title}
              description={startup.description}
              category={startup.category}
              imageUrl={startup.icon}
            />
             </div>
           ))}
        </div>
      </Section>

       
    </>
  );
}
