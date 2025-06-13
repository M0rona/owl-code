import { useMemo } from "react";
import { Node, Edge } from "@xyflow/react";
import { useQueryClient } from "@tanstack/react-query";
import { ConteudoJornadaResponse } from "../../../service/types/conteudoJornadaResponse";
import {
  atualizaModuloCompleto,
  atualizaTopicoCompleto,
} from "@/app/jornada/service/conteudoJornadas";
import { usePercentageProgress } from "@/app/jornada/contexts/percentageProgress";

export function useRoadmapData(
  data: ConteudoJornadaResponse | undefined | void,
  idJornada: string | undefined,
  loadingMap?: { [key: string]: boolean },
  setLoadingMap?: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >
) {
  const { setPercentage } = usePercentageProgress();
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
        data: {
          label: modulo.title,
          isLoading: loadingMap ? loadingMap[parentId] : false,
          checked: modulo.concluido,
          onCheck: async (checked: boolean) => {
            if (!idJornada) return;
            if (!setLoadingMap) return;

            setLoadingMap((prev) => ({ ...prev, [parentId]: true }));

            const res = await atualizaModuloCompleto(idJornada, modulo.uid);
            if (!res) return;

            setPercentage(res.progresso_percent || 0);

            queryClient.setQueryData(
              ["conteudoJornada", idJornada],
              (oldData: ConteudoJornadaResponse | undefined) => {
                if (!oldData) return oldData;
                if (!setLoadingMap) return;

                return {
                  ...oldData,
                  roadmap: oldData.roadmap.map((modulo) => {
                    if (res.topicos_status.modulo_id === modulo.uid) {
                      return {
                        ...modulo,
                        concluido: checked,
                        subtopicos: modulo.subtopicos.map(
                          (sub, subIndex: number) => {
                            setLoadingMap((prev) => ({
                              ...prev,
                              [parentId]: false,
                            }));

                            return {
                              ...sub,
                              concluido:
                                res.topicos_status.topicos[subIndex].finalizado,
                            };
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
            onCheck: async () => {
              if (!setLoadingMap) return;
              setLoadingMap((prev) => ({ ...prev, [childId]: true }));

              if (!idJornada) return;

              const res = await atualizaTopicoCompleto(
                idJornada,
                modulo.uid,
                sub.uid
              );

              if (!res) return;
              setPercentage(res.progresso_percent || 0);

              queryClient.setQueryData(
                ["conteudoJornada", idJornada],
                (oldData: ConteudoJornadaResponse | undefined) => {
                  if (!oldData) return oldData;

                  return {
                    ...oldData,
                    roadmap: oldData.roadmap.map((modulo) => {
                      if (res.topicos_status.modulo_id === modulo.uid) {
                        return {
                          ...modulo,
                          concluido: res.topicos_status.topicos.every(
                            (status) => status.finalizado
                          ),
                          subtopicos: modulo.subtopicos.map(
                            (sub, subIndex: number) => {
                              setLoadingMap((prev) => ({
                                ...prev,
                                [childId]: false,
                              }));

                              return {
                                ...sub,
                                concluido:
                                  res.topicos_status.topicos[subIndex]
                                    .finalizado,
                              };
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
  }, [
    data?.jornada.linguagem.sigla,
    data?.roadmap,
    idJornada,
    loadingMap,
    queryClient,
    setLoadingMap,
    setPercentage,
  ]);
}
