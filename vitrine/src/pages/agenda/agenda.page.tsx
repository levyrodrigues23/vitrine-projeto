import Hero from "../../components/layout/hero-section/hero";
import { Section } from "../../components/ui";

export function AgendaPage() {
  return (
    <>
      <Hero title="Agenda" subtitle="" />
      <Section title="Proximos eventos" />
      <Section title="Como participar" showSeparator={false} />
    </>
  );
}
