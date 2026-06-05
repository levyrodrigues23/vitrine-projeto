export const Status = {
    Andamento: "andamento",
    Finalizado: "finalizado",
    Aserpublicado: "a ser publicado"
} as const

export type Status = typeof Status [keyof typeof Status];

export interface Congress {
    id: string;
    title: string;
    description: string;
    data: Date;
    url: string;
    local: string;
    tipo: Status;
}