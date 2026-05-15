import PageHero from "../../components/layout/page-hero/page-hero";
import { Section } from "../../components/ui";

export function PortalEgressosPage() {
  return (
    <>
      <PageHero
        title="Portal de Egressos"
        subtitle="Benefícios, histórias e canais para quem concluiu a graduação no campus."
      />
      <Section title="O que voce encontra" />
      <Section title="Beneficios" showSeparator={false} />
    </>
  );
}
