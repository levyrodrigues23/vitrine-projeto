import Hero from "../../components/layout/hero-section/hero";
import Article from "../../assets/icons/article.svg?react";
import { Section } from "../../components/ui";

export default function ProducaoCientificaPage() {
  return (
    <>
      <Hero
        title="Producao Cientifica"
        subtitle=""
        iconSvg={Article}
        showIcon
        iconSize="xl3"
        className="flex justify-center items-center"
      />
      <Section title="Publicacoes" className="text-2xl"/>
      <Section title="Linhas de pesquisa" showSeparator={false} />
    </>
  );
}
