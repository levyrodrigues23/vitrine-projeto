import Hero from "../../components/layout/hero-section/hero";
import { Section } from "../../components/ui";

export function AboutVitrinePage() {
  return (
    <>
      <Hero title="Sobre a Vitrine" subtitle="" />
      <Section title="O que voce encontra aqui" />
      <Section title="Como funciona" showSeparator={false} />
    </>
  );
}
