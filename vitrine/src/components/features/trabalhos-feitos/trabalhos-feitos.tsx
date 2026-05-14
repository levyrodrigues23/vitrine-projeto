import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card/card";
import { Badge } from "../../ui/badge/badge";
import { Button } from "../../ui/button/button";

export interface WorksDoneCardProps {
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  keywords?: string[];
}

export function WorksDone({
  title,
  description,
  category,
  imageUrl,
  keywords,
}: WorksDoneCardProps) {
  return (
    <Card
      variant="interactive"
      className="group overflow-hidden flex flex-col h-full rounded-2xl border border-gray-base/20 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative w-full h-44 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                className="ml-0 px-3 py-1 text-xs border-gray-base/30 text-gray-base-dark"
              >
                {keyword}
              </Badge>
            ))}
          </div>
        ) : null}
        <Button variant="primary" size="md" className="w-full">
          Ver Trabalho
        </Button>
      </CardFooter>
    </Card>
  );
}
