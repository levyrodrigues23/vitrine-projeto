import PageHero from "../../components/layout/page-hero/page-hero";
import { Section } from "../../components/ui";

export default function ProducaoCientificaPage() {
  return (
    <>
      <PageHero
        title="Produção científica"
        subtitle="Publicações, artigos e pesquisas desenvolvidas pelo campus."
      />
      <Section title="Publicações" className="text-2xl" />
      <Section title="Linhas de pesquisa" showSeparator={false} />
    </>
  );
}
