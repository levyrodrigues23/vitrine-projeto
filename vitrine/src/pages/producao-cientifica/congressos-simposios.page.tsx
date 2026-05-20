import { NavLink } from "react-router";
import PageHero from "../../components/layout/page-hero/page-hero";
import { Card, Section, Text, buttonVariants } from "../../components/ui";

export default function CongressosSimposiosPage() {
  const events = [
    {
      title: "Congresso de Computacao Aplicada",
      place: "Fortaleza - CE",
      year: "2024",
    },
    {
      title: "Simposio de Educacao e Tecnologia",
      place: "Sobral - CE",
      year: "2023",
    },
    {
      title: "Seminario de Inovacao Academica",
      place: "Itapaje - CE",
      year: "2023",
    },
  ];

  return (
    <>
      <PageHero
        title="Congressos e Simposios"
        subtitle="Registros das participacoes da comunidade academica em eventos cientificos."
      />
      <Section title="Participacoes recentes">
        <Text as="h2" variant="body-lg" className="text-center md:text-left">
          Eventos cientificos nos quais o campus esteve presente com
          apresentacoes, posters e comunicacoes tecnicas.
        </Text>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card
              key={event.title}
              className="p-6 space-y-3 text-center md:text-left"
            >
              <Text as="h3" variant="body-lg-bold">
                {event.title}
              </Text>
              <Text variant="body-md" className="text-gray-base">
                {event.place}
              </Text>
              <Text variant="body-md" className="text-gray-base">
                Ano: {event.year}
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
