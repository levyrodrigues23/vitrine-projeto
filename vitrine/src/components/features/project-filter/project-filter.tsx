import { NavLink } from "react-router";
import { BlockHelp, Input, Text, buttonVariants } from "../../ui";
import { ProjectCategory } from "../../../types/project.types";
import {
  type ProjectFilterOption,
  type ProjectFilterProps,
} from "./project-filter.types";
import { useProjectStore } from "../../../store/useProjectStore";

const PROJECT_FILTERS: ProjectFilterOption[] = [
  { id: "all", label: "Todos", to: "/projetos" },
  { id: ProjectCategory.Pesquisa, label: "Pesquisa", to: "/projetos/pesquisa" },
  { id: ProjectCategory.Extensao, label: "Extensão", to: "/projetos/extensao" },
  { id: ProjectCategory.Inovacao, label: "Inovação", to: "/projetos/inovacao" },
];

export function ProjectFilter({ className }: ProjectFilterProps) {
  const activeCategory = useProjectStore((state) => state.activeCategory);
  const searchQuery = useProjectStore((state) => state.searchQuery);
  const setActiveCategory = useProjectStore((state) => state.setActiveCategory);
  const setSearchQuery = useProjectStore((state) => state.setSearchQuery);

  return (
    <div className={className}>
      <div className="mb-6 flex flex-col items-center gap-2 text-center sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3">
        <Text as="h2" variant="title-3" className="text-black">
          Catálogo
        </Text>
        <BlockHelp
          topicLabel="catálogo e filtros"
          explanation="Use as categorias para ver só pesquisa, extensão ou inovação. A busca filtra por título ou descrição dos projetos."
        />
      </div>

      <div
        className="mb-8 flex flex-wrap justify-center gap-2"
        role="toolbar"
        aria-label="Filtrar projetos por categoria"
      >
        {PROJECT_FILTERS.map(({ id, label, to }) => (
          <NavLink
            key={to}
            to={to}
            end={id === "all"}
            onClick={() => setActiveCategory(id)}
            className={({ isActive }) =>
              `${buttonVariants({ variant: isActive ? "primary" : "quaternary", size: "sm" })} rounded-full px-4 py-2 text-sm font-semibold`
            }
            aria-current={activeCategory === id ? "page" : undefined}
          >
            {label}
          </NavLink>
        ))}
      </div>

      <label className="mx-auto mb-10 block max-w-xl">
        <span className="mb-2 block text-left text-sm font-semibold text-gray-base-dark">
          Buscar
        </span>
        <Input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Digite algo"
          aria-label="Buscar projetos por nome ou descrição"
          className="h-11 bg-white"
        />
      </label>
    </div>
  );
}
