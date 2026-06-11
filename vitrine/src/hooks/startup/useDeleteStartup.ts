import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStartup } from "../../services/startup.service";
import { queryKeys } from "../../services/query-keys";

export function useDeleteStartup() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteStartup(id),
    onSuccess: async (_, id) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.startups });
      queryClient.removeQueries({ queryKey: queryKeys.startupDetail(id) });
    },
  });

  const execute = async (id: string) => {
    try {
      await mutation.mutateAsync(id);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao excluir startup";
      return { success: false, error: errorMessage };
    }
  };

  return {
    execute,
    loading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error.message : null,
  };
}
