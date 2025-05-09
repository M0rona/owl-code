import { api } from "@/config/axios";
import { toast } from "sonner";
import type { ConteudoJornadaResponse } from "./types/conteudoJornadaResponse";

export async function getConteudoJornadasById(idJornada: string) {
  return await api
    .get<ConteudoJornadaResponse>(`conteudoJornada/${idJornada}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao buscar o conteudo das jornadas", err);
      toast.error("Erro ao buscar a jornada");
    });
}
