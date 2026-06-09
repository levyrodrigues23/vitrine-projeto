import { useState } from "react";
import PageHero from "../../components/layout/page-hero/page-hero";
import { Section } from "../../components/ui";
import { TeacherCard, AreaCard } from "../../components/features";
import { useTeachers } from "../../hooks/teacher";
import {
  Code2,
  BarChart3,
  Brain,
  Globe,
  Database,
  Gamepad2,
  Shield,
  Network,
  Building2,
} from "lucide-react";
import { MOCK_AREAS } from "../../constants/mock-data";

const getIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    Code2,
    BarChart3,
    Brain,
    Globe,
    Database,
    Gamepad2,
    Shield,
    Network,
    Building2,
  };

  return icons[iconName] || Code2;
};

export function ProfessoresPage() {
  const { teachers, loading, error } = useTeachers();
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const getFilteredTeachers = () => {
    if (!selectedArea) return teachers;

    const area = MOCK_AREAS.find((a) => a.id === selectedArea);

    if (!area) return teachers;

    return teachers.filter(
      (teacher) => teacher.area === area.name
    );
  };

  const filteredTeachers = getFilteredTeachers();

  const handleAreaToggle = (areaId: string) => {
    setSelectedArea(selectedArea === areaId ? null : areaId);
  };

  return (
    <>
      <PageHero
        title="Professores"
        subtitle="Corpo docente, áreas de atuação e contatos institucionais."
      />

      <Section
        title="Áreas de atuação"
        description="Explore as principais áreas de pesquisa e ensino"
        align="center"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_AREAS.map((area) => (
            <AreaCard
              key={area.id}
              name={area.name}
              description={area.description}
              icon={getIcon(area.icon)}
              isSelected={selectedArea === area.id}
              onClick={() => handleAreaToggle(area.id)}
            />
          ))}
        </div>

        {selectedArea && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setSelectedArea(null)}
              className="rounded-lg border border-blue-dark bg-white px-6 py-2 font-semibold text-blue-dark transition hover:bg-blue-dark hover:text-white"
            >
              Ver todos
            </button>
          </div>
        )}
      </Section>

      <Section title="Corpo docente" align="center">
        {loading ? (
          <p className="text-center text-gray-base">
            Carregando professores...
          </p>
        ) : error ? (
          <p className="text-center text-red-500">
            {error}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 transition-all duration-300 md:grid-cols-2 lg:grid-cols-3">
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher) => (
                <TeacherCard
                  key={teacher.id}
                  name={teacher.name}
                  grau={teacher.grau}
                  imageUrl={undefined}
                  lattes={teacher.lattes}
                />
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-gray-base">
                <p className="text-lg font-medium">
                  Nenhum professor encontrado nesta área
                </p>
              </div>
            )}
          </div>
        )}
      </Section>
    </>
  );
}