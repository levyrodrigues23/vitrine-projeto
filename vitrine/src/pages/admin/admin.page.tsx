import Hero from "../../components/layout/hero-section/hero";
import { Card, Section, Text } from "../../components/ui";

export function AdminPage() {
  const actions = [
    {
      title: "Cadastrar projeto",
      description: "Inclua novos projetos na vitrine do campus.",
    },
    {
      title: "Gerenciar usuarios",
      description: "Controle acessos e permissoes das contas internas.",
    },
    {
      title: "Atualizar conteudo",
      description: "Edite informacoes e publique novidades na plataforma.",
    },
  ];
  const workflow = [
    {
      title: "Revisar dados",
      description: "Verifique texto, imagens e categorias antes de publicar.",
    },
    {
      title: "Publicar",
      description: "Disponibilize o conteudo para a comunidade.",
    },
    {
      title: "Monitorar",
      description: "Acompanhe ajustes e pedidos de alteracao.",
    },
  ];

  return (
    <>
      <Hero
        title="Administracao"
        subtitle="Area interna para gerenciar projetos e conteudo da vitrine."
      />
      <Section
        title="Acoes principais"
        description="Atalhos para as rotinas mais comuns do dia a dia."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {actions.map((action) => (
            <Card key={action.title} className="p-6 space-y-3">
              <Text as="h3" variant="body-lg-bold">
                {action.title}
              </Text>
              <Text variant="body-md" className="text-gray-base">
                {action.description}
              </Text>
            </Card>
          ))}
        </div>
      </Section>
      <Section
        title="Fluxo de trabalho"
        description="Passos simples para manter o conteudo organizado."
        showSeparator={false}
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {workflow.map((item) => (
            <Card key={item.title} className="p-6 space-y-3">
              <Text as="h3" variant="body-lg-bold">
                {item.title}
              </Text>
              <Text variant="body-md" className="text-gray-base">
                {item.description}
              </Text>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
