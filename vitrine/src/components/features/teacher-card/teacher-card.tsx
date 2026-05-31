import { FileText } from "lucide-react";
import githubIcon from "../../../assets/icons/github.svg";

export interface TeacherCardProps {
  name: string;
  role: string;
  imageUrl: string;
  githubUrl?: string;
  lattesUrl?: string;
}

export function TeacherCard({
  name,
  role,
  imageUrl,
  githubUrl,
  lattesUrl,
}: TeacherCardProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative h-[265px] w-[265px] overflow-hidden rounded-2xl bg-gray-200">
        <img src={imageUrl} alt={name} className="absolute inset-0 h-full w-full object-cover"/>

        <div
          className="absolute inset-0"
          style={{background:"linear-gradient(to bottom, transparent 0%, transparent 55%, #003e6f 85%, #003e6f 100%)",}}/>

        <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-white">
          <h3 className="text-center text-xl font-bold">{name}</h3>
          <p className="text-center text-sm font-medium opacity-90">{role}</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 transition hover:text-blue-dark"
            title="GitHub"
          >
            <img src={githubIcon} alt="GitHub" className="h-5 w-5" />
          </a>
        )}
        {lattesUrl && (
          <a
            href={lattesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 transition hover:text-blue-dark"
            title="Lattes"
          >
            <FileText className="h-5 w-5" />
          </a>
        )}
      </div>
    </div>
  );
}
