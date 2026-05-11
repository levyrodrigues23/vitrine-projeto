import { Badge, Text } from "../../components/ui";
import { MOCK_PROJECTS } from "../../constants/mock-data";
import { ProjectCategory } from "../../types/project.types";
import { WorksDone } from "../../components/features/trabalhos-feitos/trabalhos-feitos";

export function ProducaoCientificaPage() {
  const featuredProjects = MOCK_PROJECTS.filter(
    (p) => p.category === ProjectCategory.Cientifico,
  );
  return (
    <div className="flex flex-col">
      <div className="relative w-full min-h-[480px]">
        <div className="absolute inset-0 bg-[url('https://www.sintufce.org.br/wp-content/uploads/2024/10/Itapaje-scaled.jpg')] bg-cover bg-center z-0" />
        <div className="absolute inset-0 bg-black/50 z-0" />

        <div className="relative z-10 p-6">
          <Text as="h1" variant="title-2" className="text-white">
            Engedados: Escola de inovação e cocriação em engenharia de software
            e ciencia de dados
          </Text>
          <Text as="p" className="text-white">
            Palavras‑chaves
          </Text>
          {featuredProjects.map((project) => (
            <Badge key={project.id} variant="outline">
              {project.keywords?.join(", ")}
            </Badge>
          ))}
        </div>
      </div>

      <Text className="text-black mt-4">
        | Descrição do projeto
      </Text>
      <Text className="text-black mt-4">
        | Objetivos
      </Text>
      <Text className="text-black mt-4">
          <Wor

      </Text>
    </div>
  );
}
