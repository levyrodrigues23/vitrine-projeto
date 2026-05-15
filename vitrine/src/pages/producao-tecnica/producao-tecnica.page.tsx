import PageHero from "../../components/layout/page-hero/page-hero";
import { Section } from "../../components/ui";

export function ProducaoTecnicaPage() {
  return (
    <>
      <PageHero
        title="Produção técnica"
        subtitle="Artefatos, softwares e ferramentas desenvolvidos em disciplinas integradoras e projetos."
      />
      <Section title="Entregáveis" />
      <Section title="Fluxo de publicação" showSeparator={false} />
    </>
  );
}
