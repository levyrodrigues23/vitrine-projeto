import { Badge, Text } from "../../components/ui";
import { MOCK_PROJECTS } from "../../constants/mock-data";
import { ProjectCategory } from "../../types/project.types";
import { WorksDone } from "../../components/features/trabalhos-feitos/trabalhos-feitos";
import Separator from "../../components/layout/separator/separator";

export function ProjectPage() {
  const featuredProjects = MOCK_PROJECTS.filter(
    (project) => project.category === ProjectCategory.Cientifico,
  );

  return (
    <div className="flex flex-col">
      <div className="relative w-full min-h-120">
        <div className="absolute inset-0 bg-[url('https://www.sintufce.org.br/wp-content/uploads/2024/10/Itapaje-scaled.jpg')] bg-cover bg-center z-0" />
        <div className="absolute inset-0 bg-black/50 z-0" />
          
        <div className="relative z-10 p-6 mt-100 mb-10 space-y-4">
            {featuredProjects.map((project) => (
            <Badge key={project.id} variant="tertiary">
              {project.category}
            </Badge>
          ))}
          <Text as="h1" variant="title-2" className="text-white">
            Engedados: Escola de inovação e cocriação em engenharia de software
            e ciencia de dados
          </Text>
          <div className="flex justify-start items-center">
            <Text as="p" className="text-white  ">
            Palavras‑chaves: 
          </Text>
          {featuredProjects.map((project) => (
            <Badge key={project.id} variant="tertiary" >
              {project.keywords}
            </Badge>
          ))}
          </div>
          
        </div>
      </div>

      <div className="mx-10 mt-10 space-y-4">
        <Text as="h1" variant="title-3" className="text-black mt-4 ">
          | Descrição do projeto
        </Text>

        <div className="mx-10 bg-transparent shadow-[-8px_0_20px_rgba(161,161,170,0.5)]  border-2 border-solid border-gray-300 p-8 pb-10 rounded-2xl h-auto md:max-w-300">
          <Text className="p-10">
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
      </div>
      <Separator className="md:mt-30" />
      <div className="mx-10  space-y-4">
        <Text as="h1" variant="title-3" className="text-black mb-10 mt-10">
          | Objetivos
        </Text>

        <div className="flex justify-between items-center w-full space-x-3">
          <div className="border border-zinc-300 border-l-4 border-l-black h-fit  p-4 rounded-2xl flex flex-col pr-15 md:w-100 ">
            <Text as="h1" variant="title-3-normal">
              1
            </Text>
            <Text variant="body-lg-bold">Projeto qualquer</Text>
            <Text variant="body-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </div>
          <div className="border border-zinc-300 border-l-4 border-l-black h-fit  p-4 rounded-2xl flex flex-col pr-15 md:w-100">
            <Text as="h1" variant="title-3-normal">
              1
            </Text>
            <Text variant="body-lg-bold">Projeto qualquer</Text>
            <Text variant="body-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </div>
          <div className="border border-zinc-300 border-l-4 border-l-black h-fit  p-4 rounded-2xl flex flex-col pr-15 md:w-100">
            <Text as="h1" variant="title-3-normal">
              1
            </Text>
            <Text variant="body-lg-bold">Projeto qualquer</Text>
            <Text variant="body-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </div>
          <div className="border border-zinc-300 border-l-4 border-l-black h-fit  p-4 rounded-2xl flex flex-col pr-15 md:w-100">
            <Text as="h1" variant="title-3-normal">
              1
            </Text>
            <Text variant="body-lg-bold">Projeto qualquer</Text>
            <Text variant="body-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </div>
        </div>

        <Separator className="md:mt-30" />
        <Text as="h1" variant="title-3" className="text-black mb-10 mt-10 ">
          | Trabalhos feitos
        </Text>
        <div className="flex justify-between items-center w-full space-x-3">
          {featuredProjects[0].worksDone?.map((work, index) => (
            <WorksDone key={index} {...work} />
          ))}
        </div>
      </div>
    </div>
  );
}
