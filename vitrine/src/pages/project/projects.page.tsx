import { NavLink } from "react-router";
import PageHero from "../../components/layout/page-hero/page-hero";
import { Card, Section, Text, buttonVariants } from "../../components/ui";
import ProjectIcon from "../../assets/icons/projetos-icon.svg";
import Pesquisa from "../../assets/icons/pesquisa-nobg (1).svg";
import Extensao from "../../assets/icons/extensao-nobg (1).svg";
import Inovacao from "../../assets/icons/inovacao-nobg (1).svg";

export function ProjectsPage() {
  return (
    <>
      <PageHero
        title="Projetos"
        subtitle="Conheça os projetos do campus organizados por pesquisa, extensão e inovação."
      />
      <Section title="Como os projetos são organizados">
        <div className="flex md:flex-row flex-col bg-white p-4 rounded-2xl text-shadow-olive-200 shadow-2xl">
          <Text className="pt-3 pl-3" as="h2" variant="body-lg">
            O <strong>Portal de Egressos</strong> tem o objetivo de mostrar as
            atividades e ações dos estudantes egressos do Campus, destacando
            suas trajetórias profissionais, acadêmicas e de pesquisa. O portal é
            um espaço para compartilhar notícias, histórias de sucesso,
            oportunidades de networking e recursos para os egressos,
            fortalecendo a conexão entre a instituição e seus ex-alunos. Através
            do portal, os egressos podem se manter informados sobre eventos,
            programas de desenvolvimento profissional e oportunidades de
            colaboração, promovendo uma comunidade ativa e engajada mesmo após a
            conclusão da graduação.
            <br />
          </Text>

          <img
            src={ProjectIcon}
            alt="Icone de uma pessoa com um diploma, simbolizando os egressos do campus."
            className=" w-100 h-100 md:w-72 md:h-72 md:ml-6 "
          />
        </div>
      </Section>
      <div className="flex flex-col gap-28 my-24 px-8 items-center">
        {/* PESQUISA */}
        <div
          data-aos="fade-up"
          className="flex flex-col items-center text-center gap-6"
        >
          <img
            src={Pesquisa}
            alt="Imagem representando pesquisa"
            className="w-52 md:w-72 object-contain"
          />

          <div className="max-w-md space-y-2">
            <Text as="h2" variant="title-3">
              Pesquisa
            </Text>

            <Text variant="body-md" className="text-gray-base leading-relaxed">
              Estudos conduzidos por alunos e docentes.
            </Text>
          </div>
        </div>

        {/* EXTENSÃO */}
        <div
          data-aos="fade-up"
          className="flex flex-col items-center text-center gap-6"
        >
          <img
            src={Extensao}
            alt="Imagem representando extensão"
            className="w-52 md:w-72 object-contain"
          />

          <div className="max-w-md space-y-2">
            <Text as="h2" variant="title-3">
              Extensão
            </Text>

            <Text variant="body-md" className="text-gray-base leading-relaxed">
              Projetos voltados para a comunidade externa.
            </Text>
          </div>
        </div>

        {/* INOVAÇÃO */}
        <div
          data-aos="fade-up"
          className="flex flex-col items-center text-center gap-6"
        >
          <img
            src={Inovacao}
            alt="Imagem representando inovação"
            className="w-52 md:w-72 object-contain"
          />

          <div className="max-w-md space-y-2">
            <Text as="h2" variant="title-3">
              Inovação
            </Text>

            <Text variant="body-md" className="text-gray-base leading-relaxed">
              Soluções e protótipos com foco em impacto.
            </Text>
          </div>
        </div>
      </div>
      <Section title="Experimente explorar por categoria!" showSeparator={false} align="center" >
        <div className="grid gap-6 md:grid-cols-3">
          <Card className=" flex flex-col p-6 space-y-4 text-center md:text-left">
            <Text as="h3" variant="body-lg-bold">
              Pesquisa
            </Text>
            <Text variant="body-md" className="text-gray-base">
              Estudos e investigações conduzidas por alunos e docentes.
            </Text>
            <NavLink
              to="/projetos/pesquisa"
              className={buttonVariants({ variant: "primary", size: "md" })}
            >
              Ver projetos de pesquisa
            </NavLink>
          </Card>
          <Card className=" flex flex-col p-6 space-y-4 text-center md:text-left">
            <Text as="h3" variant="body-lg-bold">
              Extensão
            </Text>
            <Text variant="body-md" className="text-gray-base">
              Ações e projetos voltados para a comunidade externa.
            </Text>
            <NavLink
              to="/projetos/extensao"
              className={buttonVariants({ variant: "primary", size: "md" })}
            >
              Ver projetos de extensao
            </NavLink>
          </Card>
          <Card className=" flex flex-col p-6 space-y-4 text-center md:text-left">
            <Text as="h3" variant="body-lg-bold">
              Inovação
            </Text>
            <Text variant="body-md" className="text-gray-base">
              Soluções aplicadas e protótipos com foco em impacto.
            </Text>
            <NavLink
              to="/projetos/inovacao"
              className={buttonVariants({ variant: "primary", size: "md" })}
            >
              Ver projetos de inovacao
            </NavLink>
          </Card>
        </div>
      </Section>
    </>
  );
}
