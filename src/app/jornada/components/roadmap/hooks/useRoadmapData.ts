import { useMemo } from "react";
import { Node, Edge } from "@xyflow/react";
import { useQueryClient } from "@tanstack/react-query";
import { ConteudoJornadaResponse } from "../../../service/types/conteudoJornadaResponse";
import { atualizaTopicoCompleto } from "@/app/jornada/service/conteudoJornadas";

export function useRoadmapData(
  data: ConteudoJornadaResponse | undefined | void,
  idJornada: string | undefined,
  loadingMap?: { [key: string]: boolean },
  setLoadingMap?: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >
) {
  const queryClient = useQueryClient();

  return useMemo(() => {
    if (!data?.roadmap) return { nodes: [], edges: [] };

    const nodes: Node[] = [];
    const edges: Edge[] = [];
    let yBase = 0;

    data.roadmap.forEach((modulo, i: number) => {
      const parentId = `modulo-${i}`;
      // Nó do módulo (pai)
      nodes.push({
        id: parentId,
        type: "custom",
        data: { label: modulo.title },
        position: { x: 0, y: yBase + 50 },
      });

      // Subtópicos (filhos)
      modulo.subtopicos.forEach((sub, j: number) => {
        const childId = `modulo-${i}-sub-${j}`;
        nodes.push({
          id: childId,
          type: "custom",
          data: {
            label: sub.title,
            sigla: data.jornada.linguagem.sigla,
            checked: sub.concluido,
            isLoading: loadingMap ? loadingMap[childId] : false,
            subNodeContent: sub,
            onCheck: async (checked: boolean) => {
              if (!setLoadingMap) return;
              setLoadingMap((prev) => ({ ...prev, [childId]: true }));

              if (!idJornada) return;

              // TODO: Implementar a lógica de atualização do tópico
              const response = await atualizaTopicoCompleto(
                idJornada,
                modulo.uid,
                sub.uid
              );
              // queryClient.setQueryData(
              //   ["conteudoJornada", idJornada],
              //   (oldData: ConteudoJornadaResponse | undefined) => {
              //     if (!oldData) return oldData;

              //     return {
              //       ...oldData,
              //       roadmap: oldData.roadmap.map((modulo, modIndex: number) => {
              //         if (modIndex === i) {
              //           return {
              //             ...modulo,
              //             subtopicos: modulo.subtopicos.map(
              //               (sub, subIndex: number) => {
              //                 if (subIndex === j) {
              //                   setLoadingMap((prev) => ({
              //                     ...prev,
              //                     [childId]: false,
              //                   }));

              //                   return { ...sub, concluido: checked };
              //                 }
              //                 return sub;
              //               }
              //             ),
              //           };
              //         }
              //         return modulo;
              //       }),
              //     };
              //   }
              // );
            },
          },
          position: { x: 450, y: yBase + 50 + j * 100 },
        });
        edges.push({
          id: `e-${parentId}-${childId}`,
          source: parentId,
          target: childId,
        });
      });

      // Atualiza yBase para o próximo módulo
      yBase += Math.max(1, modulo.subtopicos.length) * 100 + 50;
    });

    return { nodes, edges };
  }, [
    data?.jornada.linguagem.sigla,
    data?.roadmap,
    idJornada,
    queryClient,
    loadingMap,
    setLoadingMap,
  ]);
}
