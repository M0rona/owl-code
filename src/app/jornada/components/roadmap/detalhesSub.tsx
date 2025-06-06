import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { Subtopico } from "../../service/types/conteudoJornadaResponse";
import { Prism } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

type DetalhesSubtopicoProps = {
  children?: React.ReactNode;
  subNodeContent?: Subtopico;
  sigla: string;
};

export function DetalhesSubtopico({
  children,
  subNodeContent: data,
  sigla,
}: DetalhesSubtopicoProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{data?.title}</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto overflow-x-hidden">
          <p>
            <strong>Tópicos:</strong> {data?.conteudo.topico}
            <br />
            <br />
            <strong>Detalhes:</strong> {data?.conteudo.detalhes}
            <br />
            <br />
            <strong>Anexos:</strong> <br />
          </p>
          <ul className="flex flex-col gap-5">
            {data?.conteudo.anexos.map((anexo, i) => (
              <li key={i} className="flex flex-col gap-2">
                {anexo.tipo === "video" && (
                  <div className="w-full aspect-video">
                    <iframe
                      src={anexo.url.replace("watch?v=", "embed/")}
                      className="w-full h-full rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="YouTube video player"
                      loading="lazy"
                    />
                  </div>
                )}
                <a
                  className="text-blue-400 hover:underline"
                  href={anexo.url}
                  target="_blank"
                >
                  {anexo.tipo === "documentacao"
                    ? anexo.url
                    : "Assistir no youtube"}
                </a>
              </li>
            ))}

            {data?.conteudo.exemplos.map((exemplo, i) => (
              <div key={i}>
                <span>{exemplo.titulo}</span>
                <Prism
                  key={i}
                  style={vscDarkPlus}
                  language={sigla}
                  customStyle={{ borderRadius: 8 }}
                >
                  {exemplo.codigo}
                </Prism>
              </div>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
