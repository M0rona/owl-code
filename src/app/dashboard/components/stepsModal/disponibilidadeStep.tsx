import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DisponibilidadeStepProps = {
  disponibilidade: string;
  setDisponibilidade: (disponibilidade: string) => void;
};

export function DisponibilidadeStep({
  disponibilidade,
  setDisponibilidade,
}: DisponibilidadeStepProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Qual sua disponibilidade semanal para estudos?
      </p>

      <Select value={disponibilidade} onValueChange={setDisponibilidade}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione sua disponibilidade" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="menos-3h">{"< 3 h"}</SelectItem>
          <SelectItem value="3-5h">3–5 h</SelectItem>
          <SelectItem value="5-10h">5–10 h</SelectItem>
          <SelectItem value="mais-10h">{"> 10 h"}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
