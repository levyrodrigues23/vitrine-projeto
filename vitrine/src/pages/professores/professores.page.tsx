import PageHero from "../../components/layout/page-hero/page-hero";
import { Section } from "../../components/ui";

export function ProfessoresPage() {
  return (
    <>
      <PageHero
        title="Professores"
        subtitle="Corpo docente, áreas de atuação e contatos institucionais."
      />
      <Section title="Corpo docente" />
      <Section title="Areas de atuacao" showSeparator={false} />
    </>
  );
}
