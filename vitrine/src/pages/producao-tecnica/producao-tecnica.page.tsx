import PageHero from "../../components/layout/page-hero/page-hero";
import { Card, Section, Text } from "../../components/ui";
import Technical from "../../assets/icons/productions.svg";
import { ProjectCard } from "../../components/features";

export function ProducaoTecnicaPage() {
const artifacts = [
  {
    title: "Sistema de monitoramento",
    description:
      "Ferramenta criada em projeto integrador para acompanhamento de indicadores.",
    category: "Software",
    imageUrl:
      "https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=1000&auto=format&fit=crop",
    area: "Engenharia de Computação",
  },
  {
    title: "Aplicativo de apoio comunitário",
    description: "Aplicativo desenvolvido em disciplina de extensão digital.",
    category: "Mobile",
    imageUrl:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop",
    area: "Sistemas de Informação",
  },
  {
    title: "Repositório de modelos",
    description: "Coleção de templates para apoiar novas turmas e projetos.",
    category: "Recursos",
    imageUrl:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop",
    area: "Engenharia de Software",
  },
];

  const valores = [
    {
      title: "01",
      categoria: "Projetos integradores",
      description:
        "Desenvolvidos por turmas ao longo do semestre, articulando saberes de múltiplas disciplinas em um produto funcional.",
    },
    {
      title: "02",
      categoria: "TCCs",
      description:
        "TCCs com entregável técnico: sistemas, protótipos, guias e ferramentas validadas em contexto real.",
    },
    {
      title: "03",
      categoria: "Ações de extensão",
      description:
        "Softwares, apps e materiais criados em projetos de extensão que impactam diretamente comunidades externas.",
    },
  ];

  return (
    <>
      <PageHero
        title="Produção técnica"
        subtitle="Artefatos, softwares e ferramentas desenvolvidos em disciplinas integradoras, projetos e TCCs."
      />
      <Section title="| O que é produção técnica">
        <div className="flex md:flex-row flex-col bg-white p-4 rounded-2xl text-shadow-olive-200 shadow-2xl">
          <Text className="pt-3 pl-3" as="h2" variant="body-lg">
            A <strong>produção técnica</strong> se refere aos artefatos,
            ferramentas, softwares e outros resultados práticos gerados a partir
            de projetos, disciplinas integradoras, TCCs e outras atividades
            acadêmicas. Esses produtos técnicos representam a aplicação do
            conhecimento adquirido pelos estudantes e professores em soluções
            concretas para desafios reais.
            <br />
            <br />A produção técnica é fundamental para demonstrar o impacto
            prático das atividades acadêmicas, contribuindo para a formação de
            profissionais capacitados e para o desenvolvimento de soluções
            inovadoras que beneficiam a comunidade e o mercado.
          </Text>

          <img
            src={Technical}
            alt="Icone de pessoa lendo um artigo"
            className=" w-100 h-100 md:w-72 md:h-72 md:ml-6 "
          />
        </div>
      </Section>
      <Section
        title="Como são produzidas?"
        description="A produção técnica do campus surge de diferentes contextos acadêmicos."
      >
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {valores.map((valor) => (
            <Card
            key={valor.title}
            className="p-6 space-y-3 text-center md:text-left "
            >
               <Text as="h3" variant="title-3" className="text-green-dark">
                {valor.title}
              </Text>
               <Text as="h3" variant="body-lg-bold">
                {valor.categoria}
              </Text>
              <Text variant="body-md" className="text-gray-base">
                {valor.description}
              </Text>
            </Card>
          ))} 
        </div>
      </Section>
      
        
      <Section title="Artefatos e ferramentas" showSeparator={false}>
        <Text as="h2" variant="body-lg" className="text-center md:text-left">
          Abaixo é possível visualizar alguns exemplos de artefatos, projetos e
          ferramentas desenvolvidas por estudantes e professores da comunidade
          acadêmica
        </Text>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {artifacts.map((artifact) => (
    <ProjectCard
      key={artifact.title}
      title={artifact.title}
      description={artifact.description}
      category={artifact.category}
      imageUrl={artifact.imageUrl}
      area={artifact.area}
    />
  ))}
</div>
      </Section>
    </>
  );
}
