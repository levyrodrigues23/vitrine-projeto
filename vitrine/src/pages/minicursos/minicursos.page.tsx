import PageHero from "../../components/layout/page-hero/page-hero";
import { Section } from "../../components/ui";

export function MinicursosPage() {
  return (
    <>
      <PageHero
        title="Minicursos"
        subtitle="Cursos de curta duração abertos à comunidade acadêmica e externa, conforme oferta do campus."
      />
      <Section title="Cursos em destaque" />
      <Section title="Como funciona" showSeparator={false} />
    </>
  );
}
