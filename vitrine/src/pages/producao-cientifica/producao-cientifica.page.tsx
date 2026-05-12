
import Hero from "../../components/layout/hero-section/hero";
import Article from "../../assets/icons/article.svg?react";
import { Section } from "../../components/ui";


export default function ProducaoCientificaPage() {
    return (
        <div className="text-center">
          <Hero title="Produção Científica" subtitle="Aqui você encontra a produção científica dos nossos pesquisadores. " iconSvg={Article} showIcon={true} iconSize="xl3" />
           <Section
                 title="Artigos"
                 description="Veja os artigos publicados pelos nossos pesquisadores."
                 lateral
               >

               </Section>
        </div>
        
        
    )
}