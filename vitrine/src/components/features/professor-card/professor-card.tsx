import { Card, CardFooter, CardHeader, CardTitle } from "../../ui/card/card";
import { Button } from "../../ui/button/button";

export interface ProfessorCardProps {
    name: string;
    imageUrl?: string;
}

export function ProfessorCard({ name, imageUrl }: ProfessorCardProps) {
    return (
        <Card variant="interactive" className="overflow-hidden flex flex-col h-full">
            {imageUrl && (
                <div className="w-full h-48 overflow-hidden">
                    <img 
                        src={imageUrl} 
                        alt={name} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                </div>
            )}
            <CardHeader>
                <div className="flex justify-between items-start gap-4">
                    <CardTitle className="line-clamp-2">{name}</CardTitle>
                </div>
            </CardHeader>
            <CardFooter>
                <Button variant="primary" className="w-full">Ver Professor</Button>
            </CardFooter>
        </Card>
    )
}
