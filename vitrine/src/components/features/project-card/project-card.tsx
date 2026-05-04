import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card/card";
import { Badge } from "../../ui/badge/badge";
import { Button } from "../../ui/button/button";

export interface ProjectCardProps {
    title: string;
    description: string;
    category: string;
    imageUrl?: string;
}

export function ProjectCard({ title, description, category, imageUrl }: ProjectCardProps) {
    return (
        <Card variant="interactive" className="overflow-hidden flex flex-col h-full">
            {imageUrl && (
                <div className="w-full h-48 overflow-hidden">
                    <img 
                        src={imageUrl} 
                        alt={title} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                </div>
            )}
            <CardHeader>
                <div className="flex justify-between items-start gap-4">
                    <CardTitle className="line-clamp-2">{title}</CardTitle>
                    <Badge variant="secondary" className="shrink-0">{category}</Badge>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <CardDescription className="line-clamp-3">
                    {description}
                </CardDescription>
            </CardContent>
            <CardFooter>
                <Button variant="primary" className="w-full">Ver Projeto</Button>
            </CardFooter>
        </Card>
    )
}
