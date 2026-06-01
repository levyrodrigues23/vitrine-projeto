import { useQuery } from "@tanstack/react-query";
import { listProjects } from "../services/projects.service";
import { queryKeys } from "../services/query-keys";

export function useProjects() {
  const query = useQuery({
    queryKey: queryKeys.projects,
    queryFn: listProjects,
  });

  return {
    projects: query.data ?? [],
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refresh: query.refetch,
  };
}
