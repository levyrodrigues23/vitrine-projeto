type Artigo = {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: "periodico" | "capitulo" | "preprint";
  doi?: string;
  pdfUrl?: string;
  keywords?: string[];
  projectId?: string;
};

type Congresso = {
  id: string;
  event: string;
  location: string;
  date: string;
  paperTitle: string;
  status: "aceito" | "apresentado";
  link?: string;
  keywords?: string[];
  projectId?: string;
};