import { api } from "@/config/axios";
import { Linguagem } from "./types/linguagens";
import { toast } from "sonner";

export async function getLinguagens() {
  return api
    .get<Linguagem[]>("linguagens")
    .then((response) => response.data)
    .catch((error) => {
      console.log("Erro em buscar linguagens", error);
      toast.error("Erro em buscar linguagens");
    });
}
