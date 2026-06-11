import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateStartup,
  uploadStartupImage,
} from "../../services/startup.service";
import { queryKeys } from "../../services/query-keys";
import type { Startup } from "../../types/startup.types";

type UpdateStartupPayload = Partial<Startup>;

export function useUpdateStartup() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      id,
      payload,
      imageFile,
    }: {
      id: string;
      payload: UpdateStartupPayload;
      imageFile?: File;
    }) => {
      let imageUrl = (payload as { imageUrl?: string }).imageUrl;

      if (imageFile) {
        imageUrl = await uploadStartupImage(imageFile);
      }

      return updateStartup(id, {
        ...payload,
        ...(imageUrl && { imageUrl }),
      });
    },
    onSuccess: async (startup) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.startups });
      queryClient.setQueryData(queryKeys.startupDetail(startup.id), startup);
    },
  });

  const execute = async (
    id: string,
    payload: UpdateStartupPayload,
    imageFile?: File,
  ) => {
    try {
      const data = await mutation.mutateAsync({ id, payload, imageFile });
      return { success: true, data };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao atualizar startup";
      return { success: false, error: errorMessage };
    }
  };

  return {
    execute,
    loading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error.message : null,
  };
}
