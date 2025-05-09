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

interface Subtopico {
  title: string;
  concluido: boolean;
  conteudo: Conteudo[];
}

interface Conteudo {
  topico: string;
  detalhes: string;
  anexos: Anexo[];
}

interface Anexo {
  tipo: string;
  descricao: string;
  url: string;
}
