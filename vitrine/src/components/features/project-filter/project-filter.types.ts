import type { ProjectFilterCategory } from "../../../store/useProjectStore";

export type ProjectFilterOption = {
  id: ProjectFilterCategory;
  label: string;
  to: string;
};

export type ProjectFilterProps = {
  className?: string;
};
