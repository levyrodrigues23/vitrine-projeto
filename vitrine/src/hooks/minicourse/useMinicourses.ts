import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../services/query-keys";
import { listMinicourses } from "../../services/minicourse.service";

export function useMinicourses() {
  const query = useQuery({
    queryKey: queryKeys.minicourses,
    queryFn: listMinicourses,
  });

  return {
    minicourses: query.data ?? [],
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refresh: query.refetch,
  };
}
