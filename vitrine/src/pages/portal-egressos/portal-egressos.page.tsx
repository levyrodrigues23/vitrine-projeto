import { NavLink } from "react-router";
import PageHero from "../../components/layout/page-hero/page-hero";
import { Card, Section, Text, buttonVariants } from "../../components/ui";
import Egress from "../../assets/images/egress-image.png";


export function PortalEgressosPage() {
  return (
    <>
      <PageHero
        title="Portal de Egressos"
        subtitle="Beneficios, histórias e canais para quem concluiu a graduação no campus."
      />
      <Section title="| Sobre o portal" showSeparator={false}>
              <div className="flex md:flex-row flex-col bg-white p-4 rounded-2xl text-shadow-olive-200 shadow-2xl">
                <Text className="pt-3 pl-3" as="h2" variant="body-lg">
                  O <strong>Portal de Egressos</strong> tem o objetivo de mostrar as atividades e ações dos estudantes egressos do Campus, destacando suas trajetórias profissionais, acadêmicas e de pesquisa. O portal é um espaço para compartilhar notícias, histórias de sucesso, oportunidades de networking e recursos para os egressos, fortalecendo a conexão entre a instituição e seus ex-alunos. Através do portal, os egressos podem se manter informados sobre eventos, programas de desenvolvimento profissional e oportunidades de colaboração, promovendo uma comunidade ativa e engajada mesmo após a conclusão da graduação.
                  <br />
   
                </Text>
      
                <img
                  src={Egress}
                  alt="Icone de uma pessoa com um diploma, simbolizando os egressos do campus."
                  className=" w-100 h-100 md:w-72 md:h-72 md:ml-6 "
                />
              </div>
            </Section>
      <Section  description="Selecione uma das áreas abaixo para conhecer egressos e notícias." align="center" showSeparator={false} className="text-center">
       
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
