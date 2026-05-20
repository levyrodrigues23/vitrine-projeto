import PageHero from "../../components/layout/page-hero/page-hero";
import { Card, Section, Text } from "../../components/ui";
import Technical from "../../assets/icons/productions.svg";


export function ProducaoTecnicaPage() {
  const artifacts = [
    {
      title: "Sistema de monitoramento",
      description:
        "Ferramenta criada em projeto integrador para acompanhamento de indicadores.",
    },
    {
      title: "Aplicativo de apoio comunitario",
      description: "Aplicativo desenvolvido em disciplina de extensao digital.",
    },
    {
      title: "Repositorio de modelos",
      description: "Colecao de templates para apoiar novas turmas e projetos.",
    },
  ];

  return (
    <>
      <PageHero
        title="Produção técnica"
        subtitle="Artefatos, softwares e ferramentas desenvolvidos em disciplinas integradoras, projetos e TCCs."
      />
      <Section title="O que e producao tecnica">
       <div className="flex md:flex-row flex-col bg-white p-4 rounded-2xl text-shadow-olive-200 shadow-2xl">
            <Text className="pt-3 pl-3" as="h2" variant="body-lg">
              A <strong>produção técnica</strong> se refere aos artefatos, ferramentas, softwares e outros resultados práticos gerados a partir de projetos, disciplinas integradoras, TCCs e outras atividades acadêmicas. Esses produtos técnicos representam a aplicação do conhecimento adquirido pelos estudantes e professores em soluções concretas para desafios reais.
              <br /><br />
              A produção técnica é fundamental para demonstrar o impacto prático das atividades acadêmicas, contribuindo para a formação de profissionais capacitados e para o desenvolvimento de soluções inovadoras que beneficiam a comunidade e o mercado.
            </Text>

            <img
              src={Technical}
              alt="Icone de pessoa lendo um artigo"
              className=" w-100 h-100 md:w-72 md:h-72 md:ml-6 "
            />
          </div>
      </Section>
      <Section title="Artefatos e ferramentas" showSeparator={false}>
        <Text as="h2" variant="body-lg" className="text-center md:text-left">
          Abaixo estao alguns exemplos de entregaveis tecnicos desenvolvidos no
          campus.
        </Text>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {artifacts.map((artifact) => (
            <Card
              key={artifact.title}
              className="p-6 space-y-3 text-center md:text-left"
            >
              <Text as="h3" variant="body-lg-bold">
                {artifact.title}
              </Text>
              <Text variant="body-md" className="text-gray-base">
                {artifact.description}
              </Text>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
