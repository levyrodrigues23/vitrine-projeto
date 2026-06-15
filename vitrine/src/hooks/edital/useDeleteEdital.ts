import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEdital } from "../../services/edital.service";
import { queryKeys } from "../../services/query-keys";

export function useDeleteEdital() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteEdital(id),

    onSuccess: async (_, id) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.notices,
      });

      queryClient.removeQueries({
        queryKey: queryKeys.noticesDetail(id),
      });
    },
  });

  const execute = async (id: string) => {
    try {
      await mutation.mutateAsync(id);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao excluir edital";

      return { success: false, error: errorMessage };
    }
  };

  return {
    execute,
    loading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error.message : null,
  };
}