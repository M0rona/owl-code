import MultipleSelector, {
  type Option,
} from "@/components/ui/multipleSelector";

type ObjetivosStepProps = {
  objetivos: Option[];
  setObjetivos: (objetivos: Option[]) => void;
};

export function ObjetivosStep({ objetivos, setObjetivos }: ObjetivosStepProps) {
  return (
    <div key="step-1" className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Fale aonde você quer chegar com sua jornada de aprendizado
      </p>

      <MultipleSelector
        placeholder="Selecione ou adicione seus objetivos"
        hidePlaceholderWhenSelected
        creatable
        value={objetivos}
        onChange={setObjetivos}
        defaultOptions={[
          { value: "comecar-zero", label: "Começar do zero" },
          { value: "fundamentos", label: "Avançar nos fundamentos" },
          { value: "projetos", label: "Desenvolver projetos práticos" },
          { value: "carreira", label: "Preparar para mercado de trabalho" },
          {
            value: "especializacao",
            label: "Especializar em uma área específica",
          },
          { value: "frameworks", label: "Aprender frameworks populares" },
          { value: "desafios", label: "Resolver desafios de programação" },
        ]}
      />
    </div>
  );
}
