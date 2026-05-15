import PageHero from "../../components/layout/page-hero/page-hero";
import { Card, Section, Text } from "../../components/ui";

export function LoginPage() {
  return (
    <>
      <PageHero
        title="Login"
        subtitle="Acesso restrito para administração e atualização de conteúdo da vitrine."
      />
      <Section
        title="Area restrita"
        description="Utilize suas credenciais institucionais para entrar."
        showSeparator={false}
      >
        <Card className="max-w-md p-6 space-y-3">
          <Text variant="body-md" className="text-gray-base">
            Formulario de acesso sera inserido aqui. Use seu email institucional
            e senha cadastrada.
          </Text>
          <Text variant="body-md" className="text-gray-base">
            Em caso de problema, procure a equipe responsavel pelo portal.
          </Text>
        </Card>
      </Section>
    </>
  );
}
