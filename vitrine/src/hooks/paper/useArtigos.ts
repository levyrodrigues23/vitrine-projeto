import { useQuery } from "@tanstack/react-query";
import { listArtigos } from "../../services/papers.service";
import { queryKeys } from "../../services/query-keys";

export function useArtigos() {
  const query = useQuery({
    queryKey: queryKeys.papers,
    queryFn: listArtigos,
  });

  return {
    papers: query.data ?? [],
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refresh: query.refetch,
  };
}
