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

export async function newJornada(uidLinguagem: string) {
  return api
    .post("jornadas", {
      uidLinguagem,
    })
    .then(() => toast.success("Jornada criada com sucesso!"))
    .catch((error) => {
      console.error("Erro ao adicionar uma nova jornada", error);
      toast.error("Erro ao adicionar uma nova jornada");
    });
}
