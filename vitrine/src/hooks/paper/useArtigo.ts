import { useQuery } from "@tanstack/react-query";
import { getIdArtigo } from "../../services/papers.service";
import { queryKeys } from "../../services/query-keys";

export function useArtigo(id?: string) {
  const queryKey = id
    ? queryKeys.paperDetail(id)
    : (["papers", "detail", "missing"] as const);

  const query = useQuery({
    queryKey,
    queryFn: () => {
      if (!id) throw new Error("Artigo id is required.");
      return getIdArtigo(id);
    },
    enabled: Boolean(id),
  });

  return {
    artigo: query.data ?? null,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refresh: query.refetch,
  };
}
