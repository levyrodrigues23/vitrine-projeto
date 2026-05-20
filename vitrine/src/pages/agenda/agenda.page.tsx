import PageHero from "../../components/layout/page-hero/page-hero";
import { AgendaEventCard } from "../../components/features/agenda-event-card/agenda-event-card";
import { Section, Text } from "../../components/ui";
import { MOCK_AGENDA_EVENTS } from "../../constants/agenda.mock";

export function AgendaPage() {
  const atividades = MOCK_AGENDA_EVENTS.filter((event) =>
    ["academic", "workshop", "lecture"].includes(event.categoryId),
  );
  const eventos = MOCK_AGENDA_EVENTS.filter((event) =>
    ["defense", "competition"].includes(event.categoryId),
  );

  return (
    <>
      <PageHero
        title="Agenda"
        subtitle="Agenda com datas de atividades, minicursos e eventos do campus."
      />
      <Section title="Atividades">
        <Text as="h2" variant="body-lg" className="text-center md:text-left">
          Atividades academicas, oficinas, palestras e minicursos realizados no
          campus e abertos para a comunidade.
        </Text>
        <ul className="mt-8 grid list-none gap-6 p-0 sm:grid-cols-2">
          {atividades.map((event) => (
            <li key={event.id}>
              <AgendaEventCard event={event} />
            </li>
          ))}
        </ul>
      </Section>
      <Section title="Eventos" showSeparator={false}>
        <Text as="h2" variant="body-lg" className="text-center md:text-left">
          Eventos especiais, competicoes e defesas com datas e locais definidos.
        </Text>
        <ul className="mt-8 grid list-none gap-6 p-0 sm:grid-cols-2">
          {eventos.map((event) => (
            <li key={event.id}>
              <AgendaEventCard event={event} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
