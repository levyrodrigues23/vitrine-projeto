import { NavLink } from "react-router";

import PageHero from "../../components/layout/page-hero/page-hero";
import {
  Badge,
  Card,
  Section,
  Text,
  buttonVariants,
} from "../../components/ui";

export function GerenciadorPage() {
  const actions = [
    {
      title: "Adicionar egresso",
      description: "Cadastro com formação, contato e área de atuação.",
      to: "/gerenciador/egressos",
      accent: "from-blue/10 to-white",
    },
    {
      title: "Adicionar projeto",
      description: "Fluxo para pesquisa, extensão ou inovação.",
      to: "/gerenciador/projetos",
      accent: "from-green-base/10 to-white",
    },
    {
      title: "Adicionar artigo",
      description: "Cadastro de publicações com autoria e referências.",
      to: "/gerenciador/artigos",
      accent: "from-yellow/15 to-white",
    },
    {
      title: "Adicionar startup",
      description: "Página para validar ideia, setor e estágio.",
      to: "/gerenciador/startups",
      accent: "from-red/10 to-white",
    },
  ];

  const categories = [
    {
      title: "Inovação",
      description: "Produtos, serviços e protótipos com foco em impacto.",
      badge: "Prioridade alta",
    },
    {
      title: "Extensão",
      description: "Ações conectadas ao território e à comunidade.",
      badge: "Ciclo contínuo",
    },
    {
      title: "Pesquisa",
      description: "Produção científica, validação e experimentação.",
      badge: "Base acadêmica",
    },
  ];

  return (
    <>
      <PageHero
        title="Gerenciador de cadastros"
        subtitle="Área visual para escolher o tipo de conteúdo antes de entrar na estrutura de cada formulário."
      />

      <Section
        title="Atalhos de criação"
        description="Cada card leva para um fluxo de cadastro específico, sem misturar campos diferentes em uma única página."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {actions.map((action) => (
            <Card
              key={action.title}
              variant="interactive"
              className={`group flex h-full flex-col justify-between overflow-hidden bg-linear-to-br ${action.accent} p-6`}
            >
              <div className="space-y-4">
                <Badge variant="outline">Fluxo direto</Badge>
                <div className="space-y-2">
                  <Text as="h3" variant="body-lg-bold" className="text-black">
                    {action.title}
                  </Text>
                  <Text variant="body-md" className="text-gray-base">
                    {action.description}
                  </Text>
                </div>
              </div>

              <NavLink
                to={action.to}
                className={`${buttonVariants({ variant: "primary", size: "md" })} mt-6 w-full justify-center`}
              >
                Abrir formulário
              </NavLink>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        title="Escolha a linha do conteúdo"
        description="A mesma estrutura visual pode ser usada para pesquisa, extensão ou inovação, mantendo o cadastro padronizado."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <Card
              key={category.title}
              className="space-y-4 p-6 shadow-lg shadow-black/5"
            >
              <Badge variant="secondary">{category.badge}</Badge>
              <div className="space-y-2">
                <Text as="h3" variant="body-lg-bold" className="text-black">
                  {category.title}
                </Text>
                <Text variant="body-md" className="text-gray-base">
                  {category.description}
                </Text>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Fluxo sugerido" showSeparator={false} align="center">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            "Selecionar o tipo de cadastro",
            "Preencher os campos do formulário específico",
            "Revisar e publicar o conteúdo",
          ].map((step, index) => (
            <Card
              key={step}
              className="p-6 text-center shadow-lg shadow-black/5"
            >
              <Text
                as="p"
                variant="body-sm-bold"
                className="uppercase tracking-[0.24em] text-gray-base"
              >
                Etapa {index + 1}
              </Text>
              <Text as="h3" variant="body-lg-bold" className="mt-3 text-black">
                {step}
              </Text>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
