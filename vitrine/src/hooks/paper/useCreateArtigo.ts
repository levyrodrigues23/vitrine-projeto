import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createArtigo } from "../../services/papers.service";
import { queryKeys } from "../../services/query-keys";
import type { CreateArtigoPayload, Artigo } from "../../types/papers.types";

type CreateArtigoResult =
  | { success: true; data: Artigo }
  | { success: false; error: string };

export function useCreateArtigo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: CreateArtigoPayload) =>
      createArtigo(payload),

    onSuccess: async (artigo) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.papers,
      });

      queryClient.setQueryData(
        queryKeys.paperDetail(artigo.id),
        artigo
      );
    },
  });

  const execute = async (
    payload: CreateArtigoPayload
  ): Promise<CreateArtigoResult> => {
    try {
      const data = await mutation.mutateAsync(payload);
      return { success: true, data };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao criar artigo";

      return { success: false, error: errorMessage };
    }
  };

  return {
    execute,
    loading: mutation.isPending,
    error: mutation.error instanceof Error
      ? mutation.error.message
      : null,
  };
}