import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../services/query-keys";
import { listEditais } from "../../services/edital.service";

export function useEditais() {
  const query = useQuery({
    queryKey: queryKeys.notices,
    queryFn: listEditais,
  });

  return {
    editais: query.data ?? [],
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refresh: query.refetch,
  };
}