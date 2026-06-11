import { NavLink } from "react-router";
import PageHero from "../../components/layout/page-hero/page-hero";
import { buttonVariants, Card, Section, Text } from "../../components/ui";

export function NotFoundPage() {
  return (
    <>
      <PageHero
        title="404"
        subtitle="Não encontramos a página que você tentou acessar."
      />
      <Section
        title="Página não encontrada"
        description="Verifique o endereço ou volte para a página inicial."
        showSeparator={false}
        align="center"
      >
        <Card className="max-w-md mx-auto p-6 space-y-3 text-center">
          <Text variant="body-md" className="text-gray-base">
            Se precisar, use o menu para navegar entre as seções principais.
          </Text>

        </Card>
        <NavLink
          to="/"
          className={buttonVariants({ variant: "secondary", size: "md" })}
        >
          Voltar para página inicial
        </NavLink>
      </Section>
    </>
  );
}
