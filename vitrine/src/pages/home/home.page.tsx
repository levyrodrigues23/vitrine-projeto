import Hero from "../../components/layout/hero-section/hero";
import { Section } from "../../components/ui";
import banner1 from "../../assets/images/teste1.jpg";
import banner2 from "../../assets/images/teste2.jpg";
import Separator from "../../components/layout/separator/separator";



export function HomePage() {
  return (
    <>
      <Hero 
        title="Vitrine"
        subtitle="Subtítulo"
        images={[banner1, banner2]}
      />

      <Section className="text-center" title="Projetos em Destaque" description="Veja nossos principais projetos feitos para a comunidade acadêmica.">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas quia, dolorem voluptatem eos nihil quaerat in saepe modi doloremque nostrum, numquam autem ad nisi iusto? Iusto voluptates reiciendis deserunt laborum!
      </Section>
      <Separator/>
      <Section className="text-center " title="Professores" description="Veja os professores que fazem parte dos projetos.">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas quia, dolorem voluptatem eos nihil quaerat in saepe modi doloremque nostrum, numquam autem ad nisi iusto? Iusto voluptates reiciendis deserunt laborum!
      </Section>
      <Separator/>
      <Section className="text-center " title="Notícias" description="Veja as últimas notícias que sairam na mídia sobre a UFC.">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas quia, dolorem voluptatem eos nihil quaerat in saepe modi doloremque nostrum, numquam autem ad nisi iusto? Iusto voluptates reiciendis deserunt laborum!
      </Section>
      <Separator/>
    </>
  )
}
