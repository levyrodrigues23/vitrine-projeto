import { useQuery } from "@tanstack/react-query";
import { listStartups } from "../../services/startup.service";
import { queryKeys } from "../../services/query-keys";

export function useStartups() {
  const query = useQuery({
    queryKey: queryKeys.startups,
    queryFn: listStartups,
  });

  return {
    startups: query.data ?? [],
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refresh: query.refetch,
  };
}
