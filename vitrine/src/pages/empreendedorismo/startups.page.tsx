import PageHero from "../../components/layout/page-hero/page-hero";
import {  Section, Text } from "../../components/ui";
import Startup from "../../assets/icons/startups.svg";
import { ProjectCard } from "../../components/features";
import { useNavigate } from "react-router";
import { useStartups } from "../../hooks/startup";


export function StartupsPage() {
  const navigate = useNavigate();

  const {startups, loading, error} = useStartups();

  const handleSearchSubmit = (q: string) => {
      const url = `/startup?busca=${encodeURIComponent}`
      navigate(url)
  }

  



  

  return (
    <>
      <PageHero
        title="Startups do Campus"
        subtitle="Projetos em fase de validação e iniciativas com potencial de negócio."
      />
      <Section title="O que é uma startup?" align="center">
        <div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-2xl md:flex-row md:items-start md:p-8">
          <Text
            className="text-center md:text-left"
            as="h2"
            variant="body-lg"
          >
            As <strong>startups</strong> do campus são iniciativas em fase de
            validação, onde estudantes e docentes transformam ideias em soluções
            com potencial de impacto. Esses projetos exploram desafios locais e buscam criar negócios sustentáveis, conectando a universidade ao ecossistema de inovação. A vitrine destaca essas iniciativas, mostrando o processo de desenvolvimento e as histórias por trás das ideias em evolução.
          </Text>

          <img
            src={Startup}
            alt="Ilustração representando as startups"
            className="mt-8 w-56 object-contain md:ml-8 md:mt-0 md:w-72"
          />
        </div>
      </Section>
      <div className="flex flex-col items-center justify-center mx-8 my-20 md:mx-16 md:flex-row md:justify-between text-center md:text-left">
        <div className="flex flex-col space-y-4 max-w-xl">
          <Text variant="title-2"> Startups que expandem </Text>
          <Text variant="body-lg" className="text-gray-base">
            Startups que foram criadas com um propósito principal de expandir, crescer e trazer impacto para a sociedade.
          </Text>
        </div>
        <img
          src={Startup}
          alt="Ilustração de foguete ou startup expandindo"
          className="mt-10 w-48 object-contain md:ml-12 md:mt-0 md:w-64"
        />
      </div>
      <Section title="Startups em andamento" showSeparator={false} align="center">
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {startups.map((startup) => (
            <div key={startup.title} className="flex flex-col items-center">
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
