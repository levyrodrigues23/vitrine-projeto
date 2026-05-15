import { useMemo, useState } from "react";
import PageHero from "../../components/layout/page-hero/page-hero";
import { AgendaEventCard } from "../../components/features/agenda-event-card/agenda-event-card";
import { BlockHelp, Text } from "../../components/ui";
import {
  AGENDA_CATEGORY_FILTERS,
  MOCK_AGENDA_EVENTS,
} from "../../constants/agenda.mock";
import type { AgendaEventCategoryId } from "../../types/agenda.types";

export function AgendaPage() {
  const [filter, setFilter] = useState<AgendaEventCategoryId>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return MOCK_AGENDA_EVENTS;
    return MOCK_AGENDA_EVENTS.filter((e) => e.categoryId === filter);
  }, [filter]);

  return (
    <>
      <PageHero
        title="Agenda"
        subtitle="Fique por dentro dos eventos, palestras e atividades do campus."
      />

      <section
        className="mx-auto w-full max-w-6xl px-6 pb-16"
        aria-label="Lista de eventos"
      >
        <div className="mb-8 flex flex-col items-center gap-3 text-center sm:flex-row sm:flex-wrap sm:justify-center sm:gap-2">
          <Text as="h2" variant="title-3" className="text-black">
            Eventos
          </Text>
          <BlockHelp
            topicLabel="eventos e filtros desta página"
            explanation="Esta seção lista eventos institucionais do campus. Os botões em formato de pílula filtram por tipo (palestra, workshop etc.). 'Todos' mostra a programação completa. Os dados são de exemplo até a integração com a API."
          />
        </div>

        <div
          className="mb-10 flex flex-wrap justify-center gap-2"
          role="toolbar"
          aria-label="Filtrar eventos por tipo"
        >
          {AGENDA_CATEGORY_FILTERS.map(({ id, label }) => {
            const selected = filter === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(id)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-dark ${
                  selected
                    ? "border-blue-dark bg-blue-dark text-white"
                    : "border-gray-base/25 bg-white text-black hover:border-blue/40"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-base">
            Nenhum evento nesta categoria no momento.
          </p>
        ) : (
          <ul className="grid list-none gap-6 p-0 sm:grid-cols-2">
            {filtered.map((event) => (
              <li key={event.id}>
                <AgendaEventCard event={event} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
