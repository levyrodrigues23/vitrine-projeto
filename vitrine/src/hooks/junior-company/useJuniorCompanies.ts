import { useQuery } from "@tanstack/react-query";
import { listJuniorCompanies } from "../../services/juniorCompany.service";
import { queryKeys } from "../../services/query-keys";

export function useJuniorCompanies() {
  const query = useQuery({
    queryKey: queryKeys.juniorCompany,
    queryFn: listJuniorCompanies,
  });

  return {
    companies: query.data ?? [],
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refresh: query.refetch,
  };
}
