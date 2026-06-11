import { useQuery } from "@tanstack/react-query";
import { listCongresses } from "../../services/congress.service";
import { queryKeys } from "../../services/query-keys";

export function useCongresses() {
  const query = useQuery({
    queryKey: queryKeys.congresses,
    queryFn: listCongresses,
  });

  return {
    congresses: query.data ?? [],
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refresh: query.refetch,
  };
}
