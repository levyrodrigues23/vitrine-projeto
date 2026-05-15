import PageHero from "../../components/layout/page-hero/page-hero";
import { Section } from "../../components/ui";

export function AboutVitrinePage() {
  return (
    <>
      <PageHero
        title="Sobre a Vitrine"
        subtitle="Conheça o propósito deste portal e como o campus organiza a visibilidade dos projetos."
      />
      <Section title="O que voce encontra aqui" />
      <Section title="Como funciona" showSeparator={false} />
    </>
  );
}
