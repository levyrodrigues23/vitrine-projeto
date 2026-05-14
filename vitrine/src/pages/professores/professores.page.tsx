import Hero from "../../components/layout/hero-section/hero";
import { Section } from "../../components/ui";

export function ProfessoresPage() {
  return (
    <>
      <Hero title="Professores" subtitle="" />
      <Section title="Corpo docente" />
      <Section title="Areas de atuacao" showSeparator={false} />
    </>
  );
}
