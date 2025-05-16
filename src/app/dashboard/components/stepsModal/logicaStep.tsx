import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type LogicaStepProps = {
  logica: string;
  setLogica: (logica: string) => void;
  outroLogica: string;
  setOutroLogica: (outroLogica: string) => void;
};

export function LogicaStep({
  logica,
  setLogica,
  outroLogica,
  setOutroLogica,
}: LogicaStepProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Qual seu conhecimento em lógica de programação?
      </p>

      <Select value={logica} onValueChange={setLogica}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione seu nível" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="nenhum">Nenhum</SelectItem>
          <SelectItem value="variaveis-condicionais">
            Variáveis e condicionais
          </SelectItem>
          <SelectItem value="loops-colecoes">Loops e coleções</SelectItem>
          <SelectItem value="algoritmos-simples">Algoritmos simples</SelectItem>
          <SelectItem value="outro">Outro</SelectItem>
        </SelectContent>
      </Select>

      {logica === "outro" && (
        <Input
          placeholder="Descreva seu conhecimento"
          value={outroLogica}
          onChange={(e) => setOutroLogica(e.target.value)}
        />
      )}
    </div>
  );
}
