import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PlusIcon, Rocket } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getLinguagens } from "../service/linguagens";
// import { newJornada } from "../service/jornadas";
import { useState } from "react";

export function AddJourney() {
  const [languageId, setLanguageId] = useState<string | null>();
  const [open, setOpen] = useState(false);
  const { data } = useQuery({
    queryKey: ["linguagens"],
    queryFn: getLinguagens,
  });

  const mutation = useMutation({
    mutationKey: ["jornadas"],
    mutationFn: async (languageId: string) => {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      return languageId;
    },
  });

  // TODO: Verificar como fazer o loading do conteudo
  const handleStartJourney = () => {
    if (!languageId) return;
    setOpen(false);
    mutation.mutate(languageId);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg">
          <PlusIcon />
          Adicionar jornada
        </Button>
      </DialogTrigger>

      <DialogContent aria-describedby="dialog-select-language">
        <DialogHeader>
          <DialogTitle>Iniciar jornada</DialogTitle>
          <DialogDescription>
            Selecione uma linguagem para começar sua jornada de aprendizado
          </DialogDescription>
        </DialogHeader>

        <Select onValueChange={setLanguageId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione uma linguagem" />
          </SelectTrigger>
          <SelectContent>
            {data?.map((linguagem) => (
              <SelectItem key={linguagem.uid} value={linguagem.uid}>
                {linguagem.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          size="lg"
          onClick={handleStartJourney}
          disabled={!languageId || mutation.isPending}
        >
          {mutation.isPending ? "Iniciando..." : "Começar uma nova jornada"}{" "}
          <Rocket />
        </Button>
      </DialogContent>
    </Dialog>
  );
}
