import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/auth";
import { PlusIcon } from "lucide-react";
import { getJornadasByUserId } from "./service/jornadas";
import { LinguageCard } from "./components/linguageCard";

export function DashboardPage() {
  const { currentUser } = useAuthContext();
  // const { data } = useQuery({
  //   queryKey: ["linguagens"],
  //   queryFn: async () => await getColletions("linguagens"),
  // });

  const jornadas = useQuery({
    queryKey: ["jornadas"],
    queryFn: async () => await getJornadasByUserId(),
  });

  return (
    <>
      <section className="mt-16 flex items-center justify-between">
        <div className="flex gap-5 items-center">
          <img
            src={
              currentUser?.photoURL ||
              `https://ui-avatars.com/api/?name=${currentUser?.displayName}&background=292524&color=fff`
            }
            alt="User avatar"
            className="size-16 rounded-full"
          />

          <h3>Bem vindo aos seus estudos, {currentUser?.displayName}</h3>
        </div>

        <Button size="lg">
          <PlusIcon />
          Adicionar jornada
        </Button>
      </section>

      <section className="flex flex-wrap gap-5 mt-10 justify-center">
        {jornadas.data?.map((jornada) => (
          <LinguageCard key={jornada.uid} data={jornada} />
        ))}
      </section>
    </>
  );
}
