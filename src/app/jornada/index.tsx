/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getConteudoJornadasById } from "./service/conteudoJornadas";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, SendHorizonal } from "lucide-react";
import { useEffect, useState } from "react";
import { LoadingJornada } from "./components/loadingJornada";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChatJornada } from "./components/chat";

export function JornadaPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { idJornada } = useParams();
  const { data } = useQuery({
    queryKey: ["conteudoJornada", idJornada],
    queryFn: async () => {
      if (!idJornada) {
        throw new Error("Id da jornada não encontrado");
      }
      return await getConteudoJornadasById(idJornada);
    },
  });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIsLoading((prevState) => !prevState);
  //   }, 2000);

  //   return () => clearInterval(interval);
  // }, []);

  if (!idJornada) {
    toast.error("Id da jornada não encontrado");
    return null;
  }

  return isLoading ? (
    <LoadingJornada />
  ) : (
    <>
      <section className="flex justify-between items-center gap-5">
        <article className="flex gap-5 w-[28rem]">
          <img
            src={data?.jornada.linguagem.url}
            className="size-18 object-contain"
          />

          <div className="flex flex-col justify-center gap-4 w-full">
            <h2 className="text-lg ">{data?.jornada.linguagem.nome}</h2>

            <div className="w-full h-2 bg-card rounded-sm relative">
              <div
                className="h-full rounded-sm"
                style={{
                  backgroundColor: data?.jornada.linguagem.cor,
                  width: `${data?.jornada.progresso_percent}%`,
                }}
              />

              <span className="absolute right-0 -top-7">
                {data?.jornada.progresso_percent}%
              </span>
            </div>

            <span className="absolute right-0 -top-7">
              {data?.jornada.progresso_percent}%
            </span>
          </div>
        </article>

        <Link to="/dashboard">
          <Button size="lg" variant="secondary">
            <ArrowLeft />
            Voltar
          </Button>
        </Link>
      </section>

      <div className="flex-1 flex gap-10">
        <section className="size-full"></section>
        <ChatJornada />
      </div>
    </>
  );
}
