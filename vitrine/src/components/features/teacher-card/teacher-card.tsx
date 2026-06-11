import { FileText } from "lucide-react";
import type { Grau } from "../../../types/teachers.types";

export interface TeacherCardProps {
  name: string;
  grau: Grau;
  imageUrl?: string;
  lattes: string;
}

const grauLabel: Record<Grau, string> = {
  graduacao: "Graduação",
  posGraduacao: "Pós-graduação",
  mestrado: "Mestrado",
  doutorado: "Doutorado",
};

export function TeacherCard({
  name,
  grau,
  imageUrl,
  lattes,
}: TeacherCardProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative h-[265px] w-[265px] overflow-hidden rounded-2xl bg-gray-200">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">
            Sem imagem
          </div>
        )}

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, transparent 55%, #003e6f 85%, #003e6f 100%)",
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-white">
          <h3 className="text-center text-xl font-bold">{name}</h3>

          <p className="text-center text-sm font-medium opacity-90">
            {grauLabel[grau]}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <a
          href={lattes}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-600 transition hover:text-blue-dark"
          title="Currículo Lattes"
        >
          <FileText className="h-5 w-5" />
          <span className="text-sm">Lattes</span>
        </a>
      </div>
    </div>
  );
}