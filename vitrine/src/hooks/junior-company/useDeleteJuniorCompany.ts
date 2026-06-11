import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJuniorCompany } from "../../services/juniorCompany.service";
import { queryKeys } from "../../services/query-keys";

export function useDeleteJuniorCompany() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteJuniorCompany(id),
    onSuccess: async (_, id) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.juniorCompany });
      queryClient.removeQueries({
        queryKey: queryKeys.juniorCompanyDetail(id),
      });
    },
  });

  const execute = async (id: string) => {
    try {
      await mutation.mutateAsync(id);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao excluir projeto de empresa júnior";
      return { success: false, error: errorMessage };
    }
  };

  return {
    execute,
    loading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error.message : null,
  };
}
