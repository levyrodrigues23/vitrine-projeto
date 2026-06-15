import { useQuery } from "@tanstack/react-query";
import { getEditalById } from "../../services/edital.service";
import { queryKeys } from "../../services/query-keys";

export function useEdital(id?: string) {
  const queryKey = id
    ? queryKeys.noticesDetail(id)
    : (["notices", "detail", "missing"] as const);

  const query = useQuery({
    queryKey,
    queryFn: () => {
      if (!id) throw new Error("Edital id is required.");
      return getEditalById(id);
    },
    enabled: Boolean(id),
  });

  return {
    edital: query.data ?? null,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refresh: query.refetch,
  };
}