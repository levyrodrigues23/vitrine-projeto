import { Link } from "react-router";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card/card";
import { Badge } from "../../ui/badge/badge";

export interface ProjectCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  area?: string;
  to?: string;
  keywords?: string[];
}


export function ProjectCard({
  icon,
  title,
  description,
  category,
  imageUrl,
  area,
  to,
}: ProjectCardProps) {
  const card = (
    <Card
      variant="interactive"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-base/20 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1"
    >
      {imageUrl ? (
        <>
          <div className="relative h-48 w-full overflow-hidden">
            <img
              src={imageUrl}
              alt={`Imagem de destaque do projeto ${title}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.1), transparent)",
              }}
            />
            <Badge
              variant="default"
              className="absolute left-4 top-4 px-3 py-1 text-xs"
            >
              {category}
            </Badge>
          </div>

          <CardHeader className="space-y-2">
            <CardTitle className="line-clamp-2 text-lg leading-snug">
              {title}
            </CardTitle>
            <CardDescription className="line-clamp-2 text-sm text-gray-base">
              {description}
            </CardDescription>
          </CardHeader>
        </>
      ) : (
        <CardHeader className="space-y-3 p-5">
          <div className="flex items-start justify-between">
            {icon && (
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
                {icon}
              </div>
            )}
            <Badge variant="default" className="ml-auto px-3 py-1 text-xs">
              {category}
            </Badge>
          </div>

          <CardTitle className="line-clamp-2 text-xl font-bold leading-snug">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-3 text-sm text-gray-base">
            {description}
          </CardDescription>
        </CardHeader>
      )}

      {area && (
        <CardFooter className="mt-auto flex flex-col items-start gap-0 px-5 pb-5 pt-0">
          <div className="mb-3 h-px w-full bg-gray-100" />
          <span className="text-sm text-gray-base">{area}</span>
        </CardFooter>
      )}
    </Card>
  );

  if (to) {
    return (
      <Link
        to={to}
        className="block h-full no-underline"
        aria-label={`Abrir detalhes do projeto ${title}`}
      >
        {card}
      </Link>
    );
  }

  return card;
}
