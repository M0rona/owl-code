import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Linguagem } from "../../service/types/linguagens";

type LanguagesStepsProps = {
  languageId: string | null;
  setLanguageId: (languageId: string | null) => void;
  data?: Linguagem[] | void;
};

export function LanguagesStep({
  languageId,
  setLanguageId,
  data,
}: LanguagesStepsProps) {
  return (
    <div key="step-0" className="flex flex-col gap-4">
      <p>Siga os passos para começar sua jornada de aprendizado</p>
      <Select value={languageId ?? ""} onValueChange={setLanguageId}>
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
    </div>
  );
}
