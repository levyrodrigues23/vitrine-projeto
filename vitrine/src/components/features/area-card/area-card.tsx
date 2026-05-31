import type { LucideIcon } from "lucide-react";


export interface AreaCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  isSelected: boolean;
  onClick: () => void;
}

export function AreaCard({
  name,
  description,
  icon: Icon,
  isSelected,
  onClick,
}: AreaCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300
        ${
          isSelected
            ? "border-2 border-blue-dark bg-blue-dark/10 shadow-md"
            : "border border-gray-base/20 bg-white shadow-sm hover:shadow-md hover:-translate-y-1"
        }
      `}
    >
      {/* Ícone */}
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all ${
          isSelected ? "bg-blue-dark text-white" : "bg-blue/10 text-blue-dark"
        }`}
      >
        <Icon className="h-6 w-6" />
      </div>

      {/* Conteúdo */}
      <h3
        className={`mb-2 font-semibold transition-colors ${
          isSelected ? "text-blue-dark" : "text-gray-900"
        }`}
      >
        {name}
      </h3>
      <p className="text-sm text-gray-base line-clamp-2">{description}</p>
    </button>
  );
}
