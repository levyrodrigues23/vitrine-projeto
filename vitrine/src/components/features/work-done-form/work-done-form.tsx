import { useEffect, useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";

import { Button, FormField, FormTextarea, Input } from "../../ui";
import type { ProjectFormValues } from "../../../schemas/project.schema";

type WorkDoneFormProps = {
  index: number;
  control: Control<ProjectFormValues>;
  register: UseFormRegister<ProjectFormValues>;
  errors: FieldErrors<ProjectFormValues>;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
};

export function WorkDoneForm({
  index,
  control,
  register,
  errors,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: WorkDoneFormProps) {
  const fieldErrors = errors.worksDone?.[index];

  const imageFileValue = useWatch({
    control,
    name: `worksDone.${index}.imageFile`,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!(imageFileValue instanceof File)) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(imageFileValue);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFileValue]);

  return (
    <div className="rounded-2xl border border-gray-base/20 bg-white p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-base-dark">
          Trabalho {index + 1}
        </span>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="quaternary"
            className="px-2 py-1"
            onClick={onMoveUp}
            disabled={isFirst}
            aria-label="Mover para cima"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="quaternary"
            className="px-2 py-1"
            onClick={onMoveDown}
            disabled={isLast}
            aria-label="Mover para baixo"
          >
            <ArrowDown className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="quaternary"
            className="px-2 py-1 text-red hover:bg-red/5"
            onClick={onRemove}
            aria-label="Remover trabalho"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          label="Título"
          required
          error={fieldErrors?.title?.message}
        >
          <Input
            {...register(`worksDone.${index}.title`)}
            placeholder="Ex.: Dashboard de monitoramento"
            className={
              fieldErrors?.title ? "border-red/60 focus-visible:ring-red/30" : ""
            }
          />
        </FormField>

        <FormField
          label="Categoria / Keyword"
          required
          error={fieldErrors?.category?.message}
        >
          <Input
            {...register(`worksDone.${index}.category`)}
            placeholder="Ex.: Visualização de dados"
            className={
              fieldErrors?.category
                ? "border-red/60 focus-visible:ring-red/30"
                : ""
            }
          />
        </FormField>
      </div>

      <FormField
        label="Descrição"
        required
        error={fieldErrors?.description?.message}
      >
        <FormTextarea
          {...register(`worksDone.${index}.description`)}
          placeholder="Descreva o que foi desenvolvido neste trabalho."
          className={
            fieldErrors?.description
              ? "border-red/60 focus-visible:ring-red/30"
              : ""
          }
        />
      </FormField>

      <Controller
        control={control}
        name={`worksDone.${index}.imageFile`}
        render={({ field }) => (
          <FormField
            label="Imagem"
            error={fieldErrors?.imageFile?.message as string | undefined}
          >
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="block w-full text-sm text-gray-base-dark file:mr-4 file:rounded-lg file:border-0 file:bg-blue/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-dark hover:file:bg-blue/20"
              onChange={(e) => field.onChange(e.target.files?.[0])}
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt={`Preview do trabalho ${index + 1}`}
                className="mt-3 h-40 w-full rounded-xl object-cover"
              />
            )}
          </FormField>
        )}
      />
    </div>
  );
}
