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
  const [currentStep, setCurrentStep] = useState(0);
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
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
        );
      case 1:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Aqui você poderá configurar suas preferências de aprendizado,
              como:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
              <li>Nível de dificuldade</li>
              <li>Foco em áreas específicas</li>
              <li>Metas de aprendizado</li>
            </ul>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Você está prestes a começar sua jornada de aprendizado em:
            </p>
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-medium">
                {data?.find((lang) => lang.uid === languageId)?.nome}
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
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
            Siga os passos para começar sua jornada de aprendizado
          </DialogDescription>
        </DialogHeader>

        <div className="mt-8">{renderStepContent()}</div>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={currentStep === 0}
          >
            Voltar
          </Button>

          {currentStep === 2 ? (
            <Button
              size="lg"
              onClick={handleStartJourney}
              disabled={!languageId || mutation.isPending}
            >
              {mutation.isPending ? "Iniciando..." : "Começar jornada"}
              <Rocket />
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={currentStep === 0 && !languageId}
            >
              Próximo
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
