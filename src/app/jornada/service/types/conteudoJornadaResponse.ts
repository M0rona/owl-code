import { JornadaResponse } from "@/app/dashboard/service/types/jornadaResponse";

export interface ConteudoJornadaResponse {
  uid: string;
  jornada: JornadaResponse;
  roadmap: Roadmap[];
}

interface Roadmap {
  uid: string;
  title: string;
  concluido: boolean;
  subtopicos: Subtopico[];
}

export interface Subtopico {
  title: string;
  concluido: boolean;
  conteudo: Conteudo;
}

interface Conteudo {
  topico: string;
  detalhes: string;
  anexos: Anexo[];
  exemplos: Exemplos[];
}

interface Anexo {
  tipo: "video" | "documentacao";
  url: string;
}

interface Exemplos {
  titulo: string;
  codigo: string;
}
