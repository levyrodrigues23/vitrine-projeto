export const Público = {
    Internal: "interno",
    External: "externo"
}


export type Público = [keyof typeof Público];


export interface Minicourse {
    id: string;
    title: string;
    description: string;
    organizers: string;
    publico: Público;
}