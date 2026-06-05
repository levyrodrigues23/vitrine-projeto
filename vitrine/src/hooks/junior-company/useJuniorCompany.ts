import { useQuery } from "@tanstack/react-query";
import { getJuniorCompanyById } from "../../services/juniorCompany.service";
import { queryKeys } from "../../services/query-keys";

export function useJuniorCompany(id?: string) {
  const queryKey = id
    ? queryKeys.juniorCompanyDetail(id)
    : (["junior-company", "detail", "missing"] as const);

  const query = useQuery({
    queryKey,
    queryFn: () => {
      if (!id) throw new Error("Junior company id is required.");
      return getJuniorCompanyById(id);
    },
    enabled: Boolean(id),
  });

  return {
    company: query.data ?? null,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refresh: query.refetch,
  };
}
