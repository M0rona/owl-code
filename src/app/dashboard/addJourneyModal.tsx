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
import type { Option } from "@/components/ui/multipleSelector";

export function AddJourneyModal() {
  const [formData, setFormData] = useState({
    languageId: null as string | null,
    objetivos: [] as Option[],
    nivel: "",
    experiencia: "",
    outroExperiencia: "",
    logicas: [] as Option[],
    dificuldade: "",
    estilosAprendizado: [] as Option[],
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
      objetivos={formData.objetivos}
      setObjetivos={(objetivos) =>
        setFormData((prev) => ({ ...prev, objetivos }))
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
      logicas={formData.logicas}
      setLogicas={(logicas) => setFormData((prev) => ({ ...prev, logicas }))}
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
      estilosAprendizado={formData.estilosAprendizado}
      setEstilosAprendizado={(estilosAprendizado) =>
        setFormData((prev) => ({ ...prev, estilosAprendizado }))
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

    !!formData.objetivos.length,
    !!formData.nivel,

    !!formData.experiencia &&
      (formData.experiencia !== "outro" || !!formData.outroExperiencia),

    !!formData.logicas.length,
    !!formData.dificuldade,

    !!formData.estilosAprendizado.length,
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
            objetivos: [],
            nivel: "",
            experiencia: "",
            outroExperiencia: "",
            logicas: [],
            dificuldade: "",
            estilosAprendizado: [],
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
          <DialogDescription />
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
