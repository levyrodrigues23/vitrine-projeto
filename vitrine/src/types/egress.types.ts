


export const Curso = {
    AnaliseeDesenvolvimentodeSistemas: "Analise e Desenvolvimento de Sistemas",
    SegurançadaInformaçãoo: "Segurança da informação",
    CienciadeDados: "Ciencia de Dados",
    Teatro: "Teatro",
} as const;


export type Curso = typeof Curso[keyof typeof Curso]


export interface Egresso {
    id: string;
    nome: string;
    descricao: string;
    ano_graduacao: string;
    contato: string;
    curso: Curso;
}

