export const Status = {
    Andamento: "andamento",
    Finalizado: "finalizado",
    Aserpublicado: "a ser publicado"
} as const

export type Status = typeof Status [keyof typeof Status];
// decidaaa, se vai embora ou ficar comigooooo

export interface Edital {
    id: string;
    title: string;
    description: string;
    imageurl?: string; 
    link: string;
    status: Status
}

