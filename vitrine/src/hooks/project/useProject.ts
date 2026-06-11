import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../../services/projects.service";
import { queryKeys } from "../../services/query-keys";

export function useProject(id?: string) {
  const queryKey = id
    ? queryKeys.projectDetail(id)
    : (["projects", "detail", "missing"] as const);

  const query = useQuery({
    queryKey,
    queryFn: () => {
      if (!id) {
        throw new Error("Project id is required.");
      }

      return getProjectById(id);
    },
    enabled: Boolean(id),
  });

  return {
    project: query.data ?? null,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refresh: query.refetch,
  };
}
