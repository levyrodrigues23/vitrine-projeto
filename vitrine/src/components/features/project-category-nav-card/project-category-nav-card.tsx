import { NavLink } from "react-router";
import { Card, Text } from "../../ui";
import type { ProjectCategoryMeta } from "../../../constants/project-categories";
import { formatProjectCount } from "../../../utils/project-utils";

export type ProjectCategoryNavCardProps = {
  meta: ProjectCategoryMeta;
  count: number;
};

export function ProjectCategoryNavCard({
  meta,
  count,
}: ProjectCategoryNavCardProps) {
  const Icon = meta.icon;

  return (
    <NavLink to={meta.path} className="block h-full">
      <Card className="group flex h-full flex-col gap-3 rounded-2xl border border-gray-base/15 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue/10 text-blue-dark transition group-hover:scale-105">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <Text as="h3" variant="body-lg-bold">
            {meta.label}
          </Text>
          <Text variant="body-md" className="text-gray-base">
            {formatProjectCount(count)}
          </Text>
          <Text variant="body-sm" className="mt-2 line-clamp-2 text-gray-base">
            {meta.description}
          </Text>
        </div>
        <Text
          variant="body-sm"
          className="mt-auto font-semibold text-blue-dark group-hover:underline"
        >
          Ver projetos de {meta.label.toLowerCase()} →
        </Text>
      </Card>
    </NavLink>
  );
}
