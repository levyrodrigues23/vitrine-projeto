import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteArtigo } from "../../services/papers.service";
import { queryKeys } from "../../services/query-keys";

export function useDeleteArtigo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteArtigo(id),
    onSuccess: async (_, id) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.papers });
      queryClient.removeQueries({ queryKey: queryKeys.paperDetail(id) });
    },
  });

  const execute = async (id: string) => {
    try {
      await mutation.mutateAsync(id);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao excluir artigo";
      return { success: false, error: errorMessage };
    }
  };

  return {
    execute,
    loading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error.message : null,
  };
}
