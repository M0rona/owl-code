import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type ObjetivosStepProps = {
  objetivo: string;
  setObjetivo: (objetivo: string) => void;
  outroObjetivo: string;
  setOutroObjetivo: (outroObjetivo: string) => void;
};

export function ObjetivosStep({
  objetivo,
  setObjetivo,
  outroObjetivo,
  setOutroObjetivo,
}: ObjetivosStepProps) {
  return (
    <div key="step-1" className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Fale aonde você quer chegar com sua jornada de aprendizado
      </p>

      <Select value={objetivo} onValueChange={setObjetivo}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione um objetivo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="comecar-zero">Começar do zero</SelectItem>
          <SelectItem value="fundamentos">Avançar nos fundamentos</SelectItem>
          <SelectItem value="projetos">
            Desenvolver projetos práticos
          </SelectItem>
          <SelectItem value="carreira">
            Preparar para mercado de trabalho
          </SelectItem>
          <SelectItem value="especializacao">
            Especializar em uma área específica
          </SelectItem>
          <SelectItem value="frameworks">
            Aprender frameworks populares
          </SelectItem>
          <SelectItem value="desafios">
            Resolver desafios de programação
          </SelectItem>
          <SelectItem value="outro">Outro</SelectItem>
        </SelectContent>
      </Select>

      {objetivo === "outro" && (
        <Input
          placeholder="Digite seu objetivo"
          value={outroObjetivo}
          onChange={(e) => setOutroObjetivo(e.target.value)}
        />
      )}
    </div>
  );
}
