import Hero from "../../components/layout/hero-section/hero";
import { Card, Section, Text } from "../../components/ui";

export function NotFoundPage() {
  return (
    <>
      <Hero
        title="404"
        subtitle="Nao encontramos a pagina que voce tentou acessar."
      />
      <Section
        title="Pagina nao encontrada"
        description="Verifique o endereco ou volte para a pagina inicial."
        showSeparator={false}
      >
        <Card className="max-w-md p-6 space-y-3">
          <Text variant="body-md" className="text-gray-base">
            Se precisar, use o menu para navegar entre as secoes principais.
          </Text>
        </Card>
      </Section>
    </>
  );
}
