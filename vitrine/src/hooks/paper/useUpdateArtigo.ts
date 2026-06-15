import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateArtigo } from "../../services/papers.service";
import { queryKeys } from "../../services/query-keys";
import type { Artigo, UpdateArtigoPayload } from "../../types/papers.types";

export function useUpdateArtigo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Artigo> }) =>
      updateArtigo(id, payload),
    onSuccess: async (artigo) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.papers });
      queryClient.setQueryData(queryKeys.paperDetail(artigo.id), artigo);
    },
  });

  const execute = async (id: string, payload: UpdateArtigoPayload) => {
    try {
      const data = await mutation.mutateAsync({ id, payload });
      return { success: true, data };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao atualizar artigo";
      return { success: false, error: errorMessage };
    }
  };

  return {
    execute,
    loading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error.message : null,
  };
}
