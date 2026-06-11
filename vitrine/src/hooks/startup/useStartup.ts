import { useQuery } from "@tanstack/react-query";
import { getStartupById } from "../../services/startup.service";
import { queryKeys } from "../../services/query-keys";

export function useStartup(id?: string) {
  const queryKey = id
    ? queryKeys.startupDetail(id)
    : (["startup", "detail", "missing"] as const);

  const query = useQuery({
    queryKey,
    queryFn: () => {
      if (!id) {
        throw new Error("Startup id is required.");
      }

      return getStartupById(id);
    },
    enabled: Boolean(id),
  });

  return {
    startup: query.data ?? null,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refresh: query.refetch,
  };
}
