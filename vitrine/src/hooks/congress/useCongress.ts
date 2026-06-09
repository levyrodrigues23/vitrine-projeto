import { useQuery } from "@tanstack/react-query";
import { getIdCongress } from "../../services/congress.service";
import { queryKeys } from "../../services/query-keys";

export function useCongress(id?: string) {
  const queryKey = id
    ? queryKeys.congressDetail(id)
    : (["congress", "detail", "missing"] as const);

  const query = useQuery({
    queryKey,
    queryFn: () => {
      if (!id) throw new Error("Congress id is required.");
      return getIdCongress(id);
    },
    enabled: Boolean(id),
  });

  return {
    congress: query.data ?? null,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refresh: query.refetch,
  };
}
