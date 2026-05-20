import { NavLink } from "react-router";
import PageHero from "../../components/layout/page-hero/page-hero";
import { Card, Section, Text, buttonVariants } from "../../components/ui";

export function PortalEgressosPage() {
  return (
    <>
      <PageHero
        title="Portal de Egressos"
        subtitle="Beneficios, histórias e canais para quem concluiu a graduação no campus."
      />
      <Section title="Sobre o portal" SectionWhite={true} >
        <Text as="h2" variant="body-lg" className="text-center md:text-left">
          Este portal apresenta a trajetória de estudantes egressos do Campus
          Itapaje, mostrando onde atuam no mercado, em que áreas trabalham e
          quais conquistas tiveram após a formação. Também reúne notícias e
          destaques de atuações científicas e profissionais.
        </Text>
      </Section>
      <Section title="Acessar categorias" showSeparator={false} className="text-center md:text-left">
        <Text as="h2" variant="body-lg" className="text-center md:text-left">
          Selecione uma das áreas abaixo para conhecer egressos e notícias.
        </Text>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className=" shadow-2xl flex flex-col p-6 space-y-4 text-center md:text-left">
            <Text as="h3" variant="body-lg-bold">
              Egressos por Curso
            </Text>
            <Text variant="body-md" className="text-gray-base">
              Panorama de egressos, suas áreas de atuação e pós-graduação.
            </Text>
            <NavLink
              to="/portal-egressos/egressos"
              className={buttonVariants({ variant: "primary", size: "md" })}
            >
              Ver egressos
            </NavLink>
          </Card>
          <Card className=" shadow-2xl flex flex-col p-6 space-y-4 text-center md:text-left">
            <Text as="h3" variant="body-lg-bold">
              Notícias dos Egressos
            </Text>
            <Text variant="body-md" className="text-gray-base">
              Notícias pontuais sobre atuações científicas e profissionais.
            </Text>
            <NavLink
              to="/portal-egressos/noticias"
              className={buttonVariants({ variant: "secondary", size: "md" })}
            >
              Ver notícias
            </NavLink>
          </Card>
        </div>
      </Section>
    </>
  );
}
