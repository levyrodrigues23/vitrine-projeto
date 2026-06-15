import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createEdital,
  uploadEditalImage,
  type CreateEditalPayload,
} from "../../services/edital.service";
import { queryKeys } from "../../services/query-keys";
import type { Edital } from "../../types/edital.types";

type CreateEditalResult =
  | { success: true; data: Edital }
  | { success: false; error: string };

export function useCreateEdital() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      payload,
      imageFile,
    }: {
      payload: CreateEditalPayload;
      imageFile?: File;
    }) => {
      let imageUrl: string | undefined;

      if (imageFile) {
        imageUrl = await uploadEditalImage(imageFile);
      }

      return createEdital({
        ...payload,
        ...(imageUrl && { imageUrl }),
      });
    },

    onSuccess: async (edital) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.notices,
      });

      queryClient.setQueryData(
        queryKeys.noticesDetail(edital.id),
        edital,
      );
    },
  });

  const execute = async (
    payload: CreateEditalPayload,
    imageFile?: File,
  ): Promise<CreateEditalResult> => {
    try {
      const data = await mutation.mutateAsync({ payload, imageFile });
      return { success: true, data };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao criar edital";

      return { success: false, error: errorMessage };
    }
  };

  return {
    execute,
    loading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error.message : null,
  };
}