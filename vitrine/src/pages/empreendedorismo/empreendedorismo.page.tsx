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
        subtitle="Startups, editais, fomento e iniciativas que conectam ideias ao ecossistema de inovação."
      />
      <Section title="O que é Empreendedorismo?" align="center">
        <div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-2xl md:flex-row md:items-start md:p-8">
          <Text
            className="text-center md:text-left"
            as="h2"
            variant="body-lg"
          >
            O <strong>empreendedorismo</strong> transforma ideias em soluções e
            negócios sustentáveis, conectando conhecimento acadêmico a desafios
            reais do território. No campus, isso acontece por meio de
            iniciativas, startups, desafios e programas de fomento que
            impulsionam a inovação.
            <br />
            <br />A partir desse movimento, estudantes desenvolvem competências
            como criatividade, validação de mercado e trabalho em equipe,
            aproximando a universidade da comunidade e do ecossistema local.
          </Text>

          <img
            src={Emprenderorismo}
            alt="Ilustração de oportunidades de empreendedorismo"
            className="mt-8 w-56 rounded-lg object-cover md:ml-8 md:mt-0 md:w-72"
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
              Ideias em fase de validação e projetos em evolução.
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
              Projetos de consultoria e experiências práticas.
            </Text>
          </div>
        </div>
      </div>
      <Section title="Experimente explorar por categoria!" showSeparator={false} align="center">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="flex flex-col items-center p-6 space-y-4 text-center md:items-start md:text-left md:justify-between">
            <div className="space-y-4 flex flex-col items-center md:items-start">
              <Text as="h3" variant="body-lg-bold">
                Startups do Campus
              </Text>
              <Text variant="body-md" className="text-gray-base">
                Ideias em fase de validação e projetos em evolução.
              </Text>
            </div>
            <NavLink
              to="/empreendedorismo/startups"
              className={buttonVariants({ variant: "primary", size: "md" })}
            >
              Ver startups
            </NavLink>
          </Card>
          <Card className="flex flex-col items-center p-6 space-y-4 text-center md:items-start md:text-left md:justify-between">
            <div className="space-y-4 flex flex-col items-center md:items-start">
              <Text as="h3" variant="body-lg-bold">
                Editais e Oportunidades
              </Text>
              <Text variant="body-md" className="text-gray-base">
                Chamadas, fomento e oportunidades para novos projetos.
              </Text>
            </div>
            <NavLink
              to="/empreendedorismo/editais"
              className={buttonVariants({ variant: "secondary", size: "md" })}
            >
              Ver editais
            </NavLink>
          </Card>
          <Card className="flex flex-col items-center p-6 space-y-4 text-center md:items-start md:text-left md:justify-between">
            <div className="space-y-4 flex flex-col items-center md:items-start">
              <Text as="h3" variant="body-lg-bold">
                Empresa Jr
              </Text>
              <Text variant="body-md" className="text-gray-base">
                Projetos de consultoria e experiências práticas.
              </Text>
            </div>
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
