import { Link } from "react-router";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card/card";
import { Badge } from "../../ui/badge/badge";
import { Button, buttonVariants } from "../../ui/button/button";

export interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  keywords?: string[];
  to?: string;
}

export function ProjectCard({
  title,
  description,
  category,
  imageUrl,
  keywords,
  to,
}: ProjectCardProps) {
  const card = (
    <Card
      variant="interactive"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-base/20 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-48 w-full overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-blue to-green-base" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <Badge
          variant="default"
          className="absolute left-4 top-4 ml-0 px-3 py-1 text-xs"
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
      <CardFooter className="flex flex-col items-start gap-4">
        {keywords && keywords.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
              <Badge
                key={index}
                variant="outline"
                className="ml-0 border-gray-base/30 px-3 py-1 text-xs text-gray-base-dark"
              >
                {keyword}
              </Badge>
            ))}
          </div>
        ) : null}
        {to ? (
          <span
            className={buttonVariants({
              variant: "primary",
              size: "md",
              className: "pointer-events-none w-full justify-center",
            })}
          >
            Ver projeto
          </span>
        ) : (
          <Button variant="primary" size="md" className="w-full">
            Ver Projeto
          </Button>
        )}
      </CardFooter>
    </Card>
  );

  if (to) {
    return (
      <Link
        to={to}
        className="block h-full rounded-2xl text-inherit no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-dark"
      >
        {card}
      </Link>
    );
  }

  return card;
}
