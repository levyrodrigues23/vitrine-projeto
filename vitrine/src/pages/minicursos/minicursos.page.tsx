import Hero from "../../components/layout/hero-section/hero";
import { Section } from "../../components/ui";

export function MinicursosPage() {
  return (
    <>
      <Hero title="Minicursos" subtitle="" />
      <Section title="Cursos em destaque" />
      <Section title="Como funciona" showSeparator={false} />
    </>
  );
}
