import PageHero from "../../components/layout/page-hero/page-hero";
import { Section } from "../../components/ui";

export function EmpreendedorismoPage() {
  return (
    <>
      <PageHero
        title="Empreendedorismo"
        subtitle="Startups, editais, fomento e iniciativas que conectam formação ao ecossistema de inovação."
      />
      <Section title="Programas e iniciativas" />
      <Section title="Como participar" showSeparator={false} />
    </>
  );
}
