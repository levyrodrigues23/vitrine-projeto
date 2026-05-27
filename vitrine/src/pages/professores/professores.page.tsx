import { ProfessorCard } from "../../components/features/professor-card/professor-card";
import PageHero from "../../components/layout/page-hero/page-hero";
import { Section } from "../../components/ui";
import { MOCK_TEACHERS } from "../../constants/mock-data";




export function ProfessoresPage() {
  const professores = MOCK_TEACHERS.slice(0, 3);





  return (
    <>
      <PageHero
        title="Professores"
        subtitle="Corpo docente, áreas de atuação e contatos institucionais."
      />
      <Section title="Corpo docente">
        {professores.map((professor) => (
          <ProfessorCard
          key={professor.id}
          name={professor.name}
          imageUrl={professor.imageUrl}
          />
        ))}
      </Section>
      <Section title="Areas de atuacao" showSeparator={false} />
    </>
  );
}
