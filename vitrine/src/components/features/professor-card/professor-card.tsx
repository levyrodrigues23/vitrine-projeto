import { Card, CardFooter, CardTitle } from "../../ui/card/card";
import { Button } from "../../ui/button/button";

export interface ProfessorCardProps {
  name: string;
  imageUrl?: string;
}

export function ProfessorCard({ name, imageUrl }: ProfessorCardProps) {
  return (
    <Card
      variant="interactive"
      className="group overflow-hidden flex flex-col h-full rounded-2xl border border-gray-base/20 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative p-6">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,#b5e8c3,transparent_60%)]"
          aria-hidden="true"
        />
        <div className="relative flex flex-col items-center text-center gap-4">
          <div className="h-28 w-28 rounded-full overflow-hidden ring-4 ring-white shadow-md">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-blue to-green-base" />
            )}
          </div>
          <CardTitle className="line-clamp-2 text-lg leading-snug">
            {name}
          </CardTitle>
        </div>
      </div>
      <CardFooter className="pt-0 px-6 pb-6">
        <Button variant="secondary" size="md" className="w-full">
          Ver Professor
        </Button>
      </CardFooter>
    </Card>
  );
}
