import { Badge, Text } from "../../components/ui";
import { MOCK_PROJECTS } from "../../constants/mock-data";
import { ProjectCategory } from "../../types/project.types";
import { WorksDone } from "../../components/features/trabalhos-feitos/trabalhos-feitos";
import Separator from "../../components/layout/separator/separator";
import { ProfessorCard } from "../../components/features/professor-card/professor-card";
import { MOCK_TEACHERS } from "../../constants/mock-data";

export function ProjectPage() {
  const featuredProjects = MOCK_PROJECTS.filter(
    (project) => project.category === ProjectCategory.Cientifico,
  );
  const featuredProject = featuredProjects[0];
  const objectives = [
    {
      id: "01",
      title: "Projeto qualquer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: "02",
      title: "Projeto qualquer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: "03",
      title: "Projeto qualquer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: "04",
      title: "Projeto qualquer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative isolate min-h-[420px] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.sintufce.org.br/wp-content/uploads/2024/10/Itapaje-scaled.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />
        <div
          className="absolute inset-0]"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-16 md:py-24">
          <div className="flex flex-wrap items-center gap-2">
            {featuredProject ? (
              <Badge variant="secondary" className="ml-0 px-3 py-1 text-xs">
                {featuredProject.category}
              </Badge>
            ) : null}
            {featuredProject?.keywords?.map((keyword) => (
              <Badge
                key={keyword}
                variant="outline"
                className="ml-0 px-3 py-1 text-xs text-white border-white/60"
              >
                {keyword}
              </Badge>
            ))}
          </div>
          <Text as="h1" variant="title-2" className="text-white max-w-3xl">
            Engedados: Escola de inovação e cocriação em engenharia de software
            e ciencia de dados
          </Text>
          <Text as="p" variant="body-lg" className="text-white/80 max-w-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-6 py-12 space-y-12">
        <section className="space-y-4" data-aos="fade-up">
          <Text as="h2" variant="title-3" className="text-black">
            | Descrição do projeto
          </Text>
          <div className="rounded-2xl border border-gray-base/20 bg-white/90 p-8 shadow-sm">
            <Text variant="body-md" className="text-gray-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              tempus, nunc nec tempus vulputate, tortor ex mollis ipsum, in
              hendrerit nulla nunc eget urna. Suspendisse potenti. Praesent
              aliquam sagittis risus, at blandit risus porttitor nec. Integer
              pharetra facilisis dignissim. Nullam auctor elit et vulputate
              pharetra. Fusce ipsum dolor, condimentum et augue eget, tempor
              rutrum arcu. Integer ultrices non justo in sodales. Nam cursus non
              augue in volutpat. Nullam nec commodo tellus. Mauris egestas
              tristique egestas. Donec at rhoncus magna, et consequat arcu.
              Phasellus cursus congue augue ac ultrices.
            </Text>
          </div>
        </section>

        <Separator spacing="lg" />

        <section className="space-y-6" data-aos="fade-up">
          <Text as="h2" variant="title-3" className="text-black">
            | Objetivos
          </Text>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {objectives.map((objective) => (
              <div
                key={objective.id}
                className="rounded-2xl border border-gray-base/20 bg-white p-5 shadow-sm space-y-2"
              >
                <Text
                  as="span"
                  variant="body-md-bold"
                  className="text-gray-base-dark"
                >
                  {objective.id}
                </Text>
                <Text as="h3" variant="body-lg-bold" className="text-black">
                  {objective.title}
                </Text>
                <Text variant="body-md">{objective.description}</Text>
              </div>
            ))}
          </div>
        </section>

        <Separator spacing="lg" />

        <section className="space-y-6" data-aos="fade-up">
          <Text as="h2" variant="title-3" className="text-black">
            | Professores envolvidos
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_TEACHERS.map((teacher) => (
              <ProfessorCard
                key={teacher.id}
                name={teacher.name}
                imageUrl={teacher.imageUrl}
              />
            ))}
          </div>
        </section>

        <Separator spacing="lg" />

        <section className="space-y-6" data-aos="fade-up">
          <Text as="h2" variant="title-3" className="text-black">
            | Trabalhos feitos
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProject?.worksDone?.map((work, index) => (
              <WorksDone key={index} {...work} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
