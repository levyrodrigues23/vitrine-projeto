import Hero from "../../components/layout/hero-section/hero";
import { Section } from "../../components/ui";

export function PortalEgressosPage() {
  return (
    <>
      <Hero title="Portal de Egressos" subtitle="" />
      <Section title="O que voce encontra" />
      <Section title="Beneficios" showSeparator={false} />
    </>
  );
}
