import { NavLink } from "react-router";
import PageHero from "../../components/layout/page-hero/page-hero";
import { Card, Section, Text, buttonVariants } from "../../components/ui";

export default function CongressosSimposiosPage() {
  const events = [
    {
      title: "Congresso de Computação Aplicada",
      place: "Fortaleza - CE",
      year: "2024",
    },
    {
      title: "Simpósio de Educação e Tecnologia",
      place: "Sobral - CE",
      year: "2023",
    },
    {
      title: "Seminário de Inovação Acadêmica",
      place: "Itapajé - CE",
      year: "2023",
    },
  ];

  return (
    <>
      <PageHero
        title="Congressos e Simpósios"
        subtitle="Registros das participações da comunidade acadêmica em eventos científicos."
      />
      <Section
        title="Participações recentes"
        description="Eventos científicos nos quais o campus esteve presente com apresentações, pôsteres e comunicações técnicas."
        align="center"
      >
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card
              key={event.title}
              className="flex flex-col items-center p-6 space-y-3 text-center md:items-start md:text-left"
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
      <Section showSeparator={false} align="center">
        <NavLink
          to="/producao-cientifica"
          className={buttonVariants({ variant: "quaternary", size: "md" })}
        >
          Voltar para Produção Científica
        </NavLink>
      </Section>
    </>
  );
}
