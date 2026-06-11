export const Público = {
    Internal: "interno",
    External: "externo"
} as const;


export type Público = typeof Público[keyof typeof Público];


export interface Minicourse {
    id: string;
    title: string;
    description: string;
    organizers: string;
    publico: Público;
}