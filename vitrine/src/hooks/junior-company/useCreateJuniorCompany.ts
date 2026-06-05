import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createJuniorCompany,
  uploadJuniorCompanyImage,
  type CreateJuniorCompanyPayload,
} from "../../services/juniorCompany.service";
import { queryKeys } from "../../services/query-keys";
import type { ProjetoEmpresaJr } from "../../types/projetoEmpresaJr.types";

type CreateJuniorCompanyResult =
  | { success: true; data: ProjetoEmpresaJr }
  | { success: false; error: string };

export function useCreateJuniorCompany() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      payload,
      imageFile,
    }: {
      payload: CreateJuniorCompanyPayload;
      imageFile?: File;
    }) => {
      let imageurl = payload.imageurl;

      if (imageFile) {
        imageurl = await uploadJuniorCompanyImage(imageFile);
      }

      return createJuniorCompany({ ...payload, imageurl });
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
    payload: CreateJuniorCompanyPayload,
    imageFile?: File,
  ): Promise<CreateJuniorCompanyResult> => {
    try {
      const data = await mutation.mutateAsync({ payload, imageFile });
      return { success: true, data };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao criar projeto de empresa júnior";
      return { success: false, error: errorMessage };
    }
  };

  return {
    execute,
    loading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error.message : null,
  };
}
