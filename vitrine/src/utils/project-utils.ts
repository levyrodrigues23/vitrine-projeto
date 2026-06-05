import type { ProjectFilterCategory } from "../store/useProjectStore";
import type { Project, ProjectCategory } from "../types/project.types";

export function countProjectsByCategory(
  projects: Project[],
): Record<ProjectCategory, number> {
  const counts = {} as Record<ProjectCategory, number>;

  for (const project of projects) {
    counts[project.category] = (counts[project.category] ?? 0) + 1;
  }

  return counts;
}

export function formatProjectCount(count: number): string {
  return count === 1 ? "1 projeto" : `${count} projetos`;
}

export function formatCategoryProjectCount(
  count: number,
  categoryLabel: string,
): string {
  const noun = count === 1 ? "projeto" : "projetos";
  return `${count} ${noun} de ${categoryLabel.toLowerCase()}`;
}

export function filterProjects(
  projects: Project[],
  category: ProjectFilterCategory,
  searchQuery: string,
): Project[] {
  const list =
    category === "all"
      ? projects
      : projects.filter((project) => project.category === category);

  const query = searchQuery.trim().toLowerCase();
  if (!query) return list;

  return list.filter(
    (project) =>
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query),
  );
}
