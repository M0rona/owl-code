import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type EstiloAprendizadoStepProps = {
  estiloAprendizado: string;
  setEstiloAprendizado: (estiloAprendizado: string) => void;
  outroEstiloAprendizado: string;
  setOutroEstiloAprendizado: (outroEstiloAprendizado: string) => void;
};

export function EstiloAprendizadoStep({
  estiloAprendizado,
  setEstiloAprendizado,
  outroEstiloAprendizado,
  setOutroEstiloAprendizado,
}: EstiloAprendizadoStepProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Qual seu estilo de aprendizagem preferido?
      </p>

      <Select value={estiloAprendizado} onValueChange={setEstiloAprendizado}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione seu estilo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="video-aulas">Vídeo-aulas passo a passo</SelectItem>
          <SelectItem value="leituras">Leituras e tutoriais</SelectItem>
          <SelectItem value="projetos">Projetos práticos</SelectItem>
          <SelectItem value="misturado">Misturado</SelectItem>
          <SelectItem value="outro">Outro</SelectItem>
        </SelectContent>
      </Select>

      {estiloAprendizado === "outro" && (
        <Input
          placeholder="Descreva seu estilo de aprendizado"
          value={outroEstiloAprendizado}
          onChange={(e) => setOutroEstiloAprendizado(e.target.value)}
        />
      )}
    </div>
  );
}
