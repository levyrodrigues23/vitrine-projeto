import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateJuniorCompany,
  uploadJuniorCompanyImage,
} from "../../services/juniorCompany.service";
import { queryKeys } from "../../services/query-keys";
import type { ProjetoEmpresaJr } from "../../types/projetoEmpresaJr.types";

type UpdateJuniorCompanyPayload = Partial<ProjetoEmpresaJr>;

export function useUpdateJuniorCompany() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      id,
      payload,
      imageFile,
    }: {
      id: string;
      payload: UpdateJuniorCompanyPayload;
      imageFile?: File;
    }) => {
      let imageurl = payload.imageurl;

      if (imageFile) {
        imageurl = await uploadJuniorCompanyImage(imageFile);
      }

      return updateJuniorCompany(id, {
        ...payload,
        ...(imageurl && { imageurl }),
      });
    },
    onSuccess: async (company) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.juniorCompany });
      queryClient.setQueryData(
        queryKeys.juniorCompanyDetail(company.id),
        company,
      );
    },
  });

  const execute = async (
    id: string,
    payload: UpdateJuniorCompanyPayload,
    imageFile?: File,
  ) => {
    try {
      const data = await mutation.mutateAsync({ id, payload, imageFile });
      return { success: true, data };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao atualizar projeto de empresa júnior";
      return { success: false, error: errorMessage };
    }
  };

  return {
    execute,
    loading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error.message : null,
  };
}
