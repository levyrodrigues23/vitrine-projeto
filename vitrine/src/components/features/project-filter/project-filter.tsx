import { Input } from "../../ui";
import type { ProjectFilterCategory } from "../../../store/useProjectStore";
import { useProjectStore } from "../../../store/useProjectStore";
import { ProjectCategory } from "../../../types/project.types";
import type { ProjectFilterProps } from "./project-filter.types";

const CATEGORY_OPTIONS: { id: ProjectFilterCategory; label: string }[] = [
  { id: "all", label: "Todas as categorias" },
  { id: ProjectCategory.Pesquisa, label: "Pesquisa" },
  { id: ProjectCategory.Extensao, label: "Extensão" },
  { id: ProjectCategory.Inovacao, label: "Inovação" },
];

export function ProjectFilter({ className }: ProjectFilterProps) {
  const activeCategory = useProjectStore((state) => state.activeCategory);
  const searchQuery = useProjectStore((state) => state.searchQuery);
  const setActiveCategory = useProjectStore((state) => state.setActiveCategory);
  const setSearchQuery = useProjectStore((state) => state.setSearchQuery);

  return (
    <div
      className={`mx-auto flex w-full max-w-4xl flex-col gap-4 sm:flex-row sm:items-end ${className ?? ""}`}
    >
      <label className="flex-1">
        <span className="mb-2 block text-left text-sm font-semibold text-gray-base-dark">
          Buscar
        </span>
        <Input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Digite algo"
          aria-label="Buscar projetos por nome ou descrição"
          className="h-11 bg-white"
        />
      </label>

      <label className="sm:w-56">
        <span className="mb-2 block text-left text-sm font-semibold text-gray-base-dark">
          Categoria
        </span>
        <select
          value={activeCategory}
          onChange={(event) =>
            setActiveCategory(event.target.value as ProjectFilterCategory)
          }
          aria-label="Filtrar projetos por categoria"
          className="h-11 w-full rounded-lg border border-gray-base/30 bg-white px-3 text-sm text-gray-base-dark outline-none focus:border-blue-dark focus:ring-2 focus:ring-blue/20"
        >
          {CATEGORY_OPTIONS.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
