import { NavLink } from "react-router";
import PageHero from "../../components/layout/page-hero/page-hero";
import { Card, Section, Text, buttonVariants } from "../../components/ui";
import Emprenderorismo from "../../assets/icons/empreendorismo.jpg"
import Pesquisa from "../../assets/icons/pesquisa-nobg (1).svg";
import Extensao from "../../assets/icons/extensao-nobg (1).svg";
import Inovacao from "../../assets/icons/inovacao-nobg (1).svg";

export function EmpreendedorismoPage() {
  return (
    <>
      <PageHero
        title="Empreendedorismo"
        subtitle="Startups, editais, fomento e iniciativas que conectam ideias ao ecossistema de inovacao."
      />
      <Section title="O que é Empreendedorismo?">
        <div className="flex md:flex-row flex-col bg-white p-4 items-center rounded-2xl text-shadow-olive-200 shadow-2xl">
          <Text className="pt-3 pl-3" as="h2" variant="body-lg">
            O <strong>empreendedorismo</strong> transforma ideias em solucoes e
            negocios sustentaveis, conectando conhecimento academico a desafios
            reais do territorio. No campus, isso acontece por meio de
            iniciativas, startups, desafios e programas de fomento que
            impulsionam a inovacao.
            <br />
            <br />A partir desse movimento, estudantes desenvolvem competencias
            como criatividade, validacao de mercado e trabalho em equipe,
            aproximando a universidade da comunidade e do ecossistema local.
          </Text>

          <img

            src={Emprenderorismo}
            alt="Icone de marcador representando oportunidades de empreendedorismo"
            className=" object-cover w-100 h-100 md:w-72 md:h-72 md:ml-6 "
          />
        </div>
      </Section>
        <div className="flex flex-col gap-28 my-24 px-8 items-center">
       
        <div
          data-aos="fade-up"
          className="flex flex-col items-center text-center gap-6"
        >
          <img
            src={Pesquisa}
            alt="Imagem representando startups do campus"
            className="w-52 md:w-72 object-contain"
          />

          <div className="max-w-md space-y-2">
            <Text as="h2" variant="title-3">
              Startups do Campus
            </Text>

            <Text variant="body-md" className="text-gray-base leading-relaxed">
              Ideias em fase de validacao e projetos em evolucao.
            </Text>
          </div>
        </div>

        
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
              Editais e oportunidades
            </Text>

            <Text variant="body-md" className="text-gray-base leading-relaxed">
              Chamadas, fomento e oportunidades para novos projetos.
            </Text>
          </div>
        </div>

        
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
              Empresa Jr
            </Text>

            <Text variant="body-md" className="text-gray-base leading-relaxed">
              Projetos de consultoria e experiencias praticas.
            </Text>
          </div>
        </div>
      </div>
      <Section title="Experimente explorar por categoria!" showSeparator={false} align="center">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="flex flex-col p-6 space-y-4 text-center md:text-left">
            <Text as="h3" variant="body-lg-bold">
              Startups do Campus
            </Text>
            <Text variant="body-md" className="text-gray-base">
              Ideias em fase de validacao e projetos em evolucao.
            </Text>
            <NavLink
              to="/empreendedorismo/startups"
              className={buttonVariants({ variant: "primary", size: "md" })}
            >
              Ver startups
            </NavLink>
          </Card>
          <Card className="flex flex-col p-6 space-y-4 text-center md:text-left">
            <Text as="h3" variant="body-lg-bold">
              Editais e Oportunidades
            </Text>
            <Text variant="body-md" className="text-gray-base">
              Chamadas, fomento e oportunidades para novos projetos.
            </Text>
            <NavLink
              to="/empreendedorismo/editais"
              className={buttonVariants({ variant: "secondary", size: "md" })}
            >
              Ver editais
            </NavLink>
          </Card>
          <Card className="flex flex-col p-6 space-y-4 text-center md:text-left">
            <Text as="h3" variant="body-lg-bold">
              Empresa Jr
            </Text>
            <Text variant="body-md" className="text-gray-base">
              Projetos de consultoria e experiencias praticas.
            </Text>
            <NavLink
              to="/empreendedorismo/empresa-jr"
              className={buttonVariants({ variant: "quaternary", size: "md" })}
            >
              Ver Empresa Jr
            </NavLink>
          </Card>
        </div>
      </Section>
    </>
  );
}
