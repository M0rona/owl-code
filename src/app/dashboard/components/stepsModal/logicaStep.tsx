import MultipleSelector, { Option } from "@/components/ui/multipleSelector";

type LogicaStepProps = {
  logicas: Option[];
  setLogicas: (logicas: Option[]) => void;
};

export function LogicaStep({ logicas, setLogicas }: LogicaStepProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Qual seu conhecimento em lógica de programação?
      </p>

      <MultipleSelector
        placeholder="Selecione ou adicione seus conhecimentos"
        hidePlaceholderWhenSelected
        creatable
        value={logicas}
        onChange={setLogicas}
        defaultOptions={[
          {
            value: "nenhum",
            label: "Nenhum",
          },
          {
            value: "variaveis-condicionais",
            label: "Variáveis e condicionais",
          },
          {
            value: "loops-colecoes",
            label: "Loops e coleções",
          },
          {
            value: "algoritmos-simples",
            label: "Algoritmos simples",
          },
          {
            value: "funcoes-metodos",
            label: "Funções e métodos",
          },
          {
            value: "estruturas-dados",
            label: "Estruturas de dados",
          },
          {
            value: "algoritmos-avancados",
            label: "Algoritmos avançados",
          },
          {
            value: "paradigmas",
            label: "Paradigmas de programação",
          },
          {
            value: "otimizacao",
            label: "Otimização de código",
          },
        ]}
      />
    </div>
  );
}
