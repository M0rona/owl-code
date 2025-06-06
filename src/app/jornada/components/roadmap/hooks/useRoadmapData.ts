import { useMemo } from "react";
import { Node, Edge } from "@xyflow/react";
import { useQueryClient } from "@tanstack/react-query";
import { ConteudoJornadaResponse } from "../../../service/types/conteudoJornadaResponse";

export function useRoadmapData(
  data: ConteudoJornadaResponse | undefined,
  idJornada: string | undefined
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
            subNodeContent: sub,
            onCheck: (checked: boolean) => {
              queryClient.setQueryData(
                ["conteudoJornada", idJornada],
                (oldData: ConteudoJornadaResponse | undefined) => {
                  if (!oldData) return oldData;

                  return {
                    ...oldData,
                    roadmap: oldData.roadmap.map((modulo, modIndex: number) => {
                      if (modIndex === i) {
                        return {
                          ...modulo,
                          subtopicos: modulo.subtopicos.map(
                            (sub, subIndex: number) => {
                              if (subIndex === j) {
                                return { ...sub, concluido: checked };
                              }
                              return sub;
                            }
                          ),
                        };
                      }
                      return modulo;
                    }),
                  };
                }
              );
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
  }, [data?.jornada.linguagem.sigla, data?.roadmap, idJornada, queryClient]);
}
