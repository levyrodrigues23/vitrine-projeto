import Hero from "../../components/layout/hero-section/hero";
import ExportIcon from "../../assets/icons/export.svg?react";
import { Section } from "../../components/ui";

export function ProducaoTecnicaPage() {
  return (
    <>
      <Hero
        title="Producao Tecnica"
        subtitle=""
        iconSvg={ExportIcon}
        showIcon
        iconSize="xl3"
      />
      <Section title="Entregaveis" />
      <Section title="Fluxo de publicacao" showSeparator={false} />
    </>
  );
}
