import { useQuery } from "@tanstack/react-query";
import { getMinicourseById } from "../../services/minicourse.service";
import { queryKeys } from "../../services/query-keys";

export function useMinicourse(id?: string) {
  const queryKey = id
    ? queryKeys.minicourseDetail(id)
    : (["minicourses", "detail", "missing"] as const);

  const query = useQuery({
    queryKey,
    queryFn: () => {
      if (!id) throw new Error("Minicourse id is required.");
      return getMinicourseById(id);
    },
    enabled: Boolean(id),
  });

  return {
    minicourse: query.data ?? null,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refresh: query.refetch,
  };
}
