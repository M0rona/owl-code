import { api } from "@/config/axios";
import { JornadaResponse } from "./types/jornadaResponse";
import { toast } from "sonner";

export async function getJornadasByUserId() {
  return api
    .get<JornadaResponse[]>("jornadas")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Erro em buscar jornadas", error);
      toast.error("Erro em buscar jornadas");
    });
}
