import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PlusIcon, Rocket } from "lucide-react";
import { getLinguagens } from "./service/linguagens";
// import { newJornada } from "../service/jornadas";
import { useState } from "react";
import { LanguagesStep } from "./components/stepsModal/languagesStep";
import { ObjetivosStep } from "./components/stepsModal/objetivosStep";
import { NivelStep } from "./components/stepsModal/nivelStep";
import { ExperienciaStep } from "./components/stepsModal/experienciaStep";
import { LogicaStep } from "./components/stepsModal/logicaStep";
import { DificuldadeStep } from "./components/stepsModal/dificuldadeStep";
import { EstiloAprendizadoStep } from "./components/stepsModal/estiloAprendizadoStep";
import { DisponibilidadeStep } from "./components/stepsModal/disponibilidadeStep";
import { MetaProjetoStep } from "./components/stepsModal/metaProjetoStep";

export function AddJourneyModal() {
  const [formData, setFormData] = useState({
    languageId: null as string | null,
    objetivo: "",
    outroObjetivo: "",
    nivel: "",
    experiencia: "",
    outroExperiencia: "",
    logica: "",
    outroLogica: "",
    dificuldade: "",
    estiloAprendizado: "",
    outroEstiloAprendizado: "",
    disponibilidade: "",
    metaProjeto: "",
  });

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

  const handleStartJourney = () => {
    if (!formData.languageId) return;
    setOpen(false);
    mutation.mutate(formData.languageId);
  };

  const stepContents = [
    <LanguagesStep
      key="step-0"
      languageId={formData.languageId}
      setLanguageId={(languageId) =>
        setFormData((prev) => ({ ...prev, languageId }))
      }
      data={data}
    />,
    <ObjetivosStep
      key="step-1"
      objetivo={formData.objetivo}
      setObjetivo={(objetivo) => setFormData((prev) => ({ ...prev, objetivo }))}
      outroObjetivo={formData.outroObjetivo}
      setOutroObjetivo={(outroObjetivo) =>
        setFormData((prev) => ({ ...prev, outroObjetivo }))
      }
    />,
    <NivelStep
      key="step-2"
      nivel={formData.nivel}
      setNivel={(nivel) => setFormData((prev) => ({ ...prev, nivel }))}
    />,
    <ExperienciaStep
      key="step-3"
      experiencia={formData.experiencia}
      setExperiencia={(experiencia) =>
        setFormData((prev) => ({ ...prev, experiencia }))
      }
      outroExperiencia={formData.outroExperiencia}
      setOutroExperiencia={(outroExperiencia) =>
        setFormData((prev) => ({ ...prev, outroExperiencia }))
      }
    />,
    <LogicaStep
      key="step-4"
      logica={formData.logica}
      setLogica={(logica) => setFormData((prev) => ({ ...prev, logica }))}
      outroLogica={formData.outroLogica}
      setOutroLogica={(outroLogica) =>
        setFormData((prev) => ({ ...prev, outroLogica }))
      }
    />,
    <DificuldadeStep
      key="step-5"
      dificuldade={formData.dificuldade}
      setDificuldade={(dificuldade) =>
        setFormData((prev) => ({ ...prev, dificuldade }))
      }
    />,
    <EstiloAprendizadoStep
      key="step-6"
      estiloAprendizado={formData.estiloAprendizado}
      setEstiloAprendizado={(estiloAprendizado) =>
        setFormData((prev) => ({ ...prev, estiloAprendizado }))
      }
      outroEstiloAprendizado={formData.outroEstiloAprendizado}
      setOutroEstiloAprendizado={(outroEstiloAprendizado) =>
        setFormData((prev) => ({ ...prev, outroEstiloAprendizado }))
      }
    />,
    <DisponibilidadeStep
      key="step-7"
      disponibilidade={formData.disponibilidade}
      setDisponibilidade={(disponibilidade) =>
        setFormData((prev) => ({ ...prev, disponibilidade }))
      }
    />,
    <MetaProjetoStep
      key="step-8"
      metaProjeto={formData.metaProjeto}
      setMetaProjeto={(metaProjeto) =>
        setFormData((prev) => ({ ...prev, metaProjeto }))
      }
    />,
  ];

  const stepValidations = [
    !!formData.languageId,

    !!formData.objetivo &&
      (formData.objetivo !== "outro" || !!formData.outroObjetivo),
    !!formData.nivel,

    !!formData.experiencia &&
      (formData.experiencia !== "outro" || !!formData.outroExperiencia),

    !!formData.logica &&
      (formData.logica !== "outro" || !!formData.outroLogica),
    !!formData.dificuldade,

    !!formData.estiloAprendizado &&
      (formData.estiloAprendizado !== "outro" ||
        !!formData.outroEstiloAprendizado),
    !!formData.disponibilidade,
    !formData.metaProjeto,
  ];

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) {
          setCurrentStep(0);
          setFormData({
            languageId: null,
            objetivo: "",
            outroObjetivo: "",
            nivel: "",
            experiencia: "",
            outroExperiencia: "",
            logica: "",
            outroLogica: "",
            dificuldade: "",
            estiloAprendizado: "",
            outroEstiloAprendizado: "",
            disponibilidade: "",
            metaProjeto: "",
          });
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="lg">
          <PlusIcon />
          Adicionar jornada
        </Button>
      </DialogTrigger>

      <DialogContent aria-describedby="dialog-select-language">
        <DialogHeader>
          <DialogTitle>Iniciar jornada</DialogTitle>
        </DialogHeader>

        <div className="mt-8">{stepContents[currentStep]}</div>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={currentStep === 0}
          >
            Voltar
          </Button>

          {currentStep === stepContents.length - 1 ? (
            <Button
              size="lg"
              onClick={handleStartJourney}
              disabled={stepValidations[currentStep] ?? mutation.isPending}
            >
              {mutation.isPending ? "Iniciando..." : "Começar jornada"}
              <Rocket />
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!stepValidations[currentStep]}
            >
              Próximo
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
